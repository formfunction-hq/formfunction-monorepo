export default function isInternalLink(url: string) {
  return (
    url.includes("formfunction.xyz") ||
    url.includes("localhost") ||
    url.startsWith("/")
  );
}
