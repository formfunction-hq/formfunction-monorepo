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
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";

const AUCTION_ADDRESS_INDEX = 7;
const MINT_INDEX = 21;
const REDEEMER_INDEX = 9;

function isRedeemIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction
): boolean {
  // @ts-ignore
  const data = ix.data ?? "";
  return (
    arePublicKeysEqual(ix.programId, METAPLEX_PROGRAM_ID) &&
    // First byte of ix data is the ix discriminator
    base58ToHex(data).startsWith("0e")
  );
}

/**
 * See https://github.com/metaplex-foundation/metaplex-program-library/blob/master/metaplex/program/src/instruction.rs#L468
 * for info about the RedeemPrintingV2Bid ix.
 *
 * Example tx (for https://monsterfriends.holaplex.com/listings/D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ)
 *
 * - LgqTm1Sp4SY731UoDesdY3SCFWu4WVAg3o9CJWScSa26i5vNp7cQNArm24wGawBRXkW97U36QzuwnRhdHNufrkV
 */
export default function parseHolaplexRedeemPrintingTx(
  tx: ParsedTransactionWithMeta,
  // Cannot (easily) get this info from tx
  creatorId: PublicKeyOrString
): Maybe<[NftTransactionOnchain, { auctionAddress: PublicKey }]> {
  const { instructions } = tx.transaction.message;
  const redeemIx = instructions.find((ix) =>
    isRedeemIx(ix)
  ) as Maybe<PartiallyDecodedInstruction>;

  if (redeemIx == null) {
    return null;
  }

  const txid = tx.transaction.signatures[0];
  const redeemer = redeemIx.accounts[REDEEMER_INDEX].toString();

  const txToReturn = {
    creatorId: creatorId.toString(),
    fromAddress: redeemer,
    id: txid,
    mint: redeemIx.accounts[MINT_INDEX].toString(),
    source: NftTransactionSourceExpress_Enum.Holaplex,
    timeCreated: dayjs.unix(tx.blockTime!).toDate(),
    toAddress: redeemer,
    txid,
    type: NftTransactionTypeExpress_Enum.HolaplexRedeemPrintingV2Bid,
  };
  const extra = { auctionAddress: redeemIx.accounts[AUCTION_ADDRESS_INDEX] };
  return [txToReturn, extra];
}
