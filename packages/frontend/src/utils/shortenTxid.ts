export default function shortenTxid(txid: string): string {
  return `${txid.slice(0, 4)}...${txid.slice(txid.length - 4)}`;
}
