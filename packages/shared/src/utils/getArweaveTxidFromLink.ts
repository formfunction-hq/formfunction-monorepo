export default function getArweaveTxidFromLink(link: string): string {
  // Typical format is https://arweave.net/<txid>?<params>
  return link.split("https://arweave.net/")[1].split("?")[0];
}
