import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import dayjs from "src/utils/dates/dayjsex";
import getNftCreatorFromMint from "src/utils/prisma/getNftCreatorFromMint";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import { DecodedAuctionHouseTransactionResult } from "@formfunction-hq/formfunction-auction-house";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";

export default async function parseCancelTx(
  tx: ParsedTransactionWithMeta,
  decodedTransaction: Maybe<DecodedAuctionHouseTransactionResult>,
  tokenMint?: PublicKey
): Promise<Maybe<{ tx: NftTransactionOnchain }>> {
  if (decodedTransaction == null) {
    return null;
  }

  const decodedInstruction: typeof decodedTransaction.cancelV2 =
    // @ts-ignore check for legacy cancel instruction.
    decodedTransaction?.cancel ?? decodedTransaction.cancelV2;

  if (decodedInstruction == null) {
    return null;
  }

  const { accountsMap } = decodedInstruction;
  const { authority, wallet: lister, tokenMint: tokenMintForIx } = accountsMap;

  const isAuthoritySigner =
    authority.isSigner &&
    arePublicKeysEqual(authority.pubkey, getAuctionHouseConstants().authority);

  if (isAuthoritySigner) {
    // TODO: we assume that cancellations made by the authority should
    // be ignored. Currently, the authority cancels trade states for the following cases:
    //   * Cancelling old bids
    //   * Auto-cancelling expired offers
    //
    // Ideally, we would parse cancelled bids and cancelled listings differently.
    // See https://app.asana.com/0/1201632739634044/1202144228671056/f for task
    return null;
  }

  if (tx.transaction.message.instructions.length > 1) {
    // Ignore when cancel is paired with another tx
    return null;
  }

  if (tokenMint != null && !tokenMint.equals(tokenMintForIx.pubkey)) {
    return null;
  }

  const creator = await getNftCreatorFromMint(tokenMintForIx.pubkey);

  const txid = tx.transaction.signatures[0];
  return {
    tx: {
      creatorId: creator.creatorAddress ?? "",
      fromAddress: lister.pubkey.toString(),
      id: txid,
      mint: tokenMintForIx.pubkey.toString(),
      timeCreated: dayjs.unix(tx.blockTime!).toDate(),
      toAddress: lister.pubkey.toString(),
      txid,
      // TODO: make this function more robust (bids can also be cancelled)
      type: NftTransactionTypeExpress_Enum.ListingCancelled,
    },
  };
}
