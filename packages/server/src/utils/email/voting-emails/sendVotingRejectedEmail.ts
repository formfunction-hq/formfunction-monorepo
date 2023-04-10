import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import sendEmail from "src/utils/email/sendEmail";

export default async function sendVotingRejectedEmail(
  toEmail: string,
  notificationType:
    | NotificationTypeExpress_Enum.VotingBrokeGuidelines
    | NotificationTypeExpress_Enum.VotingDuplicate
    | NotificationTypeExpress_Enum.VotingRejected,
  req?: Request
) {
  return sendEmail(FROM_EMAIL, toEmail, notificationType, {}, req);
}
