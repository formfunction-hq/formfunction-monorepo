import getSolanaNetwork from "utils/env/getSolanaNetwork";

export default function getExplorerTxLink(txid: string) {
  return `https://explorer.solana.com/tx/${txid}?cluster=${getSolanaNetwork()}`;
}
