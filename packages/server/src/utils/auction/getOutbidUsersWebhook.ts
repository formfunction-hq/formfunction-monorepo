import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import getOutbidUsers from "src/utils/auction/getOutbidUsers";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

export default async function getOutbidUsersWebhook(
  mint: string,
  txid: string,
  bidderUserId: string
) {
  const prisma = getPrisma();
  const txs = await prisma.nftTransaction.findMany({
    orderBy: NFT_TRANSACTION_ORDER_BY,
    where: {
      mint,
      type: {
        in: [
          NftTransactionTypeExpress_Enum.Bid,
          NftTransactionTypeExpress_Enum.Sold,
          NftTransactionTypeExpress_Enum.Transferred,
        ],
      },
    },
  });

  return getOutbidUsers(txs, txid, bidderUserId);
}
