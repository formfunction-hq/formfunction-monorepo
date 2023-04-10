import { Keypair } from "@solana/web3.js";
import base58ToHex from "src/utils/base58ToHex";

export default function convertBase58PrivateKeyToKeypair(privateKey: string) {
  const arr = Uint8Array.from(Buffer.from(base58ToHex(privateKey), "hex"));
  return Keypair.fromSecretKey(arr);
}
