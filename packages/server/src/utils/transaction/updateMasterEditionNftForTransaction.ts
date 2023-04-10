import {
  InsertNftTransactionInput,
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import invariant from "tiny-invariant";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import getNftKind from "formfn-shared/dist/utils/nft/getNftKind";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import getEditionPriceInfo from "src/utils/prisma/getEditionPriceInfo";
import getPriceInLamportsForEdition from "src/utils/editions/getPriceInLamportsForEdition";
import PrismaTransactionClient from "src/types/PrismaTransactionClient";
import { Dayjs } from "dayjs";

/**
 * For certain transactions, we must update the master edition NFT
 * even though we are inserting a tx for the standard edition NFT.
 *
 * This updated master edition NFT will be returned via the
 * `updatedMasterEditionMetadataAccount` output field
 */
export default async function updateMasterEditionNftForTransaction(
  prisma: PrismaTransactionClient,
  input: InsertNftTransactionInput,
  oldNft: Maybe<ConvertNftToMetadataAccountType>,
  editionNumber: Maybe<number>,
  txTime: Dayjs
): Promise<Maybe<ConvertNftToMetadataAccountType>> {
  switch (input.type) {
    case NftTransactionTypeExpress_Enum.SoldEditionPrimary: {
      invariant(
        oldNft != null,
        "oldNft cannot be null for SoldEditionPrimary txs"
      );
      const nftKind = getNftKind(
        oldNft.isMasterEdition,
        oldNft.isPnft,
        oldNft.maxSupply,
        oldNft.MasterEditionNft?.maxSupply ?? null,
        oldNft.Series?.CandyMachine != null
      );
      const masterEditionNft = await prisma.nft.findUnique({
        include: {
          // oldNft.MasterEditionNft doesn't include this, easier to re-query since
          // it's not needed for most transactions
          NftListing: true,
        },
        where: {
          mint: oldNft.MasterEditionNft!.mint,
        },
      });
      invariant(masterEditionNft != null);
      if (
        [
          NftStatusExpress_Enum.AirdropCompleted,
          NftStatusExpress_Enum.AirdropInProgress,
        ].includes(masterEditionNft.status as NftStatusExpress_Enum)
      ) {
        return oldNft;
      }

      const nftListing = masterEditionNft.NftListing;
      invariant(nftListing != null);
      const editionPriceInfo = getEditionPriceInfo(nftListing);
      invariant(editionPriceInfo != null);

      const newPrice = getPriceInLamportsForEdition(
        editionNumber! + 1,
        editionPriceInfo.priceFunctionType,
        editionPriceInfo.priceParams!,
        editionPriceInfo.startingPriceInLamports!
      );

      // We use raw SQL here to make use of Postgres' GREATEST function
      // to ensure that we only update the NftListing and Nft table with increasing values
      // of priceInLamports and priceLastSoldForInLamports
      // See https://www.postgresql.org/docs/13/functions-conditional.html#FUNCTIONS-GREATEST-LEAST
      // and https://blog.mattclemente.com/2021/03/22/postgresql-greatest/
      const nftListingPriceUpdate = Prisma.sql`UPDATE "NftListing"
        SET "priceInLamports" = GREATEST("priceInLamports", ${Number(
          newPrice
        )})::bigint
        WHERE "nftId" = ${masterEditionNft.mint}`;
      const nftPriceUpdate = Prisma.sql`UPDATE "Nft"
        SET "priceLastSoldForInLamports" = GREATEST("priceLastSoldForInLamports", ${Number(
          input.price
        )})::bigint
        WHERE "mint" = ${masterEditionNft.mint}`;

      const updateData: Prisma.NftUpdateInput = {
        PriceLastSoldCurrency: {
          connect: {
            name: oldNft.NftListing!.Currency.name,
          },
        },
        timeLastEditionSoldPrimary: txTime.toDate(),
      };
      switch (nftKind) {
        case NftKind.StandardEditionPrintNonzeroSupply: {
          if (oldNft.edition! !== oldNft.MasterEditionNft!.maxSupply) {
            // Execute serially to avoid deadlocks
            await prisma.$executeRaw(nftListingPriceUpdate);
            await prisma.$executeRaw(nftPriceUpdate);
            return prisma.nft.update({
              data: updateData,
              include: CONVERT_NFT_TO_METADATA_INCLUDE,
              where: {
                mint: masterEditionNft.mint,
              },
            });
          }

          await prisma.$executeRaw(nftPriceUpdate);
          // If all editions have sold out, we should update the master edition's status
          return prisma.nft.update({
            data: {
              ...updateData,
              NftListing: {
                update: {
                  // If sold out, override this
                  priceInLamports: null,
                },
              },
              NftStatus: {
                connect: { value: NftStatusExpress_Enum.SoldOutEditions },
              },
            },
            include: CONVERT_NFT_TO_METADATA_INCLUDE,
            where: {
              mint: masterEditionNft.mint,
            },
          });
        }
        case NftKind.StandardEditionPrintUnlimitedSupply:
          // Execute serially to avoid deadlocks
          await prisma.$executeRaw(nftListingPriceUpdate);
          await prisma.$executeRaw(nftPriceUpdate);
          return prisma.nft.update({
            data: updateData,
            include: CONVERT_NFT_TO_METADATA_INCLUDE,
            where: {
              mint: masterEditionNft.mint,
            },
          });
        case NftKind.MasterEditionWithNonzeroSupply:
        case NftKind.MasterEditionWithUnlimitedSupply:
        case NftKind.PnftMasterEdition:
        case NftKind.Generative:
        case NftKind.OneOfOne:
        case NftKind.PnftStandardEdition:
          break;
        default:
          assertUnreachable(nftKind);
      }
      break;
    }
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
    case NftTransactionTypeExpress_Enum.Minted:
    case NftTransactionTypeExpress_Enum.Offer:
    case NftTransactionTypeExpress_Enum.OfferCancelled:
    case NftTransactionTypeExpress_Enum.Refunded:
    case NftTransactionTypeExpress_Enum.Sold:
    case NftTransactionTypeExpress_Enum.SoldAcceptedOffer:
    case NftTransactionTypeExpress_Enum.SoldInstantSale:
    case NftTransactionTypeExpress_Enum.SoldGenerativeMint: // TODO[Generative Mint](@bryancho): may need to do something here
    case NftTransactionTypeExpress_Enum.StoppedMintingForEditions:
    case NftTransactionTypeExpress_Enum.Transferred:
      return null;
    default:
      return assertUnreachable(input.type);
  }

  // Just to satisfy typescript, should be unreachable
  return null;
}
