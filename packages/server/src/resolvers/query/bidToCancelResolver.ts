import getPrisma from "src/utils/prisma/getPrisma";
import {
  BidToCancelInput,
  NftTransactionExpress,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import convertNftTransaction from "src/utils/convert/convertNftTransaction";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import CONVERT_NFT_TRANSACTION_INCLUDE from "src/constants/include/ConvertNftTransactionInclude";

async function bidToCancelResolver(
  input: BidToCancelInput
): Promise<Maybe<NftTransactionExpress>> {
  const { mint, userId } = input;

  const prisma = getPrisma();
  const bid = await prisma.nftTransaction.findFirst({
    include: CONVERT_NFT_TRANSACTION_INCLUDE,
    orderBy: NFT_TRANSACTION_ORDER_BY,
    where: {
      fromUserId: userId,
      mint,
      timeCreated: {
        // Users should only need to cancel bids for the current auction.
        // Once the auction ends, they'll be able to withdraw their
        // bid and also cancel it.
        //
        // TODO: deal with edge case where user bids and loses, and then the auctions
        // restarts right afterwards.
        gte: dayjs().subtract(1, "day").toDate(),
      },
      type: NftTransactionTypeExpress_Enum.Bid,
    },
  });

  return bid == null ? null : convertNftTransaction(bid);
}

export default bidToCancelResolver;
