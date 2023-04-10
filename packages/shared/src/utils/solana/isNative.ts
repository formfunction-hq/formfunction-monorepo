import { PublicKey } from "@solana/web3.js";
import { WRAPPED_SOL_MINT } from "constants/SolanaConstants";
import arePublicKeysEqual from "utils/compare/arePublicKeysEqual";

export default function isNative(treasuryMint: PublicKey) {
  return arePublicKeysEqual(treasuryMint, WRAPPED_SOL_MINT);
}
