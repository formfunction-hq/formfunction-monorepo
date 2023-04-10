import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  ParsedTransactionWithMeta,
  ParsedInstruction,
  PartiallyDecodedInstruction,
  PublicKey,
} from "@solana/web3.js";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import logError from "src/utils/analytics/logError";
import dayjs from "src/utils/dates/dayjsex";
import getNftCreatorFromMint from "src/utils/prisma/getNftCreatorFromMint";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import getTokenAccountOwner from "src/utils/solana/accounts/getTokenAccountOwner";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import getTokenAccountMint from "src/utils/solana/accounts/getTokenAccountMint";
import findIxWithIndicesAsync from "src/utils/solana/txs/parse/findIxWithIndicesAsync";

const TRANSFER_TYPES = ["transfer", "transferChecked"];

async function isTransferIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction,
  mint: PublicKeyOrString,
  destTokenAccount?: PublicKeyOrString,
  sourceTokenAccount?: PublicKeyOrString
): Promise<boolean> {
  const isTransfer =
    ix.programId.equals(TOKEN_PROGRAM_ID) &&
    "parsed" in ix &&
    TRANSFER_TYPES.includes(ix.parsed.type);
  if (!isTransfer) {
    return false;
  }

  const destination = ix.parsed.info?.destination?.toString();
  const source = ix.parsed.info?.source?.toString();

  if (destination == null || source == null) {
    return true;
  }

  if (destTokenAccount != null && sourceTokenAccount != null) {
    return (
      arePublicKeysEqual(destTokenAccount.toString(), destination) &&
      arePublicKeysEqual(sourceTokenAccount.toString(), source)
    );
  }

  // Dest and source token accounts must be for same mint, so only need to check one
  const tokenAccountMint = await getTokenAccountMint(
    new PublicKey(destination)
  );

  return (
    tokenAccountMint != null &&
    arePublicKeysEqual(tokenAccountMint, mint.toString())
  );
}

async function getFromAndTo(
  tx: ParsedTransactionWithMeta,
  ix: ParsedInstruction,
  tokenMint: PublicKey
): Promise<{ fromAddress: MaybeUndef<string>; toAddress: MaybeUndef<string> }> {
  const postTokenBalances = tx.meta!.postTokenBalances!;
  const preTokenBalances = tx.meta!.preTokenBalances!;

  // @ts-ignore
  const fromAddress = preTokenBalances.find(
    (balance) =>
      balance.uiTokenAmount.uiAmount != null &&
      balance.uiTokenAmount.uiAmount > 0 &&
      balance.mint === tokenMint.toString()
    // @ts-ignore
  )?.owner;
  // @ts-ignore
  const toAddress = postTokenBalances.find(
    (balance) =>
      balance.uiTokenAmount.uiAmount != null &&
      balance.uiTokenAmount.uiAmount > 0 &&
      balance.mint === tokenMint.toString()
    // @ts-ignore
  )?.owner;

  if (fromAddress != null && toAddress != null) {
    return { fromAddress, toAddress };
  }

  const fromTokenAccount = ix.parsed?.info?.source?.toString();
  const toTokenAccount = ix.parsed?.info?.destination?.toString();

  const fromAddress2 =
    fromTokenAccount == null
      ? null
      : await getTokenAccountOwner(new PublicKey(fromTokenAccount));

  const toAddress2 =
    toTokenAccount == null
      ? null
      : await getTokenAccountOwner(new PublicKey(toTokenAccount));

  return {
    fromAddress: fromAddress ?? fromAddress2,
    toAddress: toAddress ?? toAddress2,
  };
}

export default async function parseTxWithTransfer(
  tx: ParsedTransactionWithMeta,
  tokenMint: PublicKey,
  destTokenAccount?: PublicKeyOrString,
  sourceTokenAccount?: PublicKeyOrString
): Promise<Maybe<NftTransactionOnchain>> {
  const ixWithIndices = await findIxWithIndicesAsync(tx, (ix) =>
    isTransferIx(ix, tokenMint, destTokenAccount, sourceTokenAccount)
  );
  if (ixWithIndices == null) {
    return null;
  }
  const { ix: transferIx, ixIndex, ixInnerIndex } = ixWithIndices;

  const { fromAddress, toAddress } = await getFromAndTo(
    tx,
    transferIx as ParsedInstruction,
    tokenMint
  );

  if (fromAddress == null || toAddress == null) {
    logError(
      AnalyticsEvent.ParseTxError,
      "Found null fromAddress or toAddress for transfer",
      null,
      {
        fromAddress,
        toAddress,
        tokenMint,
        tx,
      }
    );
    return null;
  }

  const creator = await getNftCreatorFromMint(tokenMint);

  return {
    creatorId: creator.creatorAddress ?? "",
    fromAddress: fromAddress.toString(),
    id: tx.transaction.signatures[0],
    ixIndex,
    ixInnerIndex,
    mint: tokenMint.toString(),
    timeCreated: dayjs.unix(tx.blockTime!).toDate(),
    toAddress: toAddress.toString(),
    txid: tx.transaction.signatures[0],
    type: NftTransactionTypeExpress_Enum.Transferred,
  };
}
