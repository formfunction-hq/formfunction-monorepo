import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import sendEmail from "src/utils/email/sendEmail";

export default async function sendAirdropGiftReceivedEmail(
  templateData: {
    airdropCreatorUsername: string;
    link: string;
    receiverUsername: string;
  },
  toEmail: string,
  req?: Request
) {
  return sendEmail(
    FROM_EMAIL,
    toEmail,
    NotificationTypeExpress_Enum.AirdropGiftReceived,
    templateData,
    req
  );
}
