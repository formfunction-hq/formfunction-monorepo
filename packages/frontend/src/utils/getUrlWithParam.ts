export default function getUrlWithParam(
  name: string,
  value: number | string,
  reset?: boolean
) {
  const url =
    reset === true
      ? new URL(window.location.href.split("?")[0])
      : new URL(window.location.href);
  url.searchParams.set(name, value.toString());
  return url.pathname + url.search;
}
