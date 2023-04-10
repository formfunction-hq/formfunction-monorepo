export default function isTestnetSubdomain() {
  if (typeof window === "undefined") {
    return false;
  }

  const { href } = window.location;
  return href.includes("test.formfunction");
}
