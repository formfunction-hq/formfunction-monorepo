import { PublicKey } from "@solana/web3.js";
import { Request } from "express";

export default function getPublicKey(req: Request) {
  const publicKey = req.headers["x-solana-public-key"];
  if (publicKey == null) {
    return null;
  }

  try {
    return new PublicKey(publicKey);
  } catch {
    return null;
  }
}
