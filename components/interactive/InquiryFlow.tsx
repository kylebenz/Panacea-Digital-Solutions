"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contact } from "@/content/contact";
import { siteConfig } from "@/site.config";
import { HONEYPOT_FIELD, inquirySchema, isPlanId, stepFields, type Inquiry, type InquiryInput } from "@/lib/inquiry";
import { formatPrice } from "@/lib/pricing";
import { track } from "@/lib/analytics";
import { Button } from "@/components/primitives/Button";
import { FieldShell, Select, TextArea, TextInput, describedBy } from "@/components/primitives/Field";
import { Honeypot, PhiNotice, StepProgress, radioClass } from "@/components/contact/FormParts";

/*
 * 7I · Inquiry Flow. Three steps (You / Business / Content) with progress
 * shown as STEP 02 / 03, zod validation per step, inline errors announced
 * through aria-live, focus moved to each step's heading. The package is
 * pre-selected from plan buttons or ?package=. On success the form is
 * replaced in place with what happens next. Analytics receive step and
 * submit events only — never field values.
 */
const f = contact.fields;
const TOTAL = contact.steps.length;

type Status = "editing" | "sending" | "sent" | "failed";

export default function InquiryFlow() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("editing");
  const [announcement, setAnnouncement] = useState("");
  const startedAt = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const outcomeRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    control,
    getFieldState,
    formState: { errors },
  } = useForm<InquiryInput, unknown, Inquiry>({
    resolver: zodResolver(inquirySchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      contactMethod: "email",
      phone: "",
      businessName: "",
      website: "",
      specialty: "",
      package: "",
      message: "",
    },
  });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Plan buttons push ?package=<id>; Next keeps useSearchParams in sync.
  const requested = searchParams.get("package");
  useEffect(() => {
    if (isPlanId(requested)) setValue("package", requested);
  }, [requested, setValue]);

  useEffect(() => {
    if (!moved.current) return;
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (status === "sent" || status === "failed") outcomeRef.current?.focus();
  }, [status]);

  const contactMethod = useWatch({ control, name: "contactMethod" });
  const selectedPackage = useWatch({ control, name: "package" });
  const plan = siteConfig.plans.find((p) => p.id === selectedPackage);

  function announceErrors(fields: ReadonlyArray<FieldPath<InquiryInput>>) {
    // getFieldState reads live form state (the render's `errors` may be stale here).
    const invalid = fields.filter((name) => getFieldState(name).invalid);
    setAnnouncement(invalid.length ? contact.errors.summary(invalid.length) : "");
  }

  function getFieldError(name: FieldPath<InquiryInput>) {
    return errors[name]?.message as string | undefined;
  }

  async function next() {
    const fields = stepFields[step];
    const ok = await trigger(fields as unknown as FieldPath<InquiryInput>[], { shouldFocus: true });
    if (!ok) {
      announceErrors(fields as unknown as FieldPath<InquiryInput>[]);
      return;
    }
    setAnnouncement("");
    moved.current = true;
    track("inquiry_step", { step: step + 2 });
    setStep((s) => Math.min(TOTAL - 1, s + 1));
  }

  function back() {
    moved.current = true;
    setAnnouncement("");
    setStep((s) => Math.max(0, s - 1));
  }

  // handleSubmit is invoked inside the event handler, not during render.
  const submit = (event: React.FormEvent<HTMLFormElement>) =>
    handleSubmit(
      async (data) => {
        setStatus("sending");
        try {
          const form = document.querySelector<HTMLInputElement>(`[name="${HONEYPOT_FIELD}"]`);
          const response = await fetch("/api/inquiry", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ ...data, startedAt: startedAt.current, [HONEYPOT_FIELD]: form?.value ?? "" }),
          });
          if (!response.ok) throw new Error(String(response.status));
          track("inquiry_submit");
          setStatus("sent");
        } catch {
          setStatus("failed");
        }
      },
      (invalid) => {
        // Jump back to the first step with an error.
        const names = Object.keys(invalid) as FieldPath<InquiryInput>[];
        const target = stepFields.findIndex((group) => group.some((n) => names.includes(n)));
        setAnnouncement(contact.errors.summary(names.length));
        if (target >= 0 && target !== step) {
          moved.current = true;
          setStep(target);
        }
      },
    )(event);

  if (status === "sent") {
    return (
      <div className="anim-wipe border-l-2 border-verdigris-bright py-2 pl-6">
        <p className="text-mono text-fg-muted">{contact.stepLabel(TOTAL, TOTAL)} · Sent</p>
        <h3 ref={outcomeRef} tabIndex={-1} className="text-display-m mt-3 outline-none">
          {contact.success.title}
        </h3>
        <p className="measure mt-4 text-fg-muted">{contact.success.body}</p>
      </div>
    );
  }

  const field = (name: FieldPath<InquiryInput>) => ({
    id: `inq-${name}`,
    "aria-invalid": getFieldError(name) ? true : undefined,
    "aria-describedby": describedBy(`inq-${name}`, { error: getFieldError(name) }),
  });

  return (
    <form noValidate onSubmit={submit} className="relative grid gap-8">
      <PhiNotice />
      <StepProgress step={step} total={TOTAL} />
      {plan ? (
        <p className="text-mono -mt-4 text-fg-muted">
          Package: <span className="text-fg">{plan.name}</span> · {formatPrice(plan.priceMonthly)} / month
        </p>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {contact.stepLabel(step + 1, TOTAL)}: {contact.steps[step].title}
      </p>
      <p aria-live="assertive" className={announcement ? "field-error" : "sr-only"}>
        {announcement}
      </p>

      {status === "failed" ? (
        <div className="border-l-2 border-remedy py-1 pl-5" role="alert">
          <h3 ref={outcomeRef} tabIndex={-1} className="text-h3 outline-none">
            {contact.failure.title}
          </h3>
          <p className="measure mt-1 text-fg-muted">{contact.failure.body}</p>
        </div>
      ) : null}

      <fieldset className="grid gap-6">
        <legend className="sr-only">
          {contact.stepLabel(step + 1, TOTAL)}: {contact.steps[step].title}
        </legend>
        <h3 ref={headingRef} tabIndex={-1} className="text-display-m outline-none">
          {contact.steps[step].title}
        </h3>

        {step === 0 ? (
          <>
            <FieldShell id="inq-name" label={f.name.label} error={getFieldError("name")}>
              <TextInput {...field("name")} autoComplete="name" {...register("name")} />
            </FieldShell>
            <FieldShell id="inq-email" label={f.email.label} hint={f.email.hint} error={getFieldError("email")}>
              <TextInput
                {...field("email")}
                type="email"
                autoComplete="email"
                aria-describedby={describedBy("inq-email", { hint: true, error: getFieldError("email") })}
                {...register("email")}
              />
            </FieldShell>
            <fieldset
              className="grid gap-2"
              aria-describedby={getFieldError("contactMethod") ? "inq-contactMethod-error" : undefined}
            >
              <legend className="field-label mb-2">{f.contactMethod.label}</legend>
              <div className="flex flex-wrap gap-2">
                {f.contactMethod.options.map((o) => (
                  <label key={o.value} className={radioClass}>
                    <input type="radio" value={o.value} {...register("contactMethod")} />
                    {o.label}
                  </label>
                ))}
              </div>
              {getFieldError("contactMethod") ? (
                <p id="inq-contactMethod-error" className="field-error">
                  {getFieldError("contactMethod")}
                </p>
              ) : null}
            </fieldset>
            {contactMethod === "phone" ? (
              <FieldShell id="inq-phone" label={f.phone.label} error={getFieldError("phone")}>
                <TextInput {...field("phone")} type="tel" autoComplete="tel" {...register("phone")} />
              </FieldShell>
            ) : null}
          </>
        ) : null}

        {step === 1 ? (
          <>
            <FieldShell id="inq-businessName" label={f.businessName.label} error={getFieldError("businessName")}>
              <TextInput {...field("businessName")} autoComplete="organization" {...register("businessName")} />
            </FieldShell>
            <FieldShell id="inq-website" label={f.website.label} optional error={getFieldError("website")}>
              <TextInput
                {...field("website")}
                type="text"
                inputMode="url"
                autoComplete="url"
                {...register("website")}
              />
            </FieldShell>
            <FieldShell
              id="inq-specialty"
              label={f.specialty.label}
              hint={f.specialty.hint}
              error={getFieldError("specialty")}
            >
              <TextInput
                {...field("specialty")}
                aria-describedby={describedBy("inq-specialty", { hint: true, error: getFieldError("specialty") })}
                {...register("specialty")}
              />
            </FieldShell>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <FieldShell id="inq-package" label={f.package.label}>
              <Select id="inq-package" {...register("package")}>
                <option value="">{f.package.notSure}</option>
                {siteConfig.plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {formatPrice(p.priceMonthly)} / month
                  </option>
                ))}
              </Select>
            </FieldShell>
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_14rem] xl:items-start">
              <FieldShell id="inq-message" label={f.message.label} error={getFieldError("message")}>
                <TextArea
                  {...field("message")}
                  rows={6}
                  aria-describedby={[`inq-message-phi`, getFieldError("message") ? "inq-message-error" : ""]
                    .filter(Boolean)
                    .join(" ")}
                  {...register("message")}
                />
              </FieldShell>
              <PhiNotice id="inq-message-phi" compact />
            </div>
          </>
        ) : null}
      </fieldset>

      <Honeypot name={HONEYPOT_FIELD} />

      <div className="flex flex-wrap items-center gap-3">
        {step > 0 ? (
          <Button variant="secondary" onClick={back}>
            {contact.back}
          </Button>
        ) : null}
        {step < TOTAL - 1 ? (
          <Button onClick={next} arrow>
            {contact.next}
          </Button>
        ) : (
          <Button type="submit" arrow loading={status === "sending"} loadingLabel={contact.sending}>
            {status === "failed" ? contact.failure.retry : contact.submit}
          </Button>
        )}
      </div>
    </form>
  );
}
