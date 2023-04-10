import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import stripTrailingDecimals from "utils/stripTrailingDecimals";

export default function formatLamports(lamports: number): string {
  return stripTrailingDecimals(lamports / LAMPORTS_PER_SOL);
}
