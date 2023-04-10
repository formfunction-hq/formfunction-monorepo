import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import getLinkForEnvironment from "src/utils/getLinkForEnvironment";

export default function getNftLink(username: string, mint: string) {
  const relativeLink = getNftLinkRelative(username, mint, null, null);
  return getLinkForEnvironment(relativeLink);
}
