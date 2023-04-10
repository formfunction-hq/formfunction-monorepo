import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import sendEmail from "src/utils/email/sendEmail";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default async function sendUnlockableDeclinedToShareInfoEmail(
  templateData: {
    buyer: string;
    nftName: string;
    unlockableImageSrc: Maybe<string>;
  },
  toEmail: string,
  req?: Request
) {
  return sendEmail(
    FROM_EMAIL,
    toEmail,
    NotificationTypeExpress_Enum.UnlockableDeclinedToSharedInfo,
    templateData,
    req
  );
}
