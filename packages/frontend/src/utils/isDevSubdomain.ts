export default function isDevSubdomain() {
  if (typeof window === "undefined") {
    return false;
  }

  const { href } = window.location;
  return href.includes("dev.formfunction");
}
