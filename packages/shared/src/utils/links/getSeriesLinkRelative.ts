export default function getSeriesLinkRelative(
  username: string,
  seriesSlug: string,
  seriesType:
    | "UserCurated"
    | "GenerativeMint"
    | "%future added value" = "UserCurated"
): string {
  return `/@${username}/${
    seriesType === "UserCurated" ? "series" : "generative-series"
  }/${seriesSlug}`;
}
