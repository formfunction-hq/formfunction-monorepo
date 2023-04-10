import { Request } from "express";
import FROM_EMAIL from "src/constants/FromEmail";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import sendEmail from "src/utils/email/sendEmail";
import getExplorerTxLink from "src/utils/solana/getExplorerTxLink";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default async function sendBuyerOfferExpiredEmail(
  templateData: {
    imageSrc: Maybe<string>;
    nftLink: string;
    nftName: string;
    // Misnomer, this is the formatted price string (e.g. 1 SOL, 2 USDC)
    priceInSol: string;
    txid: string;
  },
  toEmail: string,
  req?: Request
): Promise<boolean> {
  const { imageSrc, nftLink, nftName, priceInSol, txid } = templateData;

  return sendEmail(
    FROM_EMAIL,
    toEmail,
    NotificationTypeExpress_Enum.BuyerOfferExpired,
    {
      imageSrc,
      nftLink,
      nftName,
      priceInSol,
      txLink: getExplorerTxLink(txid),
    },
    req
  );
}
