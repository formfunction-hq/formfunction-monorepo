import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

function txToPriceLastSold(tx: NftTransactionOnchain): {
  action: "continue" | "return";
  price?: MaybeUndef<number>;
} {
  switch (tx.type) {
    case NftTransactionTypeExpress_Enum.Sold:
    case NftTransactionTypeExpress_Enum.SoldAcceptedOffer:
    case NftTransactionTypeExpress_Enum.SoldInstantSale:
      return { action: "return", price: tx.priceInLamports ?? null };
    case NftTransactionTypeExpress_Enum.AuctionWon:
    case NftTransactionTypeExpress_Enum.Bid:
    case NftTransactionTypeExpress_Enum.Burned:
    case NftTransactionTypeExpress_Enum.ClaimedPnft:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemFullRightsTransferBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemPrintingV2Bid:
    case NftTransactionTypeExpress_Enum.Imported:
    case NftTransactionTypeExpress_Enum.Listed:
    case NftTransactionTypeExpress_Enum.ListedInstantSale:
    case NftTransactionTypeExpress_Enum.ListingCancelled:
    case NftTransactionTypeExpress_Enum.Minted:
    case NftTransactionTypeExpress_Enum.Offer:
    case NftTransactionTypeExpress_Enum.OfferCancelled:
    case NftTransactionTypeExpress_Enum.Refunded:
    case NftTransactionTypeExpress_Enum.Transferred:
    case NftTransactionTypeExpress_Enum.ListedEditions: // TODO[@][editions] implement
    case NftTransactionTypeExpress_Enum.ChangePriceForEditions: // TODO[@][editions] implement
    case NftTransactionTypeExpress_Enum.SoldEditionPrimary: // TODO[@][editions] implement
    case NftTransactionTypeExpress_Enum.StoppedMintingForEditions: // TODO[@][editions] implement
    case NftTransactionTypeExpress_Enum.SoldGenerativeMint: // TODO[Generative Mints](@bryancho): address later
      return { action: "continue" };
    default:
      return assertUnreachable(tx.type);
  }
}

/**
 * TODO[editions]: need to make this more robust and handle different price function types
 *
 * TODO: use this in sync script?
 */
export default function findNftPriceLastSoldFromTxs(
  txs: Array<NftTransactionOnchain>
): Maybe<number> {
  // eslint-disable-next-line no-restricted-syntax
  for (const tx of txs) {
    const result = txToPriceLastSold(tx);
    if (result.action === "return") {
      return result.price ?? null;
    }
  }

  return null;
}
