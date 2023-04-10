import getPrisma from "src/utils/prisma/getPrisma";

export default async function isUserCampaignHolder(
  campaignId: string,
  userId: string
): Promise<boolean> {
  return (
    (await getPrisma().nft.count({
      where: {
        CampaignFundingTier: {
          Campaign: { id: campaignId },
        },
        Owner: { id: userId },
      },
    })) > 0
  );
}
