import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import convertNftTransaction from "src/utils/convert/convertNftTransaction";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NftOfferForUserKind,
  NftOffersForUserConnection,
  NftOffersForUserInput,
} from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import OFFER_INVALIDATING_TRANSACTION_TYPES from "src/constants/OfferInvalidatingTransactionTypes";
import isOfferValid from "src/utils/offers/isOfferValid";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import CONVERT_NFT_TRANSACTION_INCLUDE from "src/constants/include/ConvertNftTransactionInclude";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import validateFirstInput from "src/utils/validation/validateFirstInput";
import getViewerId from "src/utils/auth/getViewerId";

// NOTE: keep core logic in sync with nftOffersConnectionResolver
export default async function nftOffersForUserConnectionResolver(
  context: MyContext,
  after: Maybe<string>,
  first: number,
  input: NftOffersForUserInput
): Promise<NftOffersForUserConnection> {
  validateFirstInput(first);
  const prisma = getPrisma();
  const afterNumber = after == null ? 0 : Number(after);
  const { kinds } = input;
  const viewerId = getViewerId(context, input.userId);

  const where: Prisma.OfferWhereInput = {
    OR: filterNulls([
      kinds.includes(NftOfferForUserKind.Made)
        ? {
            NftTransaction: {
              fromUserId: viewerId ?? "",
            },
          }
        : null,
      kinds.includes(NftOfferForUserKind.Received)
        ? {
            NftTransaction: {
              toUserId: viewerId ?? "",
            },
          }
        : null,
    ]),
    refundTxid: null,
    saleTransactionId: null,
  };

  const [offers, totalCount] = await Promise.all([
    prisma.offer.findMany({
      include: {
        Nft: {
          include: {
            ...CONVERT_NFT_TO_METADATA_INCLUDE,
            CampaignFundingTier: {
              include: {
                Campaign: true,
              },
            },
            NftTransaction: {
              include: {
                From: {
                  include: CONVERT_USER_INCLUDE,
                },
              },
              orderBy: NFT_TRANSACTION_ORDER_BY,
              where: {
                // Keep consistent with filter in nftOffersConnectionResolver
                type: {
                  in: OFFER_INVALIDATING_TRANSACTION_TYPES,
                },
              },
            },
          },
        },
        NftTransaction: {
          include: CONVERT_NFT_TRANSACTION_INCLUDE,
        },
      },
      orderBy: NFT_TRANSACTION_ORDER_BY.map((orderBy) => ({
        NftTransaction: orderBy,
      })),
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.offer.count({ where }),
  ]);

  const converted = await Promise.all(
    offers.map((offer) => {
      const transaction = convertNftTransaction(offer.NftTransaction);
      // If any of these txs have happened *after* an offer has been made,
      // that offer is no longer valid.
      const invalidatingTxs = offer.Nft.NftTransaction;
      const mostRecentInvalidatingTx =
        invalidatingTxs.length === 0 ? null : invalidatingTxs[0];

      return {
        __typename: Typename.NftOfferForUser as const,
        expirationDate: offer.expirationDate,
        isValid: isOfferValid(
          mostRecentInvalidatingTx,
          transaction,
          offer.NftTransaction.currencyId,
          offer.Nft.CampaignFundingTier?.Campaign?.goalCurrencyId,
          offer.Nft.hasBeenSold
        ),
        metadataAccount: convertNftToMetadataAccount(offer.Nft),
        transaction,
      };
    })
  );

  // Only return invalid offers if the viewer made them (because then they should be able to cancel them)
  const filtered = converted.filter(
    (offer) => offer.isValid || offer.transaction.fromAddress === viewerId
  );

  return createOffsetPaginationConnection(
    filtered,
    Typename.NftOffersForUserEdge,
    Typename.NftOffersForUserConnection,
    after,
    first,
    totalCount
  );
}
