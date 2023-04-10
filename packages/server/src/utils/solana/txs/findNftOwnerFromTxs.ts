import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

function txToOwner(tx: NftTransactionOnchain): Maybe<string> {
  switch (tx.type) {
    case NftTransactionTypeExpress_Enum.Minted:
      return tx.fromAddress;
    case NftTransactionTypeExpress_Enum.Sold:
    case NftTransactionTypeExpress_Enum.SoldAcceptedOffer:
    case NftTransactionTypeExpress_Enum.SoldEditionPrimary:
    case NftTransactionTypeExpress_Enum.SoldInstantSale:
    case NftTransactionTypeExpress_Enum.SoldGenerativeMint:
    case NftTransactionTypeExpress_Enum.StoppedMintingForEditions:
    case NftTransactionTypeExpress_Enum.Transferred:
      return tx.toAddress;
    case NftTransactionTypeExpress_Enum.AuctionWon:
    case NftTransactionTypeExpress_Enum.Bid:
    case NftTransactionTypeExpress_Enum.Burned:
    case NftTransactionTypeExpress_Enum.ChangePriceForEditions:
    case NftTransactionTypeExpress_Enum.ClaimedPnft:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemFullRightsTransferBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemPrintingV2Bid:
    case NftTransactionTypeExpress_Enum.Imported:
    case NftTransactionTypeExpress_Enum.Listed:
    case NftTransactionTypeExpress_Enum.ListedEditions:
    case NftTransactionTypeExpress_Enum.ListedInstantSale:
    case NftTransactionTypeExpress_Enum.ListingCancelled:
    case NftTransactionTypeExpress_Enum.Offer:
    case NftTransactionTypeExpress_Enum.OfferCancelled:
    case NftTransactionTypeExpress_Enum.Refunded:
      return null;
    default:
      return assertUnreachable(tx.type);
  }
}

export default function findNftOwnerFromTxs(
  txs: Array<NftTransactionOnchain>
): Maybe<string> {
  // eslint-disable-next-line no-restricted-syntax
  for (const tx of txs) {
    const owner = txToOwner(tx);
    if (owner != null) {
      return owner;
    }
  }

  return null;
}
