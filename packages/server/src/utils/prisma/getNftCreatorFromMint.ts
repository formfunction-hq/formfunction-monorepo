import { PublicKey } from "@solana/web3.js";
import convertUser from "src/utils/convert/convertUser";
import getPrisma from "src/utils/prisma/getPrisma";
import { UserExpress } from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getMetadataAccountFirstCreator from "src/utils/solana/getMetadataAccountFirstCreator";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";

/**
 * Tries to fetch creator from our DB. Falls back to looking at creators array of metadata.
 */
export default async function getNftCreatorFromMint(mint: PublicKey): Promise<{
  creator: Maybe<UserExpress>;
  creatorAddress: Maybe<string>;
}> {
  const prisma = getPrisma();
  const nft = await prisma.nft.findUnique({
    include: {
      Creator: {
        include: CONVERT_USER_INCLUDE,
      },
    },
    where: { mint: mint.toString() },
  });

  if (nft != null) {
    return {
      creator: convertUser(nft.Creator),
      creatorAddress: nft.Creator.id,
    };
  }

  const metadataAccount = await AccountLoader.loadNft(mint);
  if (metadataAccount == null) {
    return { creator: null, creatorAddress: null };
  }
  return getMetadataAccountFirstCreator(metadataAccount);
}
