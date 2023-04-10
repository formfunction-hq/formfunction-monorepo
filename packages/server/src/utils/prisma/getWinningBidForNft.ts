import {
  NftExpress,
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import NftTransactionWithUsers from "src/types/NftTransactionWithUsers";

export default async function getWinningBidForNft(
  nft: NftExpress
): Promise<Maybe<NftTransactionWithUsers>> {
  if (nft.status !== NftStatusExpress_Enum.Auction) {
    return null;
  }

  const prisma = getPrisma();
  return prisma.nftTransaction.findFirst({
    include: {
      From: {
        include: CONVERT_USER_INCLUDE,
      },
    },
    orderBy: NFT_TRANSACTION_ORDER_BY,
    where: {
      auctionCount: nft.auctionCount,
      mint: nft.mint,
      type: NftTransactionTypeExpress_Enum.Bid,
    },
  });
}
