import getSolanaNetwork from "utils/env/getSolanaNetwork";

export default function getSolscanTxLink(txid: string) {
  return `https://solscan.io/tx/${txid}?cluster=${getSolanaNetwork()}`;
}
