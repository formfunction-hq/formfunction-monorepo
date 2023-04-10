import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { Undef } from "formfn-shared/dist/types/UtilityTypes";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import isUserCampaignHolder from "src/utils/campaigns/isUserCampaignHolder";
import getPrisma from "src/utils/prisma/getPrisma";

async function canDeleteCampaignToHolderRecord(
  campaignId: string,
  holderUserId: string
) {
  return (
    (await getPrisma().campaignToHolder.findUnique({
      where: {
        campaignId_holderUserId: {
          campaignId,
          holderUserId,
        },
      },
    })) != null
  );
}

// Essentially just syncs the given user's holder status for the
// specified campaign. Intentionally left sync to return the promise
function getCampaignHolderDeleteOrUpsert(
  campaignId: string,
  holderUserId: string,
  creatorId: string,
  isUserHolder: boolean,
  canDelete: boolean
) {
  const prisma = getPrisma();
  const where: Prisma.CampaignToHolderWhereUniqueInput = {
    campaignId_holderUserId: { campaignId, holderUserId },
  };
  // Don't include creator as holder
  if (holderUserId === creatorId) {
    return null;
  }

  return isUserHolder
    ? prisma.campaignToHolder.upsert({
        create: {
          campaignId,
          holderUserId,
        },
        update: {
          holderUserId,
        },
        where,
      })
    : canDelete
    ? prisma.campaignToHolder.delete({
        where,
      })
    : null;
}

export default async function updateCampaignToHolderWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const {
    ownerId: oldOwnerId,
    campaignFundingTierId: previousCampaignFundingTierId,
  } = req.body.event.data.old ?? {};
  const { id: nftId } = req.body.event.data.new;

  const prisma = getPrisma();
  const [nft, previousCampaignFundingTier] = await Promise.all([
    prisma.nft.findUnique({
      include: { CampaignFundingTier: { include: { Campaign: true } } },
      where: { id: nftId },
    }),
    isEmptyString(previousCampaignFundingTierId)
      ? null
      : prisma.campaignFundingTier.findFirst({
          include: { Campaign: true },
          where: { id: previousCampaignFundingTierId! },
        }),
  ]);

  if (nft == null) {
    res.json({
      message: "NFT does not exist",
      status: "skipped",
    });
    return;
  }

  if (
    previousCampaignFundingTier == null &&
    nft.CampaignFundingTier?.Campaign == null
  ) {
    res.json({
      message: "NFT is not part of campaign, skipping CampaignToHolder update",
      status: "skipped",
    });
    return;
  }

  const previousOwnerId = oldOwnerId as Undef<string>;
  const previousCampaignId = previousCampaignFundingTier?.Campaign.id;
  const newCampaignId = nft.CampaignFundingTier?.Campaign.id;
  const { creatorId, ownerId: newOwnerId } = nft;

  const dbTransactions = [];
  if (previousCampaignId != null && previousOwnerId != null) {
    dbTransactions.push(
      getCampaignHolderDeleteOrUpsert(
        previousCampaignId,
        previousOwnerId,
        creatorId,
        await isUserCampaignHolder(previousCampaignId, previousOwnerId),
        await canDeleteCampaignToHolderRecord(
          previousCampaignId,
          previousOwnerId
        )
      )
    );
  }
  if (newCampaignId != null) {
    dbTransactions.push(
      getCampaignHolderDeleteOrUpsert(
        newCampaignId,
        newOwnerId,
        creatorId,
        await isUserCampaignHolder(newCampaignId, newOwnerId),
        await canDeleteCampaignToHolderRecord(newCampaignId, newOwnerId)
      )
    );
  }

  await prisma.$transaction(filterNulls(dbTransactions));

  res.json({ success: true });
}
