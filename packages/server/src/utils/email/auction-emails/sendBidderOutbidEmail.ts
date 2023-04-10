import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import sendEmail from "src/utils/email/sendEmail";
import getNftLink from "src/utils/getNftLink";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default async function sendBidderOutbidEmail(
  templateData: {
    imageSrc: Maybe<string>;
    nftMint: string;
    nftName: string;
    price: string;
    seller: string;
    txLink: string;
  },
  toEmail: string,
  req?: Request
) {
  return sendEmail(
    FROM_EMAIL,
    toEmail,
    NotificationTypeExpress_Enum.BidderOutbid,
    {
      ...templateData,
      nftLink: getNftLink(templateData.seller, templateData.nftMint),
    },
    req
  );
}
