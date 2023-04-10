import getCampaignHoldersFromCampaignNfts from "src/utils/campaigns/getCampaignHoldersFromCampaignNfts";
import getCampaignHoldersFromCampaignToHolderTable from "src/utils/campaigns/getCampaignHoldersFromCampaignToHolderTable";
import getPrisma from "src/utils/prisma/getPrisma";
import invariant from "tiny-invariant";

/**
 * Syncs campaign holders with current owners of NFTs that are
 * associated with funding tiers of specified campaign.
 *
 * We intentionally treat our DB as the source of truth for the
 * NFT owner and let other processes handle keeping the NFT owner
 * in sync with the onchain owner.
 */
export default async function syncCampaignHolders(
  campaignId: string,
  dryRun?: boolean
): Promise<{
  currentHolderIds: Array<string>;
  difference: Array<string>;
  holderIds: Array<string>;
}> {
  const prisma = getPrisma();
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
  });
  invariant(campaign != null, "Campaign must not be null!");

  const [[currentHolders], holders] = await Promise.all([
    getCampaignHoldersFromCampaignToHolderTable(campaignId),
    getCampaignHoldersFromCampaignNfts(campaignId),
  ]);
  const currentHolderIds = currentHolders.map(({ User }) => User.id);
  const holderIds = holders.map(({ id }) => id);
  const difference = holderIds.filter(
    (holderId) => !currentHolderIds.includes(holderId)
  );
  if (dryRun) {
    return { currentHolderIds, difference, holderIds };
  }

  await prisma.$transaction([
    // Delete existing holder list
    prisma.campaignToHolder.deleteMany({
      where: { Campaign: { id: campaignId } },
    }),
    // Create campaign to holder connection
    prisma.campaignToHolder.createMany({
      data: holderIds.map((holderId) => ({
        campaignId,
        holderUserId: holderId,
      })),
      skipDuplicates: true,
    }),
  ]);

  return { currentHolderIds, difference, holderIds };
}
