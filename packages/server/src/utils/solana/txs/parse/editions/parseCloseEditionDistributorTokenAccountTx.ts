import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import getNftCreatorFromMint from "src/utils/prisma/getNftCreatorFromMint";
import dayjs from "src/utils/dates/dayjsex";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import { DecodedAuctionHouseTransactionResult } from "@formfunction-hq/formfunction-auction-house";

export default async function parseCloseEditionDistributorTokenAccountTx(
  tx: ParsedTransactionWithMeta,
  decodedTransaction: Maybe<DecodedAuctionHouseTransactionResult>,
  tokenMint?: PublicKey,
  shouldIgnoreAuthoritySignedTxs = true
): Promise<Maybe<{ tx: NftTransactionOnchain }> | "ignore"> {
  if (
    decodedTransaction == null ||
    decodedTransaction.closeEditionDistributorTokenAccount == null
  ) {
    return null;
  }
  const { accountsMap } =
    decodedTransaction.closeEditionDistributorTokenAccount;
  const { authority, owner, masterEditionMint } = accountsMap;

  const isAuthoritySigner =
    authority.isSigner &&
    arePublicKeysEqual(authority.pubkey, getAuctionHouseConstants().authority);

  if (isAuthoritySigner && shouldIgnoreAuthoritySignedTxs) {
    // We close the edition distributor token account with our authority if editions sell out.
    // Since we only use NftTransactionTypeExpress_Enum.StoppedMintingForEditions to represent when
    // the seller stops minting, we should ignore this transaction.
    //
    // Note that we don't want to just return null, otherwise the transaction will be picked up as a transfer
    // and displayed in our UI.
    return "ignore";
  }

  if (tokenMint != null && !tokenMint.equals(masterEditionMint.pubkey)) {
    return null;
  }

  const creatorAndAddress = await getNftCreatorFromMint(
    masterEditionMint.pubkey
  );

  const txid = tx.transaction.signatures[0];
  return {
    tx: {
      creatorId: creatorAndAddress.creatorAddress ?? owner.pubkey.toString(),
      fromAddress: owner.pubkey.toString(),
      id: txid,
      mint: masterEditionMint.pubkey.toString(),
      timeCreated: dayjs.unix(tx.blockTime!).toDate(),
      toAddress: owner.pubkey.toString(),
      txid,
      type: NftTransactionTypeExpress_Enum.StoppedMintingForEditions,
    },
  };
}
