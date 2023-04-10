import { Maybe, MaybeUndef } from "types/UtilityTypes";

export default function getNftLinkRelative(
  username: MaybeUndef<string>,
  mint: string,
  assetWidth: Maybe<number>,
  assetHeight: Maybe<number>
): string {
  if (assetWidth != null && assetHeight != null) {
    return `/@${
      username ?? ""
    }/${mint}?width=${assetWidth}&height=${assetHeight}`;
  } else {
    return `/@${username ?? ""}/${mint}`;
  }
}
