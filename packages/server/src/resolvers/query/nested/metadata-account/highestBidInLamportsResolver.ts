import {
  MetadataAccount,
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getPrisma from "src/utils/prisma/getPrisma";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import bigintToNumber from "src/utils/bigintToNumber";

export default async function highestBidInLamportsResolver(
  metadataAccount: MetadataAccount,
  args: { userId: string }
): Promise<Maybe<number>> {
  if (metadataAccount.nft.status !== NftStatusExpress_Enum.Auction) {
    return null;
  }

  const prisma = getPrisma();
  const mostRecentBid = await prisma.nftTransaction.findFirst({
    orderBy: NFT_TRANSACTION_ORDER_BY,
    where: {
      fromUserId: args.userId,
      mint: metadataAccount.mint,
      type: NftTransactionTypeExpress_Enum.Bid,
    },
  });

  return bigintToNumber(mostRecentBid?.price);
}
