import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  NftStatusExpress_Enum,
  UpdateCampaignFundingTierNftsInput,
  UpdateCampaignFundingTierNftsResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import invariant from "tiny-invariant";
import CONVERT_CAMPAIGN_FUNDING_TIER_INCLUDE from "src/constants/include/ConvertCampaignFundingTierInclude";
import convertCampaignFundingTier from "src/utils/convert/convertCampaignFundingTier";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import assertCanUpdateCampaignFundingTierNfts from "src/utils/campaigns/validation/assertCanUpdateCampaignFundingTierNfts";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { Campaign, Nft, NftListing } from "@prisma/client";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import toObject from "formfn-shared/dist/utils/toObject";

// NOTE: keep in sync with getWhereForCurrencyId in metadataAccountsAvailableToAddToCampaignConnectionResolver.ts
function canNftBeAddedToFundingTier(
  nft: Nft & { NftListing: Maybe<NftListing>; StandardEditionNft: Array<Nft> },
  campaign: Campaign
): { canBeAdded: boolean; loggingInfo: Record<string, any> } {
  const commonLoggingInfo = {
    nft: toObject(nft),
  };
  const basicClause =
    nft.creatorId === campaign.creatorId &&
    nft.ownerId === campaign.creatorId &&
    nft.campaignFundingTierId == null &&
    !nft.hasBeenSold &&
    nft.isMasterEdition &&
    !nft.isPnft;

  // Only allow listed editions if none have sold yet
  const listedEditionsClause =
    nft.status === NftStatusExpress_Enum.ListedEditions &&
    nft.StandardEditionNft.length === 0;

  if (campaign.goalCurrencyId == null) {
    const statusClause = [
      NftStatusExpress_Enum.Listed,
      NftStatusExpress_Enum.ListedInstantSale,
      NftStatusExpress_Enum.ListingScheduled,
      NftStatusExpress_Enum.Owned,
    ].includes(nft.status as NftStatusExpress_Enum);
    const canBeAdded = basicClause && (listedEditionsClause || statusClause);
    return {
      canBeAdded,
      loggingInfo: {
        ...commonLoggingInfo,
        basicClause,
        canBeAdded,
        listedEditionsClause,
        statusClause,
      },
    };
  }

  const currencyClause =
    campaign.goalCurrencyId === nft.NftListing!.currencyId &&
    [
      NftStatusExpress_Enum.Listed,
      NftStatusExpress_Enum.ListedInstantSale,
      NftStatusExpress_Enum.ListingScheduled,
    ].includes(nft.status as NftStatusExpress_Enum);
  // Since we default NftListing.currencyId to SOL's currency ID, we need this extra clause
  const statusClause = nft.status === NftStatusExpress_Enum.Owned;
  const canBeAdded =
    basicClause && (currencyClause || listedEditionsClause || statusClause);
  return {
    canBeAdded,
    loggingInfo: {
      ...commonLoggingInfo,
      basicClause,
      canBeAdded,
      currencyClause,
      listedEditionsClause,
      statusClause,
    },
  };
}

async function assertNftsCanBeAddedToFundingTier(
  nftIds: Array<string>,
  campaign: Campaign,
  campaignFundingTierId: string
) {
  const prisma = getPrisma();
  const nfts = await prisma.nft.findMany({
    include: {
      NftListing: true,
      StandardEditionNft: true,
    },
    where: {
      campaignFundingTierId: {
        not: campaignFundingTierId,
      },
      id: {
        in: nftIds,
      },
    },
  });
  const results = nfts.map((nft) => canNftBeAddedToFundingTier(nft, campaign));
  const canAllNftsBeAdded = results.every(({ canBeAdded }) => canBeAdded);
  if (!canAllNftsBeAdded) {
    logError(
      AnalyticsEvent.UpdateCampaignFundingTierNftsError,
      "One or more NFTs cannot be added to a funding tier.",
      null,
      {
        campaign: toObject(campaign),
        campaignFundingTierId,
        results,
      }
    );
    throw new Error("One or more NFTs cannot be added to this funding tier.");
  }
}

export default async function updateCampaignFundingTierNftsResolver(
  context: MyContext,
  input: UpdateCampaignFundingTierNftsInput
): Promise<UpdateCampaignFundingTierNftsResponse> {
  const prisma = getPrisma();
  const verifiedPublicKey = assertUserSignedRequest(context);
  const inputNftIdsWithStandardEditions = (
    await prisma.nft.findMany({
      select: {
        id: true,
      },
      where: {
        OR: [
          {
            id: {
              in: input.nftIds,
            },
          },
          {
            masterEditionMint: {
              in: input.nftIds,
            },
          },
        ],
      },
    })
  ).map(({ id }) => id);
  const campaignFundingTierBeforeUpdate =
    await prisma.campaignFundingTier.findUnique({
      include: {
        ...CONVERT_CAMPAIGN_FUNDING_TIER_INCLUDE,
        Campaign: true,
        Nft: { select: { mint: true } },
      },
      where: {
        id: input.campaignFundingTierId,
      },
    });
  invariant(campaignFundingTierBeforeUpdate != null);
  await assertNftsCanBeAddedToFundingTier(
    inputNftIdsWithStandardEditions,
    campaignFundingTierBeforeUpdate.Campaign,
    campaignFundingTierBeforeUpdate.id
  );
  await assertCanUpdateCampaignFundingTierNfts(
    campaignFundingTierBeforeUpdate,
    inputNftIdsWithStandardEditions,
    verifiedPublicKey
  );

  // Use a transaction to ensure either all mutations succeed or none of them do.
  const [, , campaignFundingTier] = await prisma.$transaction([
    // First, we remove all the NFTs from the funding tier.
    prisma.nft.updateMany({
      data: {
        campaignFundingTierId: null,
      },
      where: {
        campaignFundingTierId: input.campaignFundingTierId,
      },
    }),
    // Then, we add all the new NFTs to the funding tier.
    prisma.nft.updateMany({
      data: {
        campaignFundingTierId: input.campaignFundingTierId,
      },
      where: {
        id: {
          in: inputNftIdsWithStandardEditions,
        },
      },
    }),
    // Finally, we update nftOrder.
    prisma.campaignFundingTier.update({
      data: {
        // Can ignore standard editions here
        nftOrder: input.nftIds,
      },
      include: CONVERT_CAMPAIGN_FUNDING_TIER_INCLUDE,
      where: {
        id: input.campaignFundingTierId,
      },
    }),
  ]);

  return {
    __typename: Typename.UpdateCampaignFundingTierNftsResponse,
    // NOTE: the resolver for CampaignFundingTier.metadataAccounts will handle loading the NFTs
    campaignFundingTier: convertCampaignFundingTier(campaignFundingTier),
  };
}
