export default function shortenUrl(url: string) {
  return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0];
}
