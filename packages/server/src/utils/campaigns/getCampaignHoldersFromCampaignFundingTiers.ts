import { CampaignToHolder, Prisma } from "@prisma/client";
import ConvertUserType from "src/types/convert/ConvertUserType";
import getCampaignHoldersForCampaignToHolderWhere from "src/utils/campaigns/getCampaignHoldersForCampaignToHolderWhere";

export default async function getCampaignHoldersFromCampaignFundingTiers(
  campaignId: string,
  fundingTierIds: Array<string>,
  skip?: number,
  first?: number
): Promise<[Array<CampaignToHolder & { User: ConvertUserType }>, number]> {
  const where: Prisma.CampaignToHolderWhereInput = {
    Campaign: { id: campaignId },
    User: {
      Nft_Nft_ownerIdToUser: {
        some: { CampaignFundingTier: { id: { in: fundingTierIds } } },
      },
    },
  };
  return getCampaignHoldersForCampaignToHolderWhere(where, skip, first);
}
