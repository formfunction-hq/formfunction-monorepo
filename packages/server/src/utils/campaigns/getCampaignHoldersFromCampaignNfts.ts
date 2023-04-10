import { User } from "@prisma/client";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function getCampaignHoldersFromCampaignNfts(
  campaignId: string
): Promise<Array<User>> {
  const nfts = await getPrisma().nft.findMany({
    select: { Creator: true, Owner: true },
    where: {
      CampaignFundingTier: { Campaign: { id: campaignId } },
    },
  });

  return (
    nfts
      // Don't include creator as holder
      .filter(({ Creator, Owner }) => Creator.id !== Owner.id)
      .map(({ Owner }) => Owner)
  );
}
