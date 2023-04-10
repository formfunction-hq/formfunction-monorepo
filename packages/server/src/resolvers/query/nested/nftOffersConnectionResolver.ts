import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import convertNftTransaction from "src/utils/convert/convertNftTransaction";
import getEmptyConnection from "src/utils/graphql/getEmptyConnection";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NftOffersConnection,
  NftOffersInput,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import getOpenOffersMadeByUserWhereClause from "src/utils/nft/getOpenOffersMadeByUserWhereClause";
import isOfferValid from "src/utils/offers/isOfferValid";
import CONVERT_NFT_TRANSACTION_INCLUDE from "src/constants/include/ConvertNftTransactionInclude";
import { Prisma } from "@prisma/client";
import validateFirstInput from "src/utils/validation/validateFirstInput";
import getMostRecentOfferInvalidatingTransaction from "src/utils/offers/getMostRecentOfferInvalidatingTransaction";
import getViewerId from "src/utils/auth/getViewerId";

// NOTE: keep core logic in sync with nftOffersForUserConnectionResolver
export default async function nftOffersConnectionResolver(
  context: Undef<MyContext>,
  after: Maybe<string>,
  first: number,
  input: NftOffersInput
): Promise<NftOffersConnection> {
  validateFirstInput(first);
  const prisma = getPrisma();
  const afterNumber = after == null ? 0 : Number(after);
  const viewerId =
    context == null ? null : getViewerId(context, input.viewerId);
  const { mint } = input;

  const mostRecentInvalidatingTx =
    await getMostRecentOfferInvalidatingTransaction(input.mint);

  const include = {
    Nft: {
      include: {
        CampaignFundingTier: {
          include: {
            Campaign: true,
          },
        },
      },
    },
    NftTransaction: {
      include: CONVERT_NFT_TRANSACTION_INCLUDE,
    },
  } satisfies Prisma.OfferInclude;

  const where: Prisma.OfferWhereInput = {
    AND: [
      { mint },
      {
        OR: [
          // You're viewing your own offer and it hasn't been refunded/accepted yet
          getOpenOffersMadeByUserWhereClause(viewerId),
          // Or you're viewing all valid offers
          {
            AND: [
              { refundTxid: null },
              { saleTransactionId: null },
              {
                timeCreated:
                  mostRecentInvalidatingTx != null
                    ? {
                        gte: mostRecentInvalidatingTx.timeCreated,
                      }
                    : undefined,
              },
              { expirationDate: { gte: dayjs().toDate() } },
            ],
          },
        ],
      },
    ],
  };

  const [offers, totalCount, nft] = await Promise.all([
    prisma.offer.findMany({
      include,
      orderBy: NFT_TRANSACTION_ORDER_BY.map((orderBy) => ({
        NftTransaction: orderBy,
      })),
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.offer.count({ where }),
    prisma.nft.findUnique({ where: { mint } }),
  ]);

  if (nft == null) {
    return getEmptyConnection(Typename.NftOffersConnection);
  }

  const converted = await Promise.all(
    offers.map((offer) => {
      const transaction = convertNftTransaction(offer.NftTransaction);
      return {
        __typename: Typename.NftOffer as const,
        expirationDate: offer.expirationDate,
        isValid: isOfferValid(
          mostRecentInvalidatingTx,
          transaction,
          offer.NftTransaction.currencyId,
          offer.Nft.CampaignFundingTier?.Campaign?.goalCurrencyId,
          offer.Nft.hasBeenSold
        ),
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
    Typename.NftOffersEdge,
    Typename.NftOffersConnection,
    after,
    first,
    totalCount
  );
}
