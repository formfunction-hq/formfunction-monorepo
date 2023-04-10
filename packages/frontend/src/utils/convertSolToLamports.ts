import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import BigNumber from "bignumber.js";

export default function convertSolToLamports(sol: string | number) {
  const result = new BigNumber(sol).multipliedBy(LAMPORTS_PER_SOL).toNumber();
  if (Number.isNaN(result)) {
    return 0;
  }
  return result;
}
