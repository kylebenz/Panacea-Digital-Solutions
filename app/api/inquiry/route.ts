import { HONEYPOT_FIELD, MIN_FILL_MS, inquirySchema } from "@/lib/inquiry";

/*
 * Inquiry handler. Accepts JSON (the enhanced form) or form-encoded posts
 * (the no-JS single-step form), validates with the same zod schema as the
 * client, and forwards to FORM_WEBHOOK_URL (e.g. a CRM inbound webhook).
 *
 * - Never logs or stores field values.
 * - Spam: honeypot field and a minimum time-to-submit; bots get a normal
 *   success response and nothing is forwarded.
 * - FORM_WEBHOOK_URL="dry-run" accepts submissions without forwarding
 *   (local testing only).
 */

function done(isForm: boolean, request: Request, outcome: "sent" | "missing" | "error", status = 200) {
  if (isForm) {
    const anchor = outcome === "sent" ? "inquiry-sent" : outcome === "missing" ? "inquiry-missing" : "inquiry-error";
    return Response.redirect(new URL(`/#${anchor}`, request.url), 303);
  }
  return Response.json({ ok: outcome === "sent" }, { status });
}

export async function POST(request: Request) {
  const type = request.headers.get("content-type") ?? "";
  const isForm = type.includes("application/x-www-form-urlencoded") || type.includes("multipart/form-data");

  let raw: Record<string, unknown>;
  try {
    raw = isForm ? Object.fromEntries((await request.formData()).entries()) : await request.json();
  } catch {
    return done(isForm, request, "missing", 400);
  }

  const startedAt = Number(raw.startedAt);
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;
  if (raw[HONEYPOT_FIELD] || tooFast) return done(isForm, request, "sent");

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    if (isForm) return done(true, request, "missing");
    const fields = [...new Set(parsed.error.issues.map((issue) => String(issue.path[0])))];
    return Response.json({ ok: false, fields }, { status: 422 });
  }

  const target = process.env.FORM_WEBHOOK_URL;
  if (!target) {
    console.error("[inquiry] FORM_WEBHOOK_URL is not set; inquiry not forwarded.");
    return done(isForm, request, "error", 503);
  }

  if (target !== "dry-run") {
    try {
      const response = await fetch(target, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...parsed.data, source: "website", submittedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        console.error(`[inquiry] Webhook responded ${response.status}.`);
        return done(isForm, request, "error", 502);
      }
    } catch {
      console.error("[inquiry] Webhook request failed.");
      return done(isForm, request, "error", 502);
    }
  }

  return done(isForm, request, "sent");
}
