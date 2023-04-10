import DEFAULT_AUCTION_COUNT from "src/constants/DefaultAuctionCount";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import Typename from "src/types/enums/Typename";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import convertUser from "src/utils/convert/convertUser";
import getNftTransactionNftInfo from "src/utils/graphql/getNftTransactionNftInfo";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftTransactionExpress } from "src/__generated__/generated";

export default async function convertNftTransactionOnchain(
  onchainTx: NftTransactionOnchain
): Promise<NftTransactionExpress> {
  const prisma = getPrisma();
  const [creator, from, to, nft] = await Promise.all([
    prisma.user.findUnique({
      include: CONVERT_USER_INCLUDE,
      where: { id: onchainTx.creatorId },
    }),
    prisma.user.findUnique({
      include: CONVERT_USER_INCLUDE,
      where: { id: onchainTx.fromAddress },
    }),
    prisma.user.findUnique({
      include: CONVERT_USER_INCLUDE,
      where: { id: onchainTx.toAddress },
    }),
    prisma.nft.findUnique({
      include: {
        MasterEditionNft: true,
        NftMetadata: true,
      },
      where: { mint: onchainTx.mint },
    }),
  ]);

  return {
    ...onchainTx,
    Creator: creator == null ? null : convertUser(creator),
    From: from == null ? null : convertUser(from),
    To: to == null ? null : convertUser(to),
    __typename: Typename.NftTransaction,
    auctionCount: DEFAULT_AUCTION_COUNT,
    nftInfo: getNftTransactionNftInfo(nft),
  };
}
