import { Program } from "@project-serum/anchor";
import { getMint } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

export default async function getPriceWithMantissa(
  price: number,
  mint: PublicKey,
  anchorProgram: Program<any>
): Promise<number> {
  const token = await getMint(anchorProgram.provider.connection, mint);
  const mantissa = 10 ** token.decimals;
  return Math.ceil(price * mantissa);
}
