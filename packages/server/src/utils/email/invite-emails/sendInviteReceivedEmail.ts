import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import sendEmail from "src/utils/email/sendEmail";

export default async function sendInviteReceivedEmail(
  templateData: {
    expiryInDays: number;
    inviteLink: string;
    senderUsername: string;
  },
  toEmails: Array<string>,
  req?: Request
) {
  return sendEmail(
    FROM_EMAIL,
    toEmails,
    NotificationTypeExpress_Enum.InviteReceived,
    templateData,
    req
  );
}
