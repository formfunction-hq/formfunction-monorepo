import {
  MetadataAccount,
  NftStatusExpress_Enum,
  OpenBidStatus,
} from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getPrisma from "src/utils/prisma/getPrisma";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import getOpenBidStatusFromTransactions from "src/utils/auction/getOpenBidStatusFromTransactions";

export default async function openBidStatusResolver(
  metadataAccount: MetadataAccount,
  args: { userId: string }
): Promise<Maybe<OpenBidStatus>> {
  if (metadataAccount.nft.status !== NftStatusExpress_Enum.Auction) {
    return null;
  }

  const prisma = getPrisma();
  const txs = await prisma.nftTransaction.findMany({
    include: {
      From: {
        include: CONVERT_USER_INCLUDE,
      },
    },
    orderBy: NFT_TRANSACTION_ORDER_BY,
    take: 50,
    where: {
      mint: metadataAccount.mint,
    },
  });

  return getOpenBidStatusFromTransactions(
    args.userId,
    txs,
    metadataAccount.nft
  );
}
