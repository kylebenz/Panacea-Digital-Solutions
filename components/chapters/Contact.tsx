import { contact } from "@/content/contact";
import { Chapter } from "@/components/layout/Chapter";
import { PhaseSlate } from "@/components/dev/PhaseSlate";

export function Contact() {
  return (
    <Chapter id="contact" title={contact.title} lede={<p>{contact.intro}</p>}>
      <PhaseSlate phase={6} items={["7I Inquiry Flow"]} />
    </Chapter>
  );
}
