import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import sendEmail from "src/utils/email/sendEmail";

export default async function sendCampaignAddedAsTeamMemberEmail(
  templateData: {
    campaignTitle: string;
    creatorUsername: string;
    link: string;
  },
  toEmails: Array<string>,
  req?: Request
) {
  return sendEmail(
    FROM_EMAIL,
    toEmails,
    NotificationTypeExpress_Enum.CampaignAddedAsTeamMember,
    templateData,
    req
  );
}
