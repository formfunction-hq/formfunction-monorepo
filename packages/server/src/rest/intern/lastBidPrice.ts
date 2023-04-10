import { NextFunction, Request, Response } from "express";
import { PublicKey } from "@solana/web3.js";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";

export default async function lastBidPrice(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { mint } = req.query;

  // TODO(@bryancho): figure out how to specify currency for this intern endpoint
  const auctionHouseSdk = getAuctionHouseSdk(CurrencyNameExpress_Enum.Solana);

  const [lastBidPriceAddress] = await auctionHouseSdk.findLastBidPrice(
    new PublicKey(mint as string)
  );

  const lastBidPriceAccount =
    await auctionHouseSdk.program.account.lastBidPrice.fetch(
      lastBidPriceAddress
    );

  res.json({
    lastBidPriceAccount: {
      ...lastBidPriceAccount,
      price: lastBidPriceAccount.price.toString(),
    },
  });
}
