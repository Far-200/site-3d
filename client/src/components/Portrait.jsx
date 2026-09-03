import { useState } from "react";
import PortraitPlate from "./PortraitPlate";

// Real portrait (public/portrait.png) with the authored PortraitPlate as a
// pure fallback — it only renders if the image genuinely fails to load, so
// when portrait.png exists the visitor always sees the photograph
// (art-design.md §9, §11).
//
// Props:
//   variant  "home" (default) | "about" — CSS hook for the crop/scale
//   eager    load immediately (Home) vs lazy (About, below the fold)

function Portrait({ variant = "home", eager = false }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <PortraitPlate name="Farhaan Khan" variant={variant} />;
  }

  return (
    <img
      className={`portrait-img portrait-img--${variant}`}
      src="/portrait.png"
      alt="Farhaan Khan"
      width="1024"
      height="1024"
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export default Portrait;
