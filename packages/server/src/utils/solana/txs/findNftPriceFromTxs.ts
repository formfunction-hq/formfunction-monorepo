import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import getPriceInLamportsForEdition from "src/utils/editions/getPriceInLamportsForEdition";
import getEditionPriceInfo from "src/utils/prisma/getEditionPriceInfo";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

/**
 * This is necessary for editions with the "linear" price function type.
 *
 * The SoldEditionPrimary txs will contain the price the last edition was sold for.
 * But we want to return the price of the edition that's currently for sale, which is why we need to call
 * getPriceInLamportsForEdition.
 *
 * If we didn't need to cover this case, we could just return the tx's price.
 */
async function getPriceForEditions(
  mint: string,
  tx: NftTransactionOnchain,
  txs: Array<NftTransactionOnchain>
): Promise<MaybeUndef<number>> {
  // This tx is included for both the master and standard editions,
  // and we have separate logic for these separate types

  if (tx.mint === mint) {
    // tx.mint is the standard edition
    // Here, the price is null, since the standard edition has just been sold
    return null;
  }

  // The rest of this function deals with the master edition's price
  const prisma = getPrisma();
  const numSales = txs.filter(
    (txInner) =>
      txInner.type === NftTransactionTypeExpress_Enum.SoldEditionPrimary
  ).length;
  const masterEditionNft = await prisma.nft.findUnique({
    include: {
      NftListing: true,
    },
    where: {
      mint,
    },
  });

  if (numSales === masterEditionNft?.maxSupply) {
    // All editions are sold out
    return null;
  }

  const masterEditionListing = masterEditionNft?.NftListing;
  if (masterEditionListing == null) {
    return tx.priceInLamports;
  }

  const editionPriceInfo = getEditionPriceInfo(masterEditionListing);
  if (editionPriceInfo == null) {
    return tx.priceInLamports;
  }

  // This assumes that edition price info cannot change after an edition is sold
  return getPriceInLamportsForEdition(
    numSales + 1,
    editionPriceInfo.priceFunctionType,
    editionPriceInfo.priceParams!,
    editionPriceInfo.startingPriceInLamports!
  );
}

async function txToPrice(
  mint: string,
  tx: NftTransactionOnchain,
  txs: Array<NftTransactionOnchain>
): Promise<{
  action: "continue" | "return";
  price?: MaybeUndef<number>;
}> {
  switch (tx.type) {
    case NftTransactionTypeExpress_Enum.SoldEditionPrimary: {
      const price = await getPriceForEditions(mint, tx, txs);
      return { action: "return", price };
    }
    case NftTransactionTypeExpress_Enum.AuctionWon:
    case NftTransactionTypeExpress_Enum.Bid:
    case NftTransactionTypeExpress_Enum.ChangePriceForEditions:
    case NftTransactionTypeExpress_Enum.Listed:
    case NftTransactionTypeExpress_Enum.ListedEditions:
    case NftTransactionTypeExpress_Enum.ListedInstantSale:
    case NftTransactionTypeExpress_Enum.Sold: // TODO: I think it actually makes more sense to null out the price when an NFT is sold
    case NftTransactionTypeExpress_Enum.SoldAcceptedOffer:
    case NftTransactionTypeExpress_Enum.SoldInstantSale:
      return { action: "return", price: tx.priceInLamports ?? null };
    case NftTransactionTypeExpress_Enum.Minted:
    case NftTransactionTypeExpress_Enum.Offer:
    case NftTransactionTypeExpress_Enum.OfferCancelled:
    case NftTransactionTypeExpress_Enum.Refunded:
      return { action: "continue" };
    case NftTransactionTypeExpress_Enum.Burned:
    case NftTransactionTypeExpress_Enum.ClaimedPnft:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemFullRightsTransferBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemPrintingV2Bid:
    case NftTransactionTypeExpress_Enum.Imported:
    case NftTransactionTypeExpress_Enum.ListingCancelled:
    case NftTransactionTypeExpress_Enum.Transferred:
    case NftTransactionTypeExpress_Enum.SoldGenerativeMint:
    case NftTransactionTypeExpress_Enum.StoppedMintingForEditions:
      return { action: "return", price: null };
    default:
      return assertUnreachable(tx.type);
  }
}

export default async function findNftPriceFromTxs(
  mint: string,
  txs: Array<NftTransactionOnchain>
): Promise<Maybe<number>> {
  // eslint-disable-next-line no-restricted-syntax
  for (const tx of txs) {
    // eslint-disable-next-line no-await-in-loop
    const result = await txToPrice(mint, tx, txs);
    if (result.action === "return") {
      return result.price ?? null;
    }
  }

  return null;
}
