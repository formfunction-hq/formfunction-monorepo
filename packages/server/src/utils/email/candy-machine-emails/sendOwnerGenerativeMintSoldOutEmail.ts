import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import sendEmail from "src/utils/email/sendEmail";

export default async function sendOwnerGenerativeMintSoldOutEmail(
  templateData: {
    generativeMintTitle: string;
    imageSrc: string;
    linkToGenerativeSeries: string;
  },
  toEmail: string,
  req?: Request
) {
  return sendEmail(
    FROM_EMAIL,
    toEmail,
    NotificationTypeExpress_Enum.OwnerGenerativeMintSoldOut,
    templateData,
    req
  );
}
