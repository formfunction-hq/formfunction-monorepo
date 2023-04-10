export default function getLinkWithoutProtocol(link: string) {
  const splitLink = link.split("://");

  return splitLink[splitLink.length - 1];
}
