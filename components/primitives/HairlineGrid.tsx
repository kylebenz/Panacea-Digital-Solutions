/* Faint 12-column grid aligned to the page grid, for diagram chapters. */
export function HairlineGrid() {
  return (
    <div className="hairline-grid" aria-hidden="true">
      <div className="page grid-12 h-full">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}
