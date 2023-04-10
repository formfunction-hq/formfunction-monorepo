import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import sendEmail from "src/utils/email/sendEmail";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default async function sendOwnerOfferReceivedEmail(
  templateData: {
    buyer: string;
    imageSrc: Maybe<string>;
    nftLink: string;
    nftName: string;
    // Misnomer, this is the formatted price string (e.g. 1 SOL, 2 USDC)
    priceInSol: string;
  },
  toEmail: string,
  req?: Request
): Promise<boolean> {
  return sendEmail(
    FROM_EMAIL,
    toEmail,
    NotificationTypeExpress_Enum.OwnerOfferReceived,
    templateData,
    req
  );
}
