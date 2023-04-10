import {
  ParsedTransactionWithMeta,
  PartiallyDecodedInstruction,
  PublicKey,
} from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import dayjs from "src/utils/dates/dayjsex";
import getNftCreatorFromMint from "src/utils/prisma/getNftCreatorFromMint";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import { EXCHANGE_ART_PROGRAM_ID } from "formfn-shared/dist/constants/SolanaConstants";
import parseTxWithTransfer from "src/utils/solana/txs/parse/parseTxWithTransfer";
import getTokenAccountOwner from "src/utils/solana/accounts/getTokenAccountOwner";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";

export type SolscanTransferTx = {
  _id: string;
  accountIns: Array<{
    commonType: string;
    data: {
      account: string;
      mint: string;
      owner: string;
      rentSysvar: string;
    };
    isInner: false;
    parseType: string;
    programId: string;
  }>;
  amount: number;
  amountUI: number;
  blockHumanTime: string;
  blockTime: number;
  commonType: "spl-transfer" | "mint";
  createdAt: string;
  decimals: number;
  destOwnerAccount: Maybe<string>;
  destTokenAccount: string;
  fee: number;
  isInner: boolean;
  parseType: "transferChecked" | "transfer" | "mintTo";
  programId: string;
  slot: number;
  sourceOwnerAccount: Maybe<string>;
  sourceTokenAccount: string;
  symbol: Maybe<string>;
  tokenAddress: string;
  txHash: string;
  updatedAt: string;
};

// Example: https://solscan.io/tx/3hy68NMfGgrPm766yxiuuhpt3w9w5w9D4v3NYhPUEkdaaZDYYrxjbt5qaNmbfABTGQA4wpjYhLb9WhsJcv35dxBb
function isExchangeArtCancelListingTx(tx: ParsedTransactionWithMeta) {
  const ix =
    // This specific tx should have exactly 1 top-level instruction
    tx.transaction.message.instructions.length === 1
      ? tx.transaction.message.instructions[0]
      : null;
  if (ix == null) {
    return false;
  }
  return (
    new PublicKey(ix.programId).equals(EXCHANGE_ART_PROGRAM_ID) &&
    (ix as PartiallyDecodedInstruction)?.data === "4"
  );
}

export default async function parseSolscanTransferTx(
  tx: SolscanTransferTx
): Promise<Maybe<NftTransactionOnchain>> {
  const {
    tokenAddress: tokenMint,
    sourceOwnerAccount: fromAddress,
    sourceTokenAccount: fromTokenAddress,
    destOwnerAccount: toAddress,
    destTokenAccount: toTokenAddress,
    txHash: txid,
    blockTime,
    parseType,
  } = tx;
  if (parseType !== "transfer" && parseType !== "transferChecked") {
    return null;
  }
  let fromOwner = fromAddress;
  let toOwner = toAddress;
  const parsedTx = await ConnectionWrapper.getParsedTransaction(
    txid,
    "confirmed"
  );
  if (fromOwner == null) {
    if (isExchangeArtCancelListingTx(parsedTx!)) {
      // Check first if the fromAddress is null due to Exchange Art's cancel listing logic
      fromOwner =
        parsedTx?.meta?.preTokenBalances?.find(
          (balance) => balance?.uiTokenAmount?.uiAmount === 1
        )?.owner ?? null;
    }
    if (fromOwner === null) {
      fromOwner = await getTokenAccountOwner(new PublicKey(fromTokenAddress));
    }
  }
  if (toOwner == null) {
    toOwner = await getTokenAccountOwner(new PublicKey(toTokenAddress));
  }

  if (fromOwner == null || toOwner == null) {
    logError(
      AnalyticsEvent.ParseSolscanTransferTxError,
      `Solscan transfer ${txid} had invalid from/toAddress`,
      null,
      {
        fromAddress,
        fromOwner,
        fromTokenAddress,
        toAddress,
        toOwner,
        toTokenAddress,
      }
    );
    return null;
  }

  const [creator, parsedTransferTx] = await Promise.all([
    getNftCreatorFromMint(new PublicKey(tokenMint)),
    parseTxWithTransfer(
      parsedTx!,
      new PublicKey(tokenMint),
      toTokenAddress,
      fromTokenAddress
    ),
  ]);

  return {
    creatorId: creator.creatorAddress ?? "",
    fromAddress: fromOwner.toString(),
    id: txid,
    ixIndex: parsedTransferTx?.ixIndex,
    ixInnerIndex: parsedTransferTx?.ixInnerIndex,
    mint: tokenMint.toString(),
    timeCreated: dayjs.unix(blockTime).toDate(),
    toAddress: toOwner.toString(),
    txid,
    type: NftTransactionTypeExpress_Enum.Transferred,
  };
}
