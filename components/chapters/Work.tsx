import { work } from "@/content/work";
import { Chapter } from "@/components/layout/Chapter";
import { Button } from "@/components/primitives/Button";
import { VideoSlot } from "@/components/video/VideoSlot";

/* 01 · The work — a masonry wall of video slots (placeholders until files arrive). */
export function Work() {
  return (
    <Chapter
      id="work"
      title={work.title}
      lede={<p>{work.lede}</p>}
      action={
        <Button href={work.cta.href} arrow>
          {work.cta.label}
        </Button>
      }
    >
      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {work.columns.map((column, i) => (
          <div
            key={i}
            className={
              i === 2
                ? "col-span-2 grid grid-cols-2 content-start gap-3 sm:gap-4 lg:col-span-1 lg:grid-cols-1"
                : "grid content-start gap-3 sm:gap-4"
            }
          >
            {column.map((slot) => (
              <VideoSlot key={slot.slug} slot={slot} placeholderLabel={work.placeholder} />
            ))}
          </div>
        ))}
      </div>
    </Chapter>
  );
}
