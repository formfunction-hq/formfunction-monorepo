export default function getUrlWithoutParam(name: string) {
  const url = new URL(window.location.href);
  url.searchParams.delete(name);
  return url.pathname + url.search;
}
