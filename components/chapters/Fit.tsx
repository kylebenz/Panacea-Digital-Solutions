import { fit } from "@/content/fit";
import { Chapter } from "@/components/layout/Chapter";
import { Button } from "@/components/primitives/Button";

function Check() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 text-accent" fill="none">
      <path d="M1.5 6.5 4.5 9.5 10.5 2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="mt-1 h-2.5 w-2.5 shrink-0 text-fg-muted" fill="none">
      <path d="M2 2l8 8M10 2 2 10" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/* 09 · Before you start — who this is for, and who it isn't. */
export function Fit() {
  return (
    <Chapter id="fit" title={fit.title} align="center">
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {[
          { list: fit.yes, Icon: Check },
          { list: fit.no, Icon: Cross },
        ].map(({ list, Icon }) => (
          <div key={list.title} className="card p-6">
            <h3 className="text-h3">{list.title}</h3>
            <ul className="mt-4 grid gap-3">
              {list.items.map((item) => (
                <li key={item} className="text-small flex gap-3">
                  <Icon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button href={fit.cta.href} arrow>
          {fit.cta.label}
        </Button>
      </div>
    </Chapter>
  );
}
