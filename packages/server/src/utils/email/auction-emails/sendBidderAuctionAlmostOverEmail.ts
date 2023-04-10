import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import sendEmail from "src/utils/email/sendEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default async function sendBidderAuctionAlmostOverEmail(
  templateData: {
    duration: string;
    imageSrc: Maybe<string>;
    nftLink: string;
    nftName: string;
    price: string | number;
  },
  emails: Array<string>,
  req?: Request
): Promise<boolean> {
  return sendEmail(
    FROM_EMAIL,
    emails,
    NotificationTypeExpress_Enum.BidderAuctionAlmostOver,
    templateData,
    req
  );
}
