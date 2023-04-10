import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import groupBy from "formfn-shared/dist/utils/array/groupBy";
import toObject from "formfn-shared/dist/utils/toObject";
import pLimit from "p-limit";
import ScriptResult from "src/types/enums/ScriptResult";
import dayjs from "src/utils/dates/dayjsex";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import getPrisma from "src/utils/prisma/getPrisma";
import maybeNumberWithDefault from "formfn-shared/dist/utils/numbers/maybeNumberWithDefault";
import getCreatorsForExecuteSale from "formfn-shared/dist/utils/sale/getCreatorsForExecuteSale";
import getConnection from "src/utils/solana/getConnection";
import getPriceInLamportsForEdition from "src/utils/editions/getPriceInLamportsForEdition";
import parseCreatorsMetadataString from "src/utils/nft/parseCreatorsMetadataString";
import { range } from "formfn-shared/dist/utils/range";
import sleepMs from "formfn-shared/dist/utils/sleepMs";
import {
  CurrencyNameExpress_Enum,
  PriceFunctionTypeExpress_Enum,
} from "src/__generated__/generated";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";

/**
 * Used to purchase editions directly onchain for testing purposes
 * (e.g., test what happens if users hit our program directly to buy editions)
 */
export default async function buyEditions(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const {
    masterEditionMint,
    parallelLimit,
    purchaseQuantity,
    msBetweenPurchases,
    startingEdition,
    keypairToUse,
  } = req.body;
  const startTime = dayjs();
  const prisma = getPrisma();
  const limit = pLimit(maybeNumberWithDefault(parallelLimit, 10));
  const startingEditionNumber = maybeNumberWithDefault(startingEdition, 1);
  const purchaseQuantityNumber = maybeNumberWithDefault(purchaseQuantity, 10);
  const msBetweenPurchasesNumber = maybeNumberWithDefault(
    msBetweenPurchases,
    0
  );
  const masterEditionMintKey = new PublicKey(masterEditionMint);

  const [metadata, listing] = await Promise.all([
    prisma.nftMetadata.findUnique({
      where: { mint: masterEditionMint },
    }),
    prisma.nftListing.findUnique({
      include: { Currency: true },
      where: { nftId: masterEditionMint },
    }),
  ]);
  if (metadata == null) {
    res.status(404).json({
      message: `Could not find metadata for ${masterEditionMint}`,
    });
    return;
  }
  if (listing == null) {
    res.status(404).json({
      message: `Could not find listing for ${masterEditionMint}`,
    });
    return;
  }
  const metadataCreators = parseCreatorsMetadataString(
    metadata.creators as string
  );

  const testKeypair =
    keypairToUse != null
      ? Keypair.fromSecretKey(Uint8Array.from(keypairToUse))
      : Keypair.generate();
  const connection = getConnection();
  if (keypairToUse == null) {
    // Request airdrop if using random keypair
    // NOTE: due to restrictions/rate limits on devnet airdrops
    // it can be challenging to use a random keypair -- in those cases
    // specify `keypairToUse` (byte array with secret key) instead
    const airdropTx = await connection.requestAirdrop(
      testKeypair.publicKey,
      LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(airdropTx, "confirmed");
  }
  const accountBalance = await connection.getBalance(testKeypair.publicKey);
  const editions = range(
    startingEditionNumber,
    startingEditionNumber + purchaseQuantityNumber
  );

  const auctionHouseSdk = getAuctionHouseSdk(
    listing.Currency.name as CurrencyNameExpress_Enum
  );
  const results = await Promise.all(
    editions.map((edition) =>
      limit(async () => {
        const standardEditionMint = Keypair.generate();
        const newPrice = getPriceInLamportsForEdition(
          edition,
          listing.editionPriceFunctionType as PriceFunctionTypeExpress_Enum,
          listing.editionPriceFunctionParams! as Array<number>,
          Number(listing.editionPriceFunctionStartingPriceInLamports!)
        );
        const remainingAccounts =
          getCreatorsForExecuteSale(metadataCreators) ?? [];
        const buyTx = await auctionHouseSdk.buyEditionV2Tx(
          {
            buyer: testKeypair.publicKey,
            mint: masterEditionMintKey,
            newMint: standardEditionMint.publicKey,
          },
          {
            buyerWithAllowlistProofData: null,
            priceInLamports: newPrice,
          },
          remainingAccounts
        );

        // Only really matters if parallel limit is 1
        if (msBetweenPurchasesNumber > 0) {
          await sleepMs(msBetweenPurchasesNumber);
        }
        try {
          const txid = await ConnectionWrapper.sendAndConfirmTransaction(
            buyTx,
            [testKeypair, standardEditionMint]
          );
          return {
            otherInfo: {
              txid,
            },
            result: ScriptResult.Success,
          };
        } catch (e: any) {
          return {
            error: e,
            errorMessage: e.message,
            result: ScriptResult.Fail,
          };
        }
      })
    )
  );

  const resultsGroupedBy = groupBy(results, (result) => result.result);
  const responseData = Object.entries(resultsGroupedBy).reduce(
    (result, [scriptResult, groupedByList]) => ({
      ...result,
      [scriptResult]: {
        count: groupedByList.length,
        items: groupedByList,
      },
    }),
    {}
  );

  res.json(
    toObject({
      ...getTimeElapsed(startTime),
      debugInfo: {
        accountBalance,
        buyer: testKeypair.publicKey.toString(),
        editions,
        metadata,
        requestBody: req.body,
      },
      responseData,
    })
  );
}
