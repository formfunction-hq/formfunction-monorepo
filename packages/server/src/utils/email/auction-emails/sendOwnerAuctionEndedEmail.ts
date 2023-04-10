import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import sendEmail from "src/utils/email/sendEmail";
import getNftLink from "src/utils/getNftLink";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default async function sendOwnerAuctionEndedEmail(
  templateData: {
    bidder: string;
    imageSrc: Maybe<string>;
    nftMint: string;
    nftName: string;
    price: string;
  },
  toEmail: string,
  req?: Request
): Promise<boolean> {
  return sendEmail(
    FROM_EMAIL,
    toEmail,
    NotificationTypeExpress_Enum.OwnerAuctionEnded,
    {
      ...templateData,
      nftLink: getNftLink(templateData.bidder, templateData.nftMint),
    },
    req
  );
}
