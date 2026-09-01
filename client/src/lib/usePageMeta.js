import { useEffect } from "react";

const SITE_NAME = "Farhaan Khan";

// Sets document title + meta/OG description per route. Creates the meta
// tags if the host index.html doesn't have them, so no template edits are
// required for the hook to work.
function upsertMeta(selector, create, content) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title}` : `${SITE_NAME} | Developer Portfolio`;

    if (description) {
      upsertMeta('meta[name="description"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        return m;
      }, description);

      upsertMeta('meta[property="og:description"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:description");
        return m;
      }, description);
    }

    upsertMeta('meta[property="og:title"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:title");
      return m;
    }, title || `${SITE_NAME} | Developer Portfolio`);
  }, [title, description]);
}
