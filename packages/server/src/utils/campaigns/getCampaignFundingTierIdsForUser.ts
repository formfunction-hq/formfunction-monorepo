import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import getCampaignWhereForCampaignForSlugInput from "src/utils/campaigns/getCampaignWhereForCampaignForSlugInput";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function getCampaignFundingTierIdsForUser(
  input: {
    campaignId?: string;
    campaignSlug?: string;
    creatorId?: MaybeUndef<string>;
    creatorUsername?: MaybeUndef<string>;
  },
  ownerId: Maybe<string>
): Promise<Maybe<Array<string>>> {
  const { campaignId } = input;
  if (ownerId == null) {
    return null;
  }

  const ownedNftsWithFundingTier = await getPrisma().nft.findMany({
    distinct: ["campaignFundingTierId"],
    select: { campaignFundingTierId: true },
    where: {
      CampaignFundingTier: {
        Campaign:
          campaignId != null
            ? { id: campaignId }
            : getCampaignWhereForCampaignForSlugInput({
                ...input,
                campaignSlug: input.campaignSlug!,
              }),
      },
      Owner: { id: ownerId },
    },
  });

  return ownedNftsWithFundingTier.map(
    ({ campaignFundingTierId }) => campaignFundingTierId!
  );
}
