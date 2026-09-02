// Portrait slot for the archive (art-design.md §9, §11).
//
// The design calls for a real portrait as the stable human anchor. The
// repository currently ships NO photographic portrait — only
// src/assets/hero.png, a low-colour abstract graphic that does not
// represent the person. Rather than substitute another abstract asset,
// this renders an authored, in-palette name plate that holds the exact
// composition slot. Drop a real portrait in and swap this for an <img>.
//
// Props:
//   name     full name, shown set in the display serif
//   caption  small mono line under the plate
//   variant  "home" (default) | "about" — only affects scale via CSS

function PortraitPlate({ name = "Farhaan Khan", caption, variant = "home" }) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return (
    <div className={`portrait-plate portrait-plate--${variant}`}>
      <span className="portrait-plate__mark" aria-hidden="true">
        {initials}
      </span>
      <span className="portrait-plate__foot">
        <span className="portrait-plate__name">{name}</span>
        <span className="portrait-plate__status" aria-hidden="true">
          Portrait pending
        </span>
      </span>
      {caption ? (
        <span className="u-visually-hidden">{caption}</span>
      ) : null}
    </div>
  );
}

export default PortraitPlate;
