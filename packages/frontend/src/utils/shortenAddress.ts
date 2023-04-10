export default function shortenAddress(
  address: string,
  extraShort = false
): string {
  if (extraShort) {
    return `${address.slice(0, 4)}...`;
  }

  return `${address.slice(0, 4)}...${address.slice(address.length - 4)}`;
}
