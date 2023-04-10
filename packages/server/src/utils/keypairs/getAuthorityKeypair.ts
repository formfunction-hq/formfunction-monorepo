import { Keypair } from "@solana/web3.js";
import invariant from "tiny-invariant";

export default function getAuthorityKeypair(): Keypair {
  const authority = process.env.AUTHORITY;

  invariant(
    authority != null && authority !== "",
    "process.env.AUTHORITY must be defined"
  );

  try {
    const authorityKeypair = Keypair.fromSecretKey(
      Uint8Array.from(JSON.parse(authority))
    );
    return authorityKeypair;
  } catch {
    console.error(
      "Error getting the authority keypair, make sure the environment variable is set correctly"
    );
    return Keypair.generate();
  }
}
