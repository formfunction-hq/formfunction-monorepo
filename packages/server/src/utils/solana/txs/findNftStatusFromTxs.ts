import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";

async function txToStatus(
  tx: NftTransactionOnchain,
  mint: string,
  txs: Array<NftTransactionOnchain>
): Promise<Maybe<NftStatusExpress_Enum>> {
  switch (tx.type) {
    case NftTransactionTypeExpress_Enum.Burned:
      return NftStatusExpress_Enum.Burned;
    case NftTransactionTypeExpress_Enum.AuctionWon:
    case NftTransactionTypeExpress_Enum.Bid:
      return NftStatusExpress_Enum.Auction;
    case NftTransactionTypeExpress_Enum.Listed:
      return NftStatusExpress_Enum.Listed;
    case NftTransactionTypeExpress_Enum.ListedEditions:
    case NftTransactionTypeExpress_Enum.ChangePriceForEditions:
      return NftStatusExpress_Enum.ListedEditions;
    case NftTransactionTypeExpress_Enum.ListedInstantSale:
      return NftStatusExpress_Enum.ListedInstantSale;
    case NftTransactionTypeExpress_Enum.Imported:
    case NftTransactionTypeExpress_Enum.ListingCancelled:
    case NftTransactionTypeExpress_Enum.Sold:
    case NftTransactionTypeExpress_Enum.SoldAcceptedOffer:
    case NftTransactionTypeExpress_Enum.SoldInstantSale:
    case NftTransactionTypeExpress_Enum.SoldGenerativeMint:
      return NftStatusExpress_Enum.Owned;
    case NftTransactionTypeExpress_Enum.Minted: {
      const resultingNft = await getPrisma().nft.findUnique({
        include: {
          AirdropMasterEdition: { take: 1 },
        },
        where: { id: mint },
      });

      const isAirdropMasterEdition =
        (resultingNft?.AirdropMasterEdition?.length ?? 0) > 0;
      return isAirdropMasterEdition
        ? NftStatusExpress_Enum.AirdropCompleted
        : NftStatusExpress_Enum.Owned;
    }

    case NftTransactionTypeExpress_Enum.Transferred: {
      const ownerStoppedMintingForEditions =
        txs.find(
          ({ type }) =>
            type === NftTransactionTypeExpress_Enum.StoppedMintingForEditions
        ) != null;
      if (ownerStoppedMintingForEditions) {
        return NftStatusExpress_Enum.OwnedStoppedMintingForEditions;
      }

      const hasSoldEdition =
        txs.find(
          (txInner) =>
            txInner.type ===
              NftTransactionTypeExpress_Enum.SoldEditionPrimary &&
            // We don't want to apply this logic when a standard edition is transferred.
            txInner.mint !== mint
        ) != null;
      if (hasSoldEdition) {
        // If the owner has sold at least one edition, and they have transferred the master edition,
        // then the editions must have sold out (since we check to see if the owner stopped minting editions above).
        return NftStatusExpress_Enum.SoldOutEditions;
      }

      return NftStatusExpress_Enum.Owned;
    }
    case NftTransactionTypeExpress_Enum.StoppedMintingForEditions: {
      const prisma = getPrisma();
      const [masterEditionNft, airdrop] = await Promise.all([
        prisma.nft.findUnique({
          include: {
            NftListing: true,
          },
          where: {
            mint,
          },
        }),
        prisma.airdrop.findFirst({
          where: {
            masterEditionMint: mint,
          },
        }),
      ]);

      if (airdrop != null) {
        return NftStatusExpress_Enum.AirdropCompleted;
      }
      if (masterEditionNft?.maxSupply == null) {
        return NftStatusExpress_Enum.OwnedStoppedMintingForEditions;
      }

      // Since soldOutEditionsWebhook automatically closes edition distributor token accounts
      // when they are sold out, we need to account for the case where the editions sold out.
      const numSales = txs.filter(
        (txInner) =>
          txInner.type === NftTransactionTypeExpress_Enum.SoldEditionPrimary
      ).length;

      return numSales === masterEditionNft?.maxSupply
        ? NftStatusExpress_Enum.SoldOutEditions
        : NftStatusExpress_Enum.OwnedStoppedMintingForEditions;
    }
    case NftTransactionTypeExpress_Enum.SoldEditionPrimary: {
      // This tx is included for both the master and standard editions,
      // which means we need some extra logic to determine the status.

      if (tx.mint === mint) {
        // tx.mint is the standard edition
        return NftStatusExpress_Enum.Owned;
      }

      const prisma = getPrisma();
      const masterEditionNft = await prisma.nft.findUnique({
        include: {
          NftListing: true,
        },
        where: {
          mint,
        },
      });

      if (masterEditionNft?.maxSupply == null) {
        return NftStatusExpress_Enum.ListedEditions;
      }

      const numSales = txs.filter(
        (txInner) =>
          txInner.type === NftTransactionTypeExpress_Enum.SoldEditionPrimary
      ).length;

      // Only need >= b/c of Metaplex bug, see here for more info:
      // https://twitter.com/pencilflip/status/1575322318414393344
      return numSales >= masterEditionNft.maxSupply
        ? NftStatusExpress_Enum.SoldOutEditions
        : NftStatusExpress_Enum.ListedEditions;
    }
    case NftTransactionTypeExpress_Enum.ClaimedPnft:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemFullRightsTransferBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemPrintingV2Bid:
    case NftTransactionTypeExpress_Enum.Offer:
    case NftTransactionTypeExpress_Enum.OfferCancelled:
    case NftTransactionTypeExpress_Enum.Refunded:
      return null;
    default:
      return assertUnreachable(tx.type);
  }
}

export default async function findNftStatusFromTxs(
  mint: string,
  txs: Array<NftTransactionOnchain>
) {
  // eslint-disable-next-line no-restricted-syntax
  for (const tx of txs) {
    // eslint-disable-next-line no-await-in-loop
    const status = await txToStatus(tx, mint, txs);
    if (status != null) {
      return status;
    }
  }

  return null;
}
