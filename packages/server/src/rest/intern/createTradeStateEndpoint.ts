import { NextFunction, Request, Response } from "express";
import auctionHouseCreateTradeStateIx from "@formfunction-hq/formfunction-auction-house/dist/solana/instructions/auctionHouseCreateTradeStateIx";
import { PublicKey, Transaction } from "@solana/web3.js";
import SaleType from "@formfunction-hq/formfunction-auction-house/dist/types/enum/SaleType";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";

export default async function createTradeStateEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { priceInLamports, saleType, tokenAccount, tokenMint, wallet } =
    req.body;

  // TODO(@bryancho): figure out how to specify currency for this intern endpoint
  const auctionHouseSdk = getAuctionHouseSdk(CurrencyNameExpress_Enum.Solana);

  const ix = await auctionHouseCreateTradeStateIx(
    {
      auctionHouse: auctionHouseSdk.auctionHouse,
      auctionHouseFeeAccount: auctionHouseSdk.feeAccount,
      auctionHouseProgramId: auctionHouseSdk.program.programId,
      authority: auctionHouseSdk.walletAuthority,
      program: auctionHouseSdk.program,
      tokenAccount: new PublicKey(tokenAccount),
      tokenMint: new PublicKey(tokenMint),
      treasuryMint: auctionHouseSdk.treasuryMint,
      wallet: new PublicKey(wallet),
    },
    {
      priceInLamports,
      saleType: saleType ?? SaleType.Auction,
    }
  );

  const tx = new Transaction();
  tx.add(ix);

  const txid = await ConnectionWrapper.sendAndConfirmTransaction(tx, [
    getAuthorityKeypair(),
  ]);

  res.json({ txid });
}
