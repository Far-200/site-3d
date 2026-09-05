import { useEffect } from "react";

// Paints the Cobalt Forest Workshop's forest-night ground on <body>/#root
// only while a `.cfw`-scoped route is mounted, so the legacy/archive
// routes keep their own ground color. Shared by every Cobalt page
// (Home, Work, Lab, About).
export default function useCobaltRoute() {
  useEffect(() => {
    document.body.dataset.cfwRoute = "true";
    return () => {
      delete document.body.dataset.cfwRoute;
    };
  }, []);
}
