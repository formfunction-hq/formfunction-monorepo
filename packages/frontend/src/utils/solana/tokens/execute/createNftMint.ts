import { createMint } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

export default async function createNftMint(
  connection: Connection,
  wallet: Keypair,
  mintAuthority?: PublicKey,
  freezeAuthority?: PublicKey
): Promise<PublicKey> {
  return createMint(
    connection,
    wallet,
    mintAuthority ?? wallet.publicKey,
    freezeAuthority ?? wallet.publicKey,
    0
  );
}
