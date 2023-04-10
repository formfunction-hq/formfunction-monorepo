import { NextFunction, Request, Response } from "express";
import invariant from "tiny-invariant";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import convertNft from "src/utils/convert/convertNft";
import getPrisma from "src/utils/prisma/getPrisma";
import isNftSynced from "src/utils/solana/isNftSynced";
import toObject from "formfn-shared/dist/utils/toObject";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

/**
 * Checks if an NFT's state in our DB is in sync with the actual on-chain state.
 */
export default async function isNftSyncedEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { mint } = req.query;

  const prisma = getPrisma();
  let converted = null;
  let prismaNft = null;
  let transactions = null;
  try {
    prismaNft = await prisma.nft.findUnique({
      include: CONVERT_NFT_TO_METADATA_INCLUDE,
      where: { mint: mint as string },
    });
    invariant(prismaNft != null, "Cannot be null");

    const { nft, transactions: txsInner } = await convertNft(prismaNft);
    converted = nft;
    transactions = txsInner;
  } catch {
    res.json({
      ignore: true,
      message: "Not found",
      statusCode: 404,
    });
    return;
  }
  const convertedToReturn = toObject({
    ownerId: converted.ownerId,
    price: converted.price,
    status: converted.status,
  });

  const prismaNftToReturn = toObject({
    ownerId: prismaNft.ownerId,
    price: prismaNft.NftListing?.priceInLamports,
    status: prismaNft.status,
  });

  const auctionHouseSdk = getAuctionHouseSdk(
    (prismaNft.NftListing?.Currency.name as Maybe<CurrencyNameExpress_Enum>) ??
      CurrencyNameExpress_Enum.Solana
  );
  if (await isNftSynced(prismaNft, converted, auctionHouseSdk)) {
    res.json({
      message: "No difference",
      onchainNft: convertedToReturn,
      prismaNft: prismaNftToReturn,
    });
    return;
  }

  res.json({
    message: "Out of sync",
    onchainNft: convertedToReturn,
    onchainTransactions: transactions,
    prismaNft: prismaNftToReturn,
  });
}
