/* eslint-disable no-plusplus */
import {
  ParsedInstruction,
  ParsedTransactionWithMeta,
  PartiallyDecodedInstruction,
  PublicKey,
} from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import {
  NftTransactionSourceExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import base58ToHex from "src/utils/base58ToHex";
import { METAPLEX_PROGRAM_ID } from "formfn-shared/dist/constants/SolanaConstants";
import isInitializeAccountIx from "src/utils/solana/txs/parse/ix/isInitializeAccountIx";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";

const AUCTION_ADDRESS_INDEX = 7;
const REDEEMER_INDEX = 9;

function isRedeemIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction
): boolean {
  // @ts-ignore
  const data = ix.data ?? "";
  return (
    arePublicKeysEqual(ix.programId, METAPLEX_PROGRAM_ID) &&
    // First byte of ix data is the ix discriminator
    base58ToHex(data).startsWith("03")
  );
}

/**
 * See https://github.com/metaplex-foundation/metaplex-program-library/blob/master/metaplex/program/src/instruction.rs#L207
 * for info about the RedeemFullRightsTransferBid ix.
 *
 * Example tx (for https://shadylady.holaplex.com/listings/DjmGk72JRBJMFx6c6yyp4VR1oYKppQqa5rZRkdSRiwpB)
 *
 * - 61uNweAcrQKwm5Jm2GC2cdkR87pCavEQvNaVQXmJ4woH9nuE3EELbA9MpAdwt3ciuWmUrhM5DRLxNurQ8JCMaJxn
 */
export default function parseHolaplexRedeemFullRightsTx(
  tx: ParsedTransactionWithMeta,
  // Cannot (easily) get this info from tx
  creatorId: PublicKeyOrString
): Maybe<[NftTransactionOnchain, { auctionAddress: PublicKey }]> {
  const { instructions } = tx.transaction.message;
  const redeemIx = instructions.find((ix) =>
    isRedeemIx(ix)
  ) as Maybe<PartiallyDecodedInstruction>;
  const initializeAccountIx = instructions.find((ix) =>
    isInitializeAccountIx(ix as ParsedInstruction)
  ) as Maybe<ParsedInstruction>;

  if (redeemIx == null || initializeAccountIx == null) {
    return null;
  }

  const txid = tx.transaction.signatures[0];
  const redeemer = redeemIx.accounts[REDEEMER_INDEX].toString();

  const txToReturn = {
    creatorId: creatorId.toString(),
    fromAddress: redeemer,
    id: txid,
    mint: initializeAccountIx.parsed.info.mint.toString(),
    source: NftTransactionSourceExpress_Enum.Holaplex,
    timeCreated: dayjs.unix(tx.blockTime!).toDate(),
    toAddress: redeemer,
    txid,
    type: NftTransactionTypeExpress_Enum.HolaplexRedeemFullRightsTransferBid,
  };
  const extra = { auctionAddress: redeemIx.accounts[AUCTION_ADDRESS_INDEX] };
  return [txToReturn, extra];
}
