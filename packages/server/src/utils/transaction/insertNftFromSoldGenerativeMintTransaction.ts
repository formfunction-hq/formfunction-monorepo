import { ParsedTransactionWithMeta } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getFirestoreConfigLineDocRef from "src/utils/firebase/firestore/getFirestoreConfigLineDoc";
import parseSoldGenerativeMintTx from "src/utils/solana/txs/parse/parseSoldGenerativeMintTx";
import invariant from "tiny-invariant";
import insertNft from "src/utils/nft/insertNft";
import FirestoreConfigLineDoc from "src/types/generative-mints/rarity/FirestoreConfigLineWithRarityInfoDoc";
import { NftStatusExpress_Enum } from "src/__generated__/generated";
import PrismaTransactionClient from "src/types/PrismaTransactionClient";
import { decodeCandyMachineTransaction } from "@formfunction-hq/formfunction-candy-machine";
import loadCandyMachineSdk from "src/utils/solana/loadCandyMachineSdk";

function getConfigLineIndex(parsedTx: ParsedTransactionWithMeta): number {
  const logMessages = parsedTx.meta?.logMessages;
  invariant(logMessages != null);
  const logLineWithIndex = logMessages.find((logLine) =>
    logLine.includes("Minting config line at index")
  );
  return Number(
    logLineWithIndex!.match(/Minting config line at index (\d+).*/)![1]
  );
}

/**
 * Inserts an NFT minted from a Candy Machine.
 *
 * Uses information that was pre-computed and stored in Firestore to make it faster.
 */
export default async function insertNftFromSoldGenerativeMintTransaction(
  prisma: PrismaTransactionClient,
  parsedTx: ParsedTransactionWithMeta
): Promise<Maybe<ConvertNftToMetadataAccountType>> {
  try {
    const configLineIndex = getConfigLineIndex(parsedTx);
    const decodedTransaction = decodeCandyMachineTransaction(
      loadCandyMachineSdk().candyMachineProgramId,
      parsedTx
    );
    const soldGenerativeMintTx = await parseSoldGenerativeMintTx(
      parsedTx,
      decodedTransaction
    );
    invariant(soldGenerativeMintTx != null);
    const { mint, creatorId: _, toAddress } = soldGenerativeMintTx.tx;
    const seriesMint =
      soldGenerativeMintTx.candyMachineInfo!.seriesInfo.mint.toString();
    const series = await prisma.series.findUnique({
      include: {
        CandyMachine: true,
      },
      where: { mint: seriesMint },
    });
    invariant(series != null);

    const configLineData = (
      await getFirestoreConfigLineDocRef(
        series.CandyMachine!.publicKey,
        configLineIndex
      ).get()
    ).data() as FirestoreConfigLineDoc;

    return insertNft(
      {
        ...configLineData,
        attributes: configLineData.attributes.map(
          (attribute: { trait_type: string; value: string }) => ({
            ...attribute,
            traitType: attribute.trait_type,
          })
        ),
        /**
         * NOTE: The candy machine creator authority is actually a Formfunction
         * managed authority wallet because of an issue when minting with setting
         * and verifying the collection (the update authority needs to sign) so
         * we cannot currently use the actual creator address as the candy machine
         * creator authority.
         *
         * But we need the creator here to be the actual NFT creator so the minted
         * NFTs show up in the UI correctly when they are minted, so we use the
         * series creator here.
         */
        creatorId: series.creatorId,
        mint,
        ownerId: toAddress,
        seriesMint,
        status: NftStatusExpress_Enum.Owned,
      },
      {
        auctionCount: 1,
        hasBeenSold: true,
        priceLastSoldCurrencyId: soldGenerativeMintTx.tx.price?.currencyInfo.id,
        priceLastSoldFor: soldGenerativeMintTx.tx.price?.amount,
        seriesRarityBasisPoints: configLineData.nftRarityPercentage * 100,
        seriesRarityRanking: configLineData.nftRarityRanking,
      }
    );
  } catch (e) {
    logError(
      AnalyticsEvent.InsertNftFromSoldGenerativeMintTransactionError,
      e as Error,
      null
    );
    return null;
  }
}
