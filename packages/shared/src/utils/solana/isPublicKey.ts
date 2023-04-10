import { PublicKey } from "@solana/web3.js";

export default function isPublicKey(key: string): boolean {
  try {
    const _pubkey = new PublicKey(key);
    return true;
  } catch {
    return false;
  }
}
