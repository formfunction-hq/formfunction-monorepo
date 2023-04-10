export default function isProdSubdomain() {
  const { href } = window.location;
  return href.includes("prod.formfunction");
}
