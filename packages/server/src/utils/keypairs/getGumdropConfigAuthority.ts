import { Keypair } from "@solana/web3.js";
import invariant from "tiny-invariant";

export default function getGumdropConfigAuthority(): Keypair {
  const authority = process.env.GUMDROP_CONFIG_AUTHORITY;
  invariant(
    authority != null && authority !== "",
    "process.env.GUMDROP_CONFIG_AUTHORITY must be defined"
  );

  const authorityKeypair = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(authority))
  );
  return authorityKeypair;
}
