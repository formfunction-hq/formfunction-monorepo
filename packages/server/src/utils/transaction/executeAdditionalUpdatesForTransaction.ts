import {
  InsertNftTransactionInput,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import invariant from "tiny-invariant";
import { OFFER_EXPIRATION_TIME_DEFAULT_DURATION } from "formfn-shared/dist/constants/OfferConstants";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import PrismaTransactionClient from "src/types/PrismaTransactionClient";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import createOwnerGenerativeMintSoldOutNotification from "src/utils/notifications/create/createOwnerGenerativeMintSoldOutNotification";
import isPublicKey from "formfn-shared/dist/utils/solana/isPublicKey";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import createEditionsMerkleAllowlistInfoEntries from "src/utils/editions/createEditionsMerkleAllowlistInfoEntries";
import { PublicKey } from "@solana/web3.js";
import { constructMerkleEditionAllowlist } from "@formfunction-hq/formfunction-auction-house";

export default async function executeAdditionalUpdatesForTransaction(
  prisma: PrismaTransactionClient,
  input: InsertNftTransactionInput,
  nftTransactionId: string,
  txTime: dayjs.Dayjs,
  oldNft: Maybe<ConvertNftToMetadataAccountType>
): Promise<void> {
  switch (input.type) {
    case NftTransactionTypeExpress_Enum.SoldAcceptedOffer: {
      invariant(
        input.offerTransactionId != null,
        "offerTransactionId cannot be null for sold accepted offer txs"
      );

      await prisma.offer.update({
        data: { saleTransactionId: nftTransactionId },
        where: { nftTransactionId: input.offerTransactionId },
      });
      break;
    }
    case NftTransactionTypeExpress_Enum.Offer: {
      const data = {
        expirationDate: txTime
          .add(OFFER_EXPIRATION_TIME_DEFAULT_DURATION)
          .toDate(),
        mint: input.mint,
        nftTransactionId,
        userId: input.fromUserId,
      };
      await prisma.offer.upsert({
        create: data,
        update: data,
        where: { nftTransactionId },
      });
      break;
    }
    case NftTransactionTypeExpress_Enum.ClaimedPnft:
      invariant(
        input.updateClaimInput != null,
        "updateClaimInput cannot be null for ClaimedPnft txs"
      );
      await prisma.claim.update({
        data: {
          claimTransactionId: nftTransactionId,
        },
        where: {
          id: input.updateClaimInput.claimId,
        },
      });
      break;
    case NftTransactionTypeExpress_Enum.ListedEditions: {
      invariant(
        input.editionsInput != null,
        "editionsInput cannot be null for ListedEditions"
      );

      const { allowlistAddresses, allowlistAmountAllowed } =
        input.editionsInput;
      if (allowlistAddresses == null || allowlistAddresses.length === 0) {
        break;
      }

      const containsInvalidPubkey = allowlistAddresses.some(
        (address) => !isPublicKey(address)
      );
      invariant(!containsInvalidPubkey, "Invalid pubkey in allowlistAddresses");
      const dedupedAllowlistAddresses =
        removeDuplicatesWithSet(allowlistAddresses);

      const merkleAllowlist = constructMerkleEditionAllowlist(
        new PublicKey(input.mint),
        dedupedAllowlistAddresses.map((address) => ({
          address: new PublicKey(address),
          amount: allowlistAmountAllowed ?? 1,
        }))
      );

      await createEditionsMerkleAllowlistInfoEntries(prisma, {
        addresses: dedupedAllowlistAddresses,
        merkleAllowlist,
        mint: input.mint,
      });

      break;
    }
    case NftTransactionTypeExpress_Enum.SoldGenerativeMint: {
      invariant(oldNft != null);
      const [numSold, candyMachine] = await Promise.all([
        prisma.nft.count({ where: { Series: { id: oldNft.seriesId! } } }),
        prisma.candyMachine.findUnique({
          select: { creatorAuthorityId: true, id: true, maxSupply: true },
          where: { seriesId: oldNft.seriesId! },
        }),
      ]);
      invariant(candyMachine != null);
      if (numSold === candyMachine.maxSupply) {
        await createOwnerGenerativeMintSoldOutNotification(
          {
            candyMachineId: candyMachine.id,
          },
          candyMachine.creatorAuthorityId
        );
      }
      break;
    }
    case NftTransactionTypeExpress_Enum.AuctionWon:
    case NftTransactionTypeExpress_Enum.Bid:
    case NftTransactionTypeExpress_Enum.Burned:
    case NftTransactionTypeExpress_Enum.ChangePriceForEditions:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemFullRightsTransferBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemPrintingV2Bid:
    case NftTransactionTypeExpress_Enum.Imported:
    case NftTransactionTypeExpress_Enum.Listed:
    case NftTransactionTypeExpress_Enum.ListedInstantSale:
    case NftTransactionTypeExpress_Enum.ListingCancelled:
    case NftTransactionTypeExpress_Enum.Minted:
    case NftTransactionTypeExpress_Enum.OfferCancelled:
    case NftTransactionTypeExpress_Enum.Refunded:
    case NftTransactionTypeExpress_Enum.Sold:
    case NftTransactionTypeExpress_Enum.SoldEditionPrimary:
    case NftTransactionTypeExpress_Enum.SoldInstantSale:
    case NftTransactionTypeExpress_Enum.StoppedMintingForEditions:
    case NftTransactionTypeExpress_Enum.Transferred:
      break;
    default:
      assertUnreachable(input.type);
  }
}
