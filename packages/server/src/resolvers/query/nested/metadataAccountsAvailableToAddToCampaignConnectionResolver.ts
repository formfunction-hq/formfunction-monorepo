import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  MetadataAccount,
  MetadataAccountsConnection,
  MetadataAccountsAvailableToAddToCampaignInput,
  NftStatusExpress_Enum,
} from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import getCreatorFilter from "src/utils/prisma/where/getCreatorFilter";
import invariant from "tiny-invariant";
import getOwnerFilter from "src/utils/prisma/where/getOwnerFilter";

// NOTE: keep in sync with canNftBeAddedToFundingTier in updateCampaignFundingTierNftsResolver.ts
function getWhereForCurrencyId(
  creatorFilter: Prisma.NftWhereInput,
  ownerFilter: Prisma.NftWhereInput,
  currencyId: MaybeUndef<string>
): Prisma.NftWhereInput {
  const commonFields = {
    ...creatorFilter,
    ...ownerFilter,
    campaignFundingTierId: null,
    hasBeenSold: false,
    isMasterEdition: true,
    isPnft: false,
  };

  // Only allow listed editions if none have sold yet
  const listedEditionsClause = {
    StandardEditionNft: {
      none: {},
    },
    status: NftStatusExpress_Enum.ListedEditions,
  };

  if (currencyId != null) {
    return {
      ...commonFields,
      OR: [
        {
          NftListing: {
            currencyId,
          },
          status: {
            in: [
              NftStatusExpress_Enum.Listed,
              NftStatusExpress_Enum.ListedInstantSale,
              NftStatusExpress_Enum.ListingScheduled,
            ],
          },
        },
        // Since we default NftListing.currencyId to SOL's currency ID, we need this extra clause
        {
          status: {
            in: [NftStatusExpress_Enum.Owned],
          },
        },
        listedEditionsClause,
      ],
    };
  }

  // TODO[@arcticmatt] this should only be the case for "sale count" goals. And in that case, we may want to
  // have some different restrictions for adding NFTs.
  //
  // Since we're starting out with "volume" goals, will just leave this logic for now, but may need
  // to revisit later.
  return {
    ...commonFields,
    OR: [
      {
        status: {
          in: [
            NftStatusExpress_Enum.Listed,
            NftStatusExpress_Enum.ListedInstantSale,
            NftStatusExpress_Enum.ListingScheduled,
            NftStatusExpress_Enum.Owned,
          ],
        },
      },
      listedEditionsClause,
    ],
  };
}

export default async function metadataAccountsAvailableToAddToCampaignConnectionResolver(
  _context: MyContext,
  after: Maybe<string>,
  first: number,
  input: MetadataAccountsAvailableToAddToCampaignInput
): Promise<MetadataAccountsConnection> {
  const afterNumber = after == null ? 0 : Number(after);
  const prisma = getPrisma();
  const creatorFilter = getCreatorFilter(
    input.creatorAddress,
    input.creatorUsername
  );
  const ownerFilter = getOwnerFilter(
    input.creatorAddress,
    input.creatorUsername
  );

  const campaignFundingTier = await prisma.campaignFundingTier.findUnique({
    include: {
      Campaign: true,
    },
    where: {
      id: input.campaignFundingTierId,
    },
  });
  invariant(campaignFundingTier != null);
  const campaignCurrencyId = campaignFundingTier.Campaign.goalCurrencyId;

  const where: Prisma.NftWhereInput = getWhereForCurrencyId(
    creatorFilter,
    ownerFilter,
    campaignCurrencyId
  );

  const [nftResults, totalCount] = await Promise.all([
    prisma.nft.findMany({
      include: CONVERT_NFT_TO_METADATA_INCLUDE,
      orderBy: { timeCreated: "desc" },
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.nft.count({ where }),
  ]);

  const metadataAccounts: Array<MetadataAccount> = [...nftResults].map((nft) =>
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
