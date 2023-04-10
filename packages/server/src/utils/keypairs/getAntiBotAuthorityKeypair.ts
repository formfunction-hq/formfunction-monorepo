import { Keypair } from "@solana/web3.js";
import invariant from "tiny-invariant";

export default function getAntiBotAuthorityKeypair(): Keypair {
  const antiBotAuthority = process.env.ANTI_BOT_AUTHORITY;
  invariant(
    antiBotAuthority != null && antiBotAuthority !== "",
    "process.env.ANTI_BOT_AUTHORITY must be defined"
  );

  const antiBotAuthorityKeypair = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(antiBotAuthority))
  );
  return antiBotAuthorityKeypair;
}
