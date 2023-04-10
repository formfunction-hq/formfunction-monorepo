import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import sendEmail from "src/utils/email/sendEmail";
import getNftLink from "src/utils/getNftLink";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default async function sendBidderLostAuctionEmail(
  templateData: {
    imageSrc: Maybe<string>;
    nftMint: string;
    nftName: string;
    seller: string;
  },
  toEmail: string,
  req?: Request
): Promise<boolean> {
  return sendEmail(
    FROM_EMAIL,
    toEmail,
    NotificationTypeExpress_Enum.BidderLostAuction,
    {
      ...templateData,
      nftLink: getNftLink(templateData.seller, templateData.nftMint),
    },
    req
  );
}
