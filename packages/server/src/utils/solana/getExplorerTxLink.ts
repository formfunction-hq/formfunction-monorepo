import Network from "src/types/enums/Network";

export default function getExplorerTxLink(txid: string) {
  return `https://explorer.solana.com/tx/${txid}?cluster=${
    process.env.SOLANA_NETWORK as Network
  }`;
}
