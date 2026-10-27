import { contact } from "@/content/contact";
import { HONEYPOT_FIELD } from "@/lib/inquiry";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/pricing";
import { FieldShell, Select, TextArea, TextInput } from "@/components/primitives/Field";
import { Button } from "@/components/primitives/Button";
import { Honeypot, PhiNotice, radioClass } from "./FormParts";

/*
 * 7I · no-JS fallback (also the pre-hydration render): all three steps as
 * one native form posting to /api/inquiry. The handler redirects to
 * #inquiry-sent / #inquiry-missing / #inquiry-error, which CSS :target
 * reveals without JavaScript.
 */
const f = contact.fields;

export function StaticInquiryForm() {
  return (
    <form method="post" action="/api/inquiry" className="static-inquiry relative grid gap-10">
      <PhiNotice />
      {contact.steps.map((step, i) => (
        <fieldset key={step.id} className="grid gap-6">
          <legend className="text-mono mb-6 text-fg-muted">
            <span className="text-fg">{contact.stepLabel(i + 1, contact.steps.length)}</span> · {step.title}
          </legend>
          {i === 0 ? (
            <>
              <FieldShell id="s-name" label={f.name.label}>
                <TextInput id="s-name" name="name" autoComplete="name" required />
              </FieldShell>
              <FieldShell id="s-email" label={f.email.label} hint={f.email.hint}>
                <TextInput id="s-email" name="email" type="email" autoComplete="email" required />
              </FieldShell>
              <fieldset className="grid gap-2">
                <legend className="field-label mb-2">{f.contactMethod.label}</legend>
                <div className="flex flex-wrap gap-2">
                  {f.contactMethod.options.map((o, j) => (
                    <label key={o.value} className={radioClass}>
                      <input type="radio" name="contactMethod" value={o.value} required defaultChecked={j === 0} />
                      {o.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <FieldShell id="s-phone" label={f.phone.label} hint={f.phone.hint} optional>
                <TextInput id="s-phone" name="phone" type="tel" autoComplete="tel" />
              </FieldShell>
            </>
          ) : null}
          {i === 1 ? (
            <>
              <FieldShell id="s-business" label={f.businessName.label}>
                <TextInput id="s-business" name="businessName" autoComplete="organization" required />
              </FieldShell>
              <FieldShell id="s-website" label={f.website.label} optional>
                <TextInput id="s-website" name="website" type="text" inputMode="url" autoComplete="url" />
              </FieldShell>
              <FieldShell id="s-specialty" label={f.specialty.label} hint={f.specialty.hint}>
                <TextInput id="s-specialty" name="specialty" required />
              </FieldShell>
            </>
          ) : null}
          {i === 2 ? (
            <>
              <FieldShell id="s-package" label={f.package.label}>
                <Select id="s-package" name="package" defaultValue="">
                  <option value="">{f.package.notSure}</option>
                  {site.plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {formatPrice(p.priceMonthly)} / month
                    </option>
                  ))}
                </Select>
              </FieldShell>
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_14rem] xl:items-start">
                <FieldShell id="s-message" label={f.message.label}>
                  <TextArea
                    id="s-message"
                    name="message"
                    required
                    minLength={20}
                    rows={6}
                    aria-describedby="s-message-phi"
                  />
                </FieldShell>
                <PhiNotice id="s-message-phi" compact />
              </div>
            </>
          ) : null}
        </fieldset>
      ))}
      <Honeypot name={HONEYPOT_FIELD} />
      <div>
        <Button type="submit" arrow>
          {contact.submit}
        </Button>
      </div>
    </form>
  );
}

/* Messages revealed by :target after a no-JS submission. */
export function StaticOutcomes() {
  const panels = [
    { id: "inquiry-sent", ...contact.success },
    { id: "inquiry-missing", ...contact.noJsMissing },
    { id: "inquiry-error", ...contact.failure },
  ];
  return (
    <>
      {panels.map((p) => (
        <div
          key={p.id}
          id={p.id}
          className="inquiry-outcome mb-10 border-l-2 border-aqua py-2 pl-5"
          tabIndex={-1}
        >
          <p className="text-h3">{p.title}</p>
          <p className="measure mt-2 text-fg-muted">{p.body}</p>
        </div>
      ))}
    </>
  );
}
