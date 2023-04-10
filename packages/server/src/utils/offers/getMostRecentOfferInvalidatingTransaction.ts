import { NftTransaction } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import OFFER_INVALIDATING_TRANSACTION_TYPES from "src/constants/OfferInvalidatingTransactionTypes";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function getMostRecentOfferInvalidatingTransaction(
  mint: string
): Promise<Maybe<NftTransaction>> {
  // If any of these txs have happened *after* an offer has been made,
  // that offer is no longer valid.
  return getPrisma().nftTransaction.findFirst({
    orderBy: NFT_TRANSACTION_ORDER_BY,
    where: {
      // Keep consistent with filter in nftOffersForUserConnectionResolver
      mint,
      type: {
        in: OFFER_INVALIDATING_TRANSACTION_TYPES,
      },
    },
  });
}
