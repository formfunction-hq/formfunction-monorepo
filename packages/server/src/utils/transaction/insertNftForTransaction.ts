import {
  InsertNftTransactionInput,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import createStandardEditionNft from "src/utils/prisma/createStandardEditionNft";
import insertNft from "src/utils/nft/insertNft";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import { ParsedTransactionWithMeta } from "@solana/web3.js";
import invariant from "tiny-invariant";
import parseSoldGenerativeMintTx from "src/utils/solana/txs/parse/parseSoldGenerativeMintTx";
import insertNftFromMintTransaction from "src/utils/transaction/insertNftFromMintTransaction";
import insertNftFromSoldGenerativeMintTransaction from "src/utils/transaction/insertNftFromSoldGenerativeMintTransaction";
import PrismaTransactionClient from "src/types/PrismaTransactionClient";
import { decodeCandyMachineTransaction } from "@formfunction-hq/formfunction-candy-machine";
import loadCandyMachineSdk from "src/utils/solana/loadCandyMachineSdk";

/**
 * If insertPnftInput/insertStandardEditionInput/insertNftInput is provided
 * insert the NFT rather than doing the NFT update below.
 * Do prior to maybeUpdateMasterEditionNftBasedOnTx so `oldNft` loads.
 * This can happen for PNFTs, editions, and when minting NFTs.
 */
export default async function insertNftForTransaction(
  prisma: PrismaTransactionClient,
  input: InsertNftTransactionInput,
  editionNumber: Maybe<number>,
  parsedTx: Maybe<ParsedTransactionWithMeta>
): Promise<Maybe<ConvertNftToMetadataAccountType>> {
  const { insertPnftInput, insertStandardEditionInput, insertNftInput, type } =
    input;
  if (type === NftTransactionTypeExpress_Enum.SoldGenerativeMint) {
    invariant(parsedTx != null);
    // First, try the more efficient approach
    const nft = await insertNftFromSoldGenerativeMintTransaction(
      prisma,
      parsedTx
    );
    if (nft != null) {
      return nft;
    }

    // Fallback to the less efficient approach
    const decodedTransaction = decodeCandyMachineTransaction(
      loadCandyMachineSdk().candyMachineProgramId,
      parsedTx
    );
    const soldGenerativeMintTx = await parseSoldGenerativeMintTx(
      parsedTx,
      decodedTransaction
    );
    invariant(soldGenerativeMintTx != null);
    const { tx, candyMachineInfo } = soldGenerativeMintTx;
    return insertNftFromMintTransaction(
      tx,
      candyMachineInfo!.seriesInfo.mint.toString(),
      prisma
    );
  }

  if (insertNftInput != null) {
    return insertNft(insertNftInput, undefined, prisma);
  }

  if (insertPnftInput != null) {
    const { nft: insertedPnft } = await createStandardEditionNft(
      {
        edition: insertPnftInput.edition,
        hasBeenSold: false,
        isPnft: true,
        masterEditionMint: insertPnftInput.pnftMasterEditionMint,
        ownerId: insertPnftInput.ownerId,
        standardEditionMint: insertPnftInput.pnftLimitedEditionMint, // hasBeenSold
      },
      prisma
    );
    return insertedPnft;
  }

  if (insertStandardEditionInput != null) {
    // TODO: root cause issue that makes this code necessary.
    const nft = await prisma.nft.findUnique({
      include: CONVERT_NFT_TO_METADATA_INCLUDE,
      where: {
        mint: insertStandardEditionInput.standardEditionMint,
      },
    });
    if (nft != null) {
      return nft;
    }

    const { nft: insertedEdition } = await createStandardEditionNft(
      {
        edition: editionNumber!,
        hasBeenSold: true,
        isPnft: false,
        masterEditionMint: insertStandardEditionInput.masterEditionMint,
        ownerId: insertStandardEditionInput.ownerId,
        priceLastSoldForCurrencyName: input.currencyName,
        priceLastSoldForInLamports: input.price,
        standardEditionMint: insertStandardEditionInput.standardEditionMint,
      },
      prisma
    );
    return insertedEdition;
  }

  return null;
}
