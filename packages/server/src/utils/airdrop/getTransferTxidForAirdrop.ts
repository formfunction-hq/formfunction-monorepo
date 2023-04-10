import { Request } from "express";
import { Airdrop, User } from "@prisma/client";
import { createTransferCheckedInstruction } from "@solana/spl-token";
import { PublicKey, ParsedTransactionWithMeta } from "@solana/web3.js";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import findAta from "formfn-shared/dist/utils/solana/pdas/findAta";
import findParsedNftTransaction from "formfn-shared/dist/utils/solana/txs/findParsedNftTransaction";
import getCreateAtaTxIfNotExists from "formfn-shared/dist/utils/solana/txs/getCreateAtaTxIfNotExists";
import toObject from "formfn-shared/dist/utils/toObject";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import getAllParsedTransactionsForAddress from "src/utils/solana/getAllParsedTransactionsForAddress";
import getConnection from "src/utils/solana/getConnection";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import parseTxWithTransfer from "src/utils/solana/txs/parse/parseTxWithTransfer";
import ixToTx from "formfn-shared/dist/utils/solana/ix/ixToTx";

async function getExistingTransferTx(
  standardEditionMint: PublicKey,
  sourceAccount: PublicKey,
  destinationAccount: PublicKey
) {
  const txs = await getAllParsedTransactionsForAddress(standardEditionMint);
  return findParsedNftTransaction(
    txs,
    (tx: ParsedTransactionWithMeta) =>
      parseTxWithTransfer(
        tx,
        standardEditionMint,
        destinationAccount,
        sourceAccount
      ),
    SortOrder.Asc
  );
}

export default async function getTransferTxidForAirdrop(
  req: Request,
  airdrop: Airdrop & { ToUser: User },
  standardEditionMint: PublicKey,
  shouldLog = true
): Promise<string> {
  const { ToUser } = airdrop;
  const authorityKeypair = getAuthorityKeypair();
  const connection = getConnection();
  const destinationWallet = new PublicKey(ToUser.id);
  const [[sourceAta], [destinationAta]] = await Promise.all([
    findAta(authorityKeypair.publicKey, standardEditionMint),
    findAta(destinationWallet, standardEditionMint),
  ]);
  const existingTransferTx = await getExistingTransferTx(
    standardEditionMint,
    sourceAta,
    destinationAta
  );
  if (existingTransferTx != null) {
    return existingTransferTx.txid!;
  }
  // If the destination ATA doesn't exist, we need to create it, otherwise
  // the transfer will fail.
  const createAtaTx = await getCreateAtaTxIfNotExists(
    connection,
    destinationAta,
    standardEditionMint,
    destinationWallet,
    authorityKeypair.publicKey
  );
  const transferIx = createTransferCheckedInstruction(
    sourceAta,
    standardEditionMint,
    destinationAta,
    authorityKeypair.publicKey,
    1,
    0,
    []
  );
  const transferTx =
    createAtaTx != null ? createAtaTx.add(transferIx) : ixToTx(transferIx);
  try {
    const transferTxid = await ConnectionWrapper.sendAndConfirmTransaction(
      transferTx,
      [authorityKeypair]
    );
    return transferTxid;
  } catch (e: any) {
    if (shouldLog) {
      logError(AnalyticsEvent.AirdropFail, e, req, {
        airdrop: toObject(airdrop),
        description:
          `Could not transfer standard edition ${standardEditionMint.toString()} to ` +
          `${destinationWallet.toString()} (ata: ${destinationAta.toString()}) for airdrop ${
            airdrop.id
          }`,
        destinationAta: destinationAta.toString(),
        destinationWallet: destinationWallet.toString(),
        standardEditionMint: standardEditionMint.toString(),
      });
    }
    throw e;
  }
}
