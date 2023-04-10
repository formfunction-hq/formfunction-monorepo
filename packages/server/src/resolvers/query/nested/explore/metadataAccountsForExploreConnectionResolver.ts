import { Prisma } from "@prisma/client";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import WHERE_NOT_BURNED from "src/constants/WhereNotBurned";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  ExploreSortOrder,
  MetadataAccount,
  MetadataAccountsConnection,
  MetadataAccountsForExploreInput,
} from "src/__generated__/generated";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import dayjs from "src/utils/dates/dayjsex";
import validateFirstInput from "src/utils/validation/validateFirstInput";
import logEvent from "src/utils/analytics/logEvent";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import toObject from "formfn-shared/dist/utils/toObject";
import getWhereForMetadataAccountsForExplore from "src/resolvers/query/nested/explore/getWhereForMetadataAccountsForExplore";

function getOrderBy(
  sortOrder: ExploreSortOrder
): Undef<Prisma.Enumerable<Prisma.NftOrderByWithRelationInput>> {
  switch (sortOrder) {
    case ExploreSortOrder.HighestPrice:
      return [
        {
          NftListing: { priceInLamports: "desc" },
        },
        {
          timeCreated: "desc",
        },
      ];
    case ExploreSortOrder.LowestPrice:
      return [
        {
          NftListing: { priceInLamports: "asc" },
        },
        {
          timeCreated: "desc",
        },
      ];
    case ExploreSortOrder.Newest:
      return [
        {
          timeCreated: "desc",
        },
      ];
    case ExploreSortOrder.Oldest:
      return [
        {
          timeCreated: "asc",
        },
      ];
    case ExploreSortOrder.AuctionEndEarliest:
      return [
        {
          NftListing: { auctionEndTime: "asc" },
        },
        {
          timeCreated: "desc",
        },
      ];
    case ExploreSortOrder.AuctionEndLatest:
      return [
        {
          NftListing: { auctionEndTime: "desc" },
        },
        {
          timeCreated: "desc",
        },
      ];
    case ExploreSortOrder.MostRecentlySold:
      return [
        {
          timeLastEditionSoldPrimary: {
            nulls: "last",
            sort: "desc",
          },
        },
        {
          timeCreated: "desc",
        },
      ];
    case ExploreSortOrder.NameAscending:
      return [
        {
          NftMetadata: {
            name: "asc",
          },
        },
      ];
    case ExploreSortOrder.NameDescending:
      return [
        {
          NftMetadata: {
            name: "desc",
          },
        },
      ];
    case ExploreSortOrder.RarityHighest:
      return [
        {
          seriesRarityRanking: "asc",
        },
        {
          // Explicit tie-breaker, since some NFTs may have the same rarity ranking (see https://moonrank.app/faq)
          // for more info on how ranking works.
          timeCreated: "desc",
        },
      ];
    case ExploreSortOrder.RarityLowest:
      return [
        {
          seriesRarityRanking: "desc",
        },
        {
          // Explicit tie-breaker, since some NFTs may have the same rarity ranking (see https://moonrank.app/faq)
          // for more info on how ranking works.
          timeCreated: "desc",
        },
      ];
    case ExploreSortOrder.FewestPieces:
    case ExploreSortOrder.LeastRecentlyAddedTo:
    case ExploreSortOrder.MostPieces:
    case ExploreSortOrder.MostRecentlyAddedTo:
      return undefined;
    default:
      return assertUnreachable(sortOrder);
  }
}

export default async function metadataAccountsForExploreConnectionResolver(
  context: MyContext,
  after: Maybe<string>,
  first: number,
  input: MetadataAccountsForExploreInput
): Promise<MetadataAccountsConnection> {
  validateFirstInput(first);
  const afterNumber = after == null ? 0 : Number(after);
  const prisma = getPrisma();

  const where: Prisma.NftWhereInput = {
    ...getWhereForMetadataAccountsForExplore(input),
    ...WHERE_NOT_BURNED,
  };

  const startTime = dayjs();
  const commonLoggingData = {
    after,
    first,
    input: toObject(input),
  };
  const [nfts, totalCount] = await Promise.all([
    prisma.nft
      .findMany({
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
        orderBy: getOrderBy(input.sortOrder),
        skip: afterNumber,
        take: first,
        where,
      })
      .then((val) => {
        logEvent(AnalyticsEvent.PrismaPerfExplore, context.req, {
          ...commonLoggingData,
          exploreType: "nft.findMany",
          ...getTimeElapsed(startTime),
        });
        return val;
      }),
    prisma.nft.count({ where }).then((val) => {
      logEvent(AnalyticsEvent.PrismaPerfExplore, context.req, {
        ...commonLoggingData,
        exploreType: "nft.count",
        ...getTimeElapsed(startTime),
      });
      return val;
    }),
  ]);

  const metadataAccounts: Array<MetadataAccount> = nfts.map((nft) =>
    convertNftToMetadataAccount(nft)
  );

  return createOffsetPaginationConnection(
    metadataAccounts,
    Typename.MetadataAccountsEdge,
    Typename.MetadataAccountsConnection,
    after,
    first,
    totalCount
  );
}
