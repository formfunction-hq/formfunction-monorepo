import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import parseBurnTx from "src/utils/solana/txs/parse/parseBurnTx";
import parseCreateMintTx from "src/utils/solana/txs/parse/parseCreateMintTx";
import parseTxWithTransfer from "src/utils/solana/txs/parse/parseTxWithTransfer";
import parseCreateEditionDistributorTx from "src/utils/solana/txs/parse/editions/parseCreateEditionDistributorTx";
import parseUpdateEditionDistributorTx from "src/utils/solana/txs/parse/editions/parseUpdateEditionDistributorTx";
import parseBuyEditionTx from "src/utils/solana/txs/parse/editions/parseBuyEditionTx";
import parseSellTx from "src/utils/solana/txs/parse/parseSellTx";
import parseCloseEditionDistributorTokenAccountTx from "src/utils/solana/txs/parse/editions/parseCloseEditionDistributorTokenAccountTx";
import parseCancelTx from "src/utils/solana/txs/parse/parseCancelTx";
import parseExecuteSaleTx from "src/utils/solana/txs/parse/parseExecuteSaleTx";
import parseClaimedPnftTx from "src/utils/solana/txs/parse/gumdrop/parseClaimedPnftTx";
import parseSoldGenerativeMintTx from "src/utils/solana/txs/parse/parseSoldGenerativeMintTx";
import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";
import { decodeGumdropTransaction } from "@formfunction-hq/formfunction-gumdrop";
import getGumdropInfo from "src/utils/solana/getGumdropInfo";
import { decodeCandyMachineTransaction } from "@formfunction-hq/formfunction-candy-machine";
import loadCandyMachineSdk from "src/utils/solana/loadCandyMachineSdk";
import parseBuyTx from "src/utils/solana/txs/parse/parseBuyTx";

export default async function parseNftTx(
  tx: Maybe<ParsedTransactionWithMeta>,
  tokenMint?: PublicKey
): Promise<Maybe<NftTransactionOnchain>> {
  if (tx == null || tx.meta?.err != null) {
    return null;
  }

  const decodedGumdropTransaction = decodeGumdropTransaction(
    getGumdropInfo().gumdropProgramId,
    tx
  );

  // Should be parsed prior to `Minted` since claiming a pnft also mints the pnft
  // in the same transaction
  const claimedPnft = await parseClaimedPnftTx(tx, decodedGumdropTransaction);
  if (claimedPnft != null) {
    return claimedPnft.tx;
  }

  const { programId } = getAuctionHouseConstants();
  const decodedAuctionHouseTransaction = decodeAuctionHouseTransaction(
    programId,
    tx
  );

  const listedEditions = await parseCreateEditionDistributorTx(
    tx,
    decodedAuctionHouseTransaction
  );
  if (listedEditions != null) {
    return listedEditions.tx;
  }

  const updateEditionDistributor = await parseUpdateEditionDistributorTx(
    tx,
    decodedAuctionHouseTransaction
  );
  if (updateEditionDistributor != null) {
    return updateEditionDistributor.tx;
  }

  const buyEdition = await parseBuyEditionTx(
    tx,
    decodedAuctionHouseTransaction
  );
  if (buyEdition != null) {
    return buyEdition.tx;
  }

  const createMint = await parseCreateMintTx(tx, tokenMint);
  if (createMint != null) {
    return createMint;
  }

  const sell = await parseSellTx(tx, decodedAuctionHouseTransaction);
  if (sell != null) {
    return sell.tx;
  }

  const closeEditionDistributor =
    await parseCloseEditionDistributorTokenAccountTx(
      tx,
      decodedAuctionHouseTransaction
    );
  if (closeEditionDistributor != null) {
    return closeEditionDistributor === "ignore"
      ? null
      : closeEditionDistributor.tx;
  }

  const cancel = await parseCancelTx(tx, decodedAuctionHouseTransaction);
  if (cancel != null) {
    return cancel.tx;
  }

  // Should be ordered before parseBuyTx, because when someone buys an NFT during an instant sale,
  // the "buy" ix and the "execute sale" ix are in the same tx, but we want to parse the tx
  // as an "execute sale". E.g. fKJ2bDZYbD77GSJtzKeLjSkjzbZCvph8FeQdNbVAa4mFBkN8DN1e9vQmENC17fbxpMm1Ep8bN6TuSpKwWKs7kwx
  const executeSale = await parseExecuteSaleTx(
    tx,
    decodedAuctionHouseTransaction
  );
  if (executeSale != null) {
    return executeSale.tx;
  }

  const decodedCandyMachineTransaction = decodeCandyMachineTransaction(
    loadCandyMachineSdk().candyMachineProgramId,
    tx
  );

  const soldGenerativeMint = await parseSoldGenerativeMintTx(
    tx,
    decodedCandyMachineTransaction
  );
  if (soldGenerativeMint != null) {
    return soldGenerativeMint.tx;
  }

  const buy = await parseBuyTx(tx, decodedAuctionHouseTransaction);
  if (buy != null) {
    return buy.tx;
  }

  const burn = await parseBurnTx(tx, tokenMint);
  if (burn != null) {
    return burn;
  }

  return tokenMint != null ? parseTxWithTransfer(tx, tokenMint) : null;
}
