// Boot-session helpers, separate from the component so fast refresh works.

export function shouldBoot() {
  try {
    if (sessionStorage.getItem("fk-booted")) return false;
  } catch {
    return false;
  }
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return false;
  }
  return true;
}

export function markBooted() {
  try {
    sessionStorage.setItem("fk-booted", "1");
  } catch {
    /* storage unavailable — boot simply won't be remembered */
  }
}
