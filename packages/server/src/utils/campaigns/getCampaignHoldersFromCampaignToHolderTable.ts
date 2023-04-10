import { CampaignToHolder, Prisma } from "@prisma/client";
import ConvertUserType from "src/types/convert/ConvertUserType";
import getCampaignHoldersForCampaignToHolderWhere from "src/utils/campaigns/getCampaignHoldersForCampaignToHolderWhere";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default async function getCampaignHoldersFromCampaignToHolderTable(
  campaignId: string,
  skip?: number,
  first?: number,
  fundingTierIds?: Maybe<Array<string>>
): Promise<[Array<CampaignToHolder & { User: ConvertUserType }>, number]> {
  const where: Prisma.CampaignToHolderWhereInput = {
    Campaign: {
      id: campaignId,
    },
    User:
      fundingTierIds != null
        ? {
            Nft_Nft_ownerIdToUser: {
              some: { CampaignFundingTier: { id: { in: fundingTierIds } } },
            },
          }
        : undefined,
  };
  return getCampaignHoldersForCampaignToHolderWhere(where, skip, first);
}
