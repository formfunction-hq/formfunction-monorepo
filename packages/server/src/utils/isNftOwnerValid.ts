import { PublicKey } from "@solana/web3.js";
import invariant from "tiny-invariant";
import getPrisma from "src/utils/prisma/getPrisma";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";

export default async function isNftOwnerValid(mint: string): Promise<boolean> {
  const prisma = getPrisma();
  const nft = await prisma.nft.findUnique({ where: { mint } });
  invariant(nft != null, "Nft must not be null");

  const tokenAccountsForMint =
    await ConnectionWrapper.getParsedTokenAccountsByOwner(
      new PublicKey(nft.ownerId),
      {
        mint: new PublicKey(mint),
      }
    );

  const filtered = tokenAccountsForMint.value.filter(
    (obj) =>
      obj.account.data.parsed.info.tokenAmount.uiAmount > 0 &&
      obj.account.data.parsed.info.tokenAmount.decimals === 0
  );

  return filtered != null && filtered.length > 0;
}
