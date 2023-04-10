import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import sendEmail from "src/utils/email/sendEmail";
import getNftLink from "src/utils/getNftLink";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default async function sendBidderAuctionSettledEmail(
  templateData: {
    bidder: string;
    imageSrc: Maybe<string>;
    nftMint: string;
    nftName: string;
  },
  toEmail: string,
  req?: Request
) {
  return sendEmail(
    FROM_EMAIL,
    toEmail,
    NotificationTypeExpress_Enum.BidderAuctionSettled,
    {
      ...templateData,
      nftLink: getNftLink(templateData.bidder, templateData.nftMint),
    },
    req
  );
}
