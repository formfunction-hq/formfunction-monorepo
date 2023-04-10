import { PublicKey } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import dayjs from "src/utils/dates/dayjsex";
import pLimit from "p-limit";
import findAta from "formfn-shared/dist/utils/solana/pdas/findAta";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import {
  CurrencyNameExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import sleep from "formfn-shared/dist/utils/sleep";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";
import groupBy from "formfn-shared/dist/utils/array/groupBy";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";

const limit = pLimit(50);

/**
 * Cancel old bids so we can reclaim rent.
 */
export default async function cancelOldBids(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  // dateAfter—we only consider bids after this date
  // dateBefore—we only consider bids before this date
  // dryRun—we won't actually try cancelling if this is true
  const { dateAfter, dateBefore, dryRun, sleepSeconds } = req.body;

  // NOTE: we don't need to pass in currency here since the feeAccount is same
  // for all currencies
  const prisma = getPrisma();

  const defaultDateAfter = dayjs().subtract(12, "day");
  const defaultDateBefore = dayjs().subtract(8, "day");
  if (dateBefore != null && dayjs(dateBefore).isAfter(defaultDateBefore)) {
    throw new Error("dateBefore must be at least 8 days before");
  }

  const dateAfterDayjs =
    dateAfter != null ? dayjs(dateAfter) : defaultDateAfter;
  const dateBeforeDayjs =
    dateBefore != null ? dayjs(dateBefore) : defaultDateBefore;

  // eslint-disable-next-line no-console
  console.log("dateAfter", dateAfterDayjs.toString());
  // eslint-disable-next-line no-console
  console.log("dateBefore", dateBeforeDayjs.toString());

  const bids = await prisma.nftTransaction.findMany({
    include: { Currency: true },
    where: {
      timeCreated: {
        gt: dateAfterDayjs.toDate(),
        lt: dateBeforeDayjs.toDate(),
      },
      type: NftTransactionTypeExpress_Enum.Bid,
    },
  });

  const feeAccountBefore = await ConnectionWrapper.getAccountInfo(
    getAuctionHouseConstants().feeAccount
  );

  const results = await Promise.all(
    bids.map((bid) =>
      limit(async () => {
        const [tokenAccount] = await findAta(
          new PublicKey(bid.toUserId),
          new PublicKey(bid.mint)
        );
        const auctionHouseSdk = getAuctionHouseSdk(
          bid.Currency.name as CurrencyNameExpress_Enum
        );
        const [tradeStateAddress] = await auctionHouseSdk.findTradeState(
          new PublicKey(bid.fromUserId),
          tokenAccount,
          new PublicKey(bid.mint),
          Number(bid.price)
        );
        const tradeState = await ConnectionWrapper.getAccountInfo(
          tradeStateAddress
        );

        const bidLoggingFields = {
          bidMint: bid.mint,
          bidTxid: bid.txid,
        };

        if (tradeState == null) {
          return {
            ...bidLoggingFields,
            status: "null-trade-state",
            tradeStateAddress: tradeStateAddress.toString(),
          };
        }

        if (dryRun) {
          return { ...bidLoggingFields, status: "no-op" };
        }

        try {
          const tx = await auctionHouseSdk.cancelTx(
            {
              priceInLamports: Number(bid.price),
              tokenAccount,
              tokenMint: new PublicKey(bid.mint),
              wallet: new PublicKey(bid.fromUserId),
            },
            {}
          );
          const txid = await ConnectionWrapper.sendAndConfirmTransaction(tx, [
            getAuthorityKeypair(),
          ]);

          return { ...bidLoggingFields, status: "cancelled", txid };
        } catch (e) {
          return {
            ...bidLoggingFields,
            errorMessage: (e as Error).message,
            errorName: (e as Error).name,
            status: "error",
          };
        }
      })
    )
  );

  // Sleep to make sure the lamports are correct
  await sleep(dayjs.duration({ seconds: sleepSeconds ?? 10 }));
  const feeAccountAfter = await ConnectionWrapper.getAccountInfo(
    getAuctionHouseConstants().feeAccount
  );

  const lamportsReclaimed =
    feeAccountAfter!.lamports - feeAccountBefore!.lamports;

  res.json({
    lamportsReclaimed,
    numBids: bids.length,
    ...groupBy(results, (result) => result.status),
  });
}
