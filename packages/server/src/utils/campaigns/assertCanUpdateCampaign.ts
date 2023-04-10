import { Prisma } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import ConvertCampaignType from "src/types/convert/ConvertCampaignType";
import CampaignAction from "src/types/enums/CampaignAction";
import getPrisma from "src/utils/prisma/getPrisma";
import { CampaignStatusExpress_Enum } from "src/__generated__/generated";
import invariant from "tiny-invariant";

function draftAllowed(status: CampaignStatusExpress_Enum) {
  switch (status) {
    case CampaignStatusExpress_Enum.Draft:
      return true;
    case CampaignStatusExpress_Enum.Approved:
    case CampaignStatusExpress_Enum.Concluded:
    case CampaignStatusExpress_Enum.Rejected:
    case CampaignStatusExpress_Enum.Pending:
    case CampaignStatusExpress_Enum.Published:
      return false;
    default:
      return assertUnreachable(status);
  }
}

function approvedAllowed(status: CampaignStatusExpress_Enum) {
  switch (status) {
    case CampaignStatusExpress_Enum.Approved:
      return true;
    case CampaignStatusExpress_Enum.Concluded:
    case CampaignStatusExpress_Enum.Draft:
    case CampaignStatusExpress_Enum.Rejected:
    case CampaignStatusExpress_Enum.Pending:
    case CampaignStatusExpress_Enum.Published:
      return false;
    default:
      return assertUnreachable(status);
  }
}

function publishedAllowed(status: CampaignStatusExpress_Enum) {
  switch (status) {
    case CampaignStatusExpress_Enum.Published:
      return true;
    case CampaignStatusExpress_Enum.Approved:
    case CampaignStatusExpress_Enum.Concluded:
    case CampaignStatusExpress_Enum.Draft:
    case CampaignStatusExpress_Enum.Rejected:
    case CampaignStatusExpress_Enum.Pending:
      return false;
    default:
      return assertUnreachable(status);
  }
}

function pendingAllowed(status: CampaignStatusExpress_Enum) {
  switch (status) {
    case CampaignStatusExpress_Enum.Pending:
      return true;
    case CampaignStatusExpress_Enum.Concluded:
    case CampaignStatusExpress_Enum.Draft:
    case CampaignStatusExpress_Enum.Rejected:
    case CampaignStatusExpress_Enum.Approved:
    case CampaignStatusExpress_Enum.Published:
      return false;
    default:
      return assertUnreachable(status);
  }
}

function draftOrApprovedOrPublishedAllowed(status: CampaignStatusExpress_Enum) {
  return (
    draftAllowed(status) || approvedAllowed(status) || publishedAllowed(status)
  );
}

function canEditBasicInfo(status: CampaignStatusExpress_Enum) {
  return draftAllowed(status) || approvedAllowed(status);
}

function canEditGallery(status: CampaignStatusExpress_Enum) {
  return draftOrApprovedOrPublishedAllowed(status);
}

function canEditAboutSection(status: CampaignStatusExpress_Enum) {
  return draftOrApprovedOrPublishedAllowed(status);
}

function canSubmitForApproval(status: CampaignStatusExpress_Enum) {
  return draftAllowed(status);
}

function canAddFundingTier(status: CampaignStatusExpress_Enum) {
  return draftOrApprovedOrPublishedAllowed(status);
}

function canDeleteFundingTier(status: CampaignStatusExpress_Enum) {
  return draftOrApprovedOrPublishedAllowed(status);
}

function canAddNft(status: CampaignStatusExpress_Enum) {
  return approvedAllowed(status) || publishedAllowed(status);
}

function canRemoveNft(status: CampaignStatusExpress_Enum) {
  return approvedAllowed(status);
}

function canPublishCampaign(status: CampaignStatusExpress_Enum) {
  return approvedAllowed(status);
}

function canUpdateFundingTierOrder(status: CampaignStatusExpress_Enum) {
  return draftOrApprovedOrPublishedAllowed(status);
}

function canUpdateFundingTierInfo(status: CampaignStatusExpress_Enum) {
  return draftOrApprovedOrPublishedAllowed(status);
}

function canApproveCampaign(status: CampaignStatusExpress_Enum) {
  return pendingAllowed(status);
}

function canCampaignActionBeTaken(
  status: CampaignStatusExpress_Enum,
  action: CampaignAction
) {
  switch (action) {
    case CampaignAction.AddFundingTier:
      return canAddFundingTier(status);
    case CampaignAction.AddNft:
      return canAddNft(status);
    case CampaignAction.ApproveCampaign:
      return canApproveCampaign(status);
    case CampaignAction.DeleteFundingTier:
      return canDeleteFundingTier(status);
    case CampaignAction.EditAboutSection:
      return canEditAboutSection(status);
    case CampaignAction.EditBasicInfo:
      return canEditBasicInfo(status);
    case CampaignAction.EditGallery:
      return canEditGallery(status);
    case CampaignAction.PublishCampaign:
      return canPublishCampaign(status);
    case CampaignAction.RemoveNft:
      return canRemoveNft(status);
    case CampaignAction.SubmitForApproval:
      return canSubmitForApproval(status);
    case CampaignAction.UpdateFundingTierOrder:
      return canUpdateFundingTierOrder(status);
    case CampaignAction.UpdateFundingTierInfo:
      return canUpdateFundingTierInfo(status);
    default:
      return assertUnreachable(action);
  }
}

export default async function assertCanUpdateCampaign(
  verifiedPublicKey: PublicKey,
  campaignWhere: Prisma.CampaignWhereUniqueInput,
  campaignAction: CampaignAction
): Promise<ConvertCampaignType> {
  const campaign = await getPrisma().campaign.findUnique({
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: campaignWhere,
  });
  invariant(campaign != null, "Campaign does not exist");
  invariant(
    campaign!.creatorId === verifiedPublicKey.toString(),
    "You do not have permissions to update the campaign"
  );

  const { status } = campaign!;
  if (
    !canCampaignActionBeTaken(
      status as CampaignStatusExpress_Enum,
      campaignAction
    )
  ) {
    // TODO: add link
    throw new Error(
      "You cannot take this action at this time. " +
        "To learn more about what actions can be taken on a campaign, please go to our help center."
    );
  }

  return campaign!;
}
