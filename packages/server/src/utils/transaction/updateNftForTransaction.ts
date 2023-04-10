import {
  CurrencyNameExpress_Enum,
  InsertNftTransactionInput,
  InsertUnlockableInput,
  NftExpress,
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import { Prisma } from "@prisma/client";
import {
  Maybe,
  MaybeUndef,
  Undef,
} from "formfn-shared/dist/types/UtilityTypes";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import { Dayjs } from "dayjs";
import shouldExtendAuction from "src/utils/dates/shouldExtendAuction";
import { Request } from "express";
import logEvent from "src/utils/analytics/logEvent";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import getNftAuctionDuration from "src/utils/auction/getNftAuctionDuration";
import getNftTimeExtensionDuration from "src/utils/auction/getNftTimeExtensionDuration";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import convertNft from "src/utils/convert/convertNft";
import invariant from "tiny-invariant";
import getUserConnectOrCreate from "src/utils/prisma/getUserConnectOrCreate";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import shouldClearPnftId from "formfn-shared/dist/utils/pnft/shouldClearPnftId";
import PrismaTransactionClient from "src/types/PrismaTransactionClient";

const VALIDATE_BID_BUFFER_DURATION = dayjs.duration({ minutes: 5 });

function getAuctionEndTime(
  req: MaybeUndef<Request>,
  oldNft: ConvertNftToMetadataAccountType,
  txTime: Dayjs,
  useTransactionBlockTime: boolean
): Undef<Date> {
  if (oldNft.status === NftStatusExpress_Enum.Listed) {
    // Start the auction
    return txTime.add(getNftAuctionDuration(oldNft)).toDate();
  }

  if (oldNft.status === NftStatusExpress_Enum.Auction) {
    const oldAuctionEndTime = dayjs(oldNft.NftListing?.auctionEndTime);
    if (
      shouldExtendAuction(
        oldAuctionEndTime,
        txTime,
        getNftTimeExtensionDuration(oldNft),
        useTransactionBlockTime,
        VALIDATE_BID_BUFFER_DURATION
      )
    ) {
      logEvent(AnalyticsEvent.ExtendingBid, req, {
        oldNft,
        txTime,
      });
      // Extend the auction
      return txTime.add(getNftTimeExtensionDuration(oldNft)).toDate();
    }
  }

  return undefined;
}

function getUnlockableCreateInputIfExists(
  userId: string,
  input: MaybeUndef<InsertUnlockableInput>,
  currencyName: MaybeUndef<CurrencyNameExpress_Enum>
): Undef<Prisma.UnlockableCreateWithoutNftListingInput> {
  if (input == null) {
    return undefined;
  }

  const { asset, unlockable } = input;

  return {
    Asset: {
      create: {
        contentType: asset.contentType,
        downloadUrl: asset.downloadUrl,
        path: asset.path,
        userId,
      },
    },
    Currency: {
      connect: { name: currencyName ?? CurrencyNameExpress_Enum.Solana },
    },
    activationPriceInLamports: unlockable.activationPriceInLamports,
    category: unlockable.category,
    description: unlockable.description,
    id: unlockable.id,
    name: unlockable.name,
  };
}

/**
 * Perform necessary updates to NFT for the given transaction.
 *
 * If an update is performed, the updated NFT must be returned by the
 * `updatedMetadataAccount` field
 */
export default async function updateNftForTransaction(
  prisma: PrismaTransactionClient,
  req: MaybeUndef<Request>,
  input: InsertNftTransactionInput,
  oldNft: Maybe<ConvertNftToMetadataAccountType>,
  txTime: Dayjs,
  useTransactionBlockTime: boolean,
  convertedNft?: NftExpress
): Promise<Maybe<ConvertNftToMetadataAccountType>> {
  switch (input.type) {
    case NftTransactionTypeExpress_Enum.Bid: {
      const auctionEndTime = getAuctionEndTime(
        req,
        oldNft!,
        txTime,
        useTransactionBlockTime
      );
      // We use raw SQL here to make use of Postgres' GREATEST function
      // to ensure that we only update the NftListing table with increasing values
      // of auctionEndTime and priceInLamports
      // See https://www.postgresql.org/docs/13/functions-conditional.html#FUNCTIONS-GREATEST-LEAST
      // and https://blog.mattclemente.com/2021/03/22/postgresql-greatest/
      const nftListingUpdateQuery = Prisma.sql`UPDATE "NftListing"
        SET "auctionEndTime" = GREATEST("auctionEndTime", ${auctionEndTime})::timestamptz,
        "priceInLamports" = GREATEST("priceInLamports", ${Number(
          input.price
        )})::bigint
        WHERE "nftId" = ${input.mint}`;

      await prisma.$executeRaw(nftListingUpdateQuery);

      // TODO: may need to figure out a more robust way to update `status`
      // now that the missing tx insertion script is using this code.
      // This likely won't be an issue for script runs but manual runs may
      // cause issues.
      return prisma.nft.update({
        data: {
          status: NftStatusExpress_Enum.Auction,
        },
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
        where: { mint: input.mint },
      });
    }
    case NftTransactionTypeExpress_Enum.Burned: {
      return prisma.nft.update({
        data: {
          status: NftStatusExpress_Enum.Burned,
        },
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
        where: { mint: input.mint },
      });
    }
    case NftTransactionTypeExpress_Enum.Listed: {
      const { currencyName, creatorId, updateNftInput } = input;
      const {
        scheduledAuctionTime,
        timeExtensionDurationInSeconds,
        auctionDurationInSeconds,
      } = updateNftInput ?? {};

      const auctionDurationInSecondsToUse =
        auctionDurationInSeconds == null ? undefined : auctionDurationInSeconds;
      const timeExtensionDurationInSecondsToUse =
        timeExtensionDurationInSeconds == null
          ? undefined
          : timeExtensionDurationInSeconds;

      const auctionEndTime =
        scheduledAuctionTime == null
          ? undefined
          : dayjs(scheduledAuctionTime)
              .add(dayjs.duration({ seconds: auctionDurationInSecondsToUse }))
              .toDate();

      const updatePnftIdForAuctionClause =
        updateNftInput?.pnftIdForAuction == null
          ? undefined
          : {
              connect: {
                id: updateNftInput.pnftIdForAuction,
              },
            };
      const updateNftListingCurrencyClause =
        currencyName == null
          ? undefined
          : {
              connect: {
                name: currencyName,
              },
            };

      return prisma.nft.update({
        data: {
          NftListing: {
            update: {
              Currency: updateNftListingCurrencyClause,
              Nft_NftToNftListing_pnftIdForAuction:
                updatePnftIdForAuctionClause,
              Unlockable: {
                create: getUnlockableCreateInputIfExists(
                  creatorId,
                  updateNftInput?.insertUnlockableInput,
                  currencyName
                ),
              },
              auctionDurationInSeconds: auctionDurationInSecondsToUse,
              auctionEndTime,
              priceInLamports: Number(input.price),
              scheduledAuctionTime,
              tickSizeConstantInLamports:
                updateNftInput?.tickSizeConstantInLamports,
              timeExtensionDurationInSeconds:
                timeExtensionDurationInSecondsToUse,
            },
          },
          status:
            updateNftInput?.scheduledAuctionTime == null
              ? NftStatusExpress_Enum.Listed
              : NftStatusExpress_Enum.ListingScheduled,
        },
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
        where: { mint: input.mint },
      });
    }
    case NftTransactionTypeExpress_Enum.ChangePriceForEditions: {
      // At least for now, this does not support updating allowlist info
      invariant(
        input.editionsInput != null,
        "editionsInput cannot be null for ChangePriceForEditions"
      );
      const { currencyName } = input;
      const updateNftListingCurrencyClause =
        currencyName == null
          ? undefined
          : {
              connect: {
                name: currencyName,
              },
            };

      const nftListingUpdateData: Prisma.NftListingUpdateWithoutNft_NftToNftListing_nftIdInput =
        {
          Currency: updateNftListingCurrencyClause,
          PriceFunctionType: {
            connect: { value: input.editionsInput.priceFunctionType },
          },
          editionPriceFunctionParams: input.editionsInput.priceParams,
          editionPriceFunctionStartingPriceInLamports:
            input.editionsInput.startingPriceInLamports,
          priceInLamports: Number(input.price),
        };

      return prisma.nft.update({
        data: {
          NftListing: { update: nftListingUpdateData },
          status: NftStatusExpress_Enum.ListedEditions,
        },
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
        where: { mint: input.mint },
      });
    }
    case NftTransactionTypeExpress_Enum.ListedEditions: {
      invariant(
        input.editionsInput != null,
        "editionsInput cannot be null for ListedEditions"
      );
      const { currencyName } = input;
      const updateNftListingCurrencyClause =
        currencyName == null
          ? undefined
          : {
              connect: {
                name: currencyName,
              },
            };

      const nftListingUpdateData: Prisma.NftListingUpdateWithoutNft_NftToNftListing_nftIdInput =
        {
          Currency: updateNftListingCurrencyClause,
          PriceFunctionType: {
            connect: { value: input.editionsInput.priceFunctionType },
          },
          antiBotProtectionEnabled:
            input.updateNftInput?.antiBotProtectionEnabled,
          editionAllowlistEnabled:
            input.editionsInput.allowlistEnabled ?? false,
          editionAllowlistPrice: input.editionsInput.allowlistPrice,
          editionAllowlistSaleStartTime: input.editionsInput.allowlistStartTime,
          editionBuyLimitPerAddress:
            input.updateNftInput?.editionBuyLimitPerAddress,
          editionPriceFunctionParams: input.editionsInput.priceParams,
          editionPriceFunctionStartingPriceInLamports:
            input.editionsInput.startingPriceInLamports,
          editionPublicSaleStartTime: input.editionsInput.publicSaleStartTime,
          priceInLamports: Number(input.price),
        };

      return prisma.nft.update({
        data: {
          NftListing: { update: nftListingUpdateData },
          status: NftStatusExpress_Enum.ListedEditions,
        },
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
        where: { mint: input.mint },
      });
    }
    case NftTransactionTypeExpress_Enum.ListedInstantSale: {
      const { currencyName } = input;
      const updateNftListingCurrencyClause =
        currencyName == null
          ? undefined
          : {
              connect: {
                name: currencyName,
              },
            };

      return prisma.nft.update({
        data: {
          NftListing: {
            update: {
              Currency: updateNftListingCurrencyClause,
              Unlockable: {
                create: getUnlockableCreateInputIfExists(
                  input.creatorId,
                  input.updateNftInput?.insertUnlockableInput,
                  currencyName
                ),
              },
              priceInLamports: Number(input.price),
            },
          },
          status: NftStatusExpress_Enum.ListedInstantSale,
        },
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
        where: { mint: input.mint },
      });
    }
    case NftTransactionTypeExpress_Enum.ListingCancelled: {
      // pNFTs and Unlockables are removed from NFTs if the NFT is unlisted
      // before the primary sale happens.
      const pnftIdForAuction = oldNft?.hasBeenSold
        ? oldNft?.NftListing?.pnftIdForAuction
        : null;
      const unlockableId = oldNft?.hasBeenSold
        ? oldNft?.NftListing?.unlockableId
        : null;

      const updatedNft = await prisma.nft.update({
        data: {
          NftListing: {
            update: {
              // May be non-null for scheduled auctions
              auctionEndTime: null,
              pnftIdForAuction,
              priceInLamports: null,
              scheduledAuctionTime: null,
              unlockableId,
            },
          },
          status: NftStatusExpress_Enum.Owned,
        },
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
        where: { mint: input.mint },
      });

      // If the listing included an Unlockable, it should get cleaned up along
      // with the Asset when the unlisting occurs (unless the NFT has been sold already).
      const unlockableAssetId = oldNft?.NftListing?.Unlockable?.assetId;
      if (oldNft?.hasBeenSold !== true && unlockableAssetId != null) {
        await prisma.asset.delete({
          where: {
            id: unlockableAssetId,
          },
        });
      }

      return updatedNft;
    }
    case NftTransactionTypeExpress_Enum.SoldAcceptedOffer:
    case NftTransactionTypeExpress_Enum.SoldInstantSale:
    case NftTransactionTypeExpress_Enum.Sold: {
      // Clear pNFT from auction NFT if seller accepted an offer
      // for the primary sale.
      const shouldClearPnft = shouldClearPnftId(
        oldNft!.hasBeenSold,
        input.type
      );

      const { currencyName } = input;
      const updateCurrencyClause = {
        connect: {
          name:
            input.type === NftTransactionTypeExpress_Enum.SoldAcceptedOffer
              ? currencyName!
              : oldNft!.NftListing!.Currency.name,
        },
      };

      const updateData: Prisma.NftUpdateInput = {
        NftListing: {
          update: {
            Currency: updateCurrencyClause,
            Nft_NftToNftListing_pnftIdForAuction: shouldClearPnft
              ? { disconnect: true }
              : undefined,

            auctionEndTime: null,
            // TODO: set this to null and then modify findNftPriceFromTxs
            priceInLamports: Number(input.price),
            scheduledAuctionTime: null,
            timeLastAuctionAlmostOverEmailSent: null,
          },
        },
        NftStatus: {
          connect: { value: NftStatusExpress_Enum.Owned },
        },
        // Needed when an NFT is purchased via Crossmint, in which case the
        // purchaser wallet may not already have a Formfunction account.
        Owner: getUserConnectOrCreate(input.toUserId),
        PriceLastSoldCurrency: updateCurrencyClause,
        auctionCount: {
          increment: 1,
        },
        hasBeenSold: true,
        priceLastSoldForInLamports: Number(input.price),
      };

      return prisma.nft.update({
        data: updateData,
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
        where: { mint: input.mint },
      });
    }
    case NftTransactionTypeExpress_Enum.Transferred: {
      if (convertedNft == null) {
        // eslint-disable-next-line no-param-reassign
        convertedNft = (await convertNft(oldNft!)).nft;
      }

      let { status } = convertedNft;
      switch (oldNft?.status) {
        case NftStatusExpress_Enum.OwnedStoppedMintingForEditions:
        case NftStatusExpress_Enum.SoldOutEditions:
          status = oldNft.status;
          break;
        default:
          break;
      }

      return prisma.nft.update({
        data: {
          NftListing: {
            update: {
              auctionEndTime: null,
              priceInLamports: null,
              scheduledAuctionTime: null,
            },
          },
          NftStatus: {
            connect: {
              value: status,
            },
          },
          Owner: getUserConnectOrCreate(input.toUserId),
        },
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
        where: { mint: input.mint },
      });
    }
    case NftTransactionTypeExpress_Enum.StoppedMintingForEditions: {
      return prisma.nft.update({
        data: {
          NftListing: {
            update: {
              priceInLamports: null,
            },
          },
          NftStatus: {
            connect: {
              value: NftStatusExpress_Enum.OwnedStoppedMintingForEditions,
            },
          },
        },
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
        where: { mint: input.mint },
      });
    }
    case NftTransactionTypeExpress_Enum.AuctionWon:
    case NftTransactionTypeExpress_Enum.ClaimedPnft:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemFullRightsTransferBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemPrintingV2Bid:
    case NftTransactionTypeExpress_Enum.Imported:
    case NftTransactionTypeExpress_Enum.Minted:
    case NftTransactionTypeExpress_Enum.Offer:
    case NftTransactionTypeExpress_Enum.OfferCancelled:
    case NftTransactionTypeExpress_Enum.Refunded:
    case NftTransactionTypeExpress_Enum.SoldEditionPrimary:
    case NftTransactionTypeExpress_Enum.SoldGenerativeMint:
      // No updates necessary
      return oldNft;
    default:
      return assertUnreachable(input.type);
  }
}
