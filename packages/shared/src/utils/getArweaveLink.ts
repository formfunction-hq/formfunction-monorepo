export default function getArweaveLink(txid: string, ext?: string): string {
  return `https://arweave.net/${txid}${ext == null ? "" : `?ext=${ext}`}`;
}
