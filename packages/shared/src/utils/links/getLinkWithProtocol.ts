export default function getLinkWithProtocol(href: string) {
  if (href.startsWith("/") || !href.includes(".com")) {
    // Assume this is internal link like /explore or /profile
    return href;
  }

  // https://stackoverflow.com/a/39856872
  return href.startsWith("http") ? href : `//${href}`;
}
