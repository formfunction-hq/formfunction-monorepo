/* eslint-disable no-plusplus */
import {
  ParsedInstruction,
  ParsedTransactionWithMeta,
  PartiallyDecodedInstruction,
} from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import {
  NftTransactionSourceExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import invariant from "tiny-invariant";
import base58ToHex from "src/utils/base58ToHex";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";

function isClaimBidIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction
): boolean {
  // @ts-ignore
  const data = ix.data ?? "";
  return (
    arePublicKeysEqual(
      ix.programId,
      "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98"
    ) &&
    // First byte of ix data is the ix discriminator
    base58ToHex(data) === "06"
  );
}

/**
 * Example claim bid txs
 *
 * - Bid for 5.5 SOL: 5AWq1gzTetG62PUdzAwTcjXrPeExwny995E5gshSd5viMMnaf1LatDKmYUm9vydUxeMFNdGuV5g8EfBuSsoaXGwn
 *   - for https://monsterfriends.holaplex.com/listings/D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ
 * - Bid for 9.5 SOL: 64eUQ8agsLY7amWJ6ZxMmF3myTCLGnKunxSsgBN8fCPQCA83zD84UWk11wK5Q3LMaUwc7eQV4jFhvoRTRfVBNCaU
 *   - for https://monsterfriends.holaplex.com/listings/CwvSf2FsQ2nYijiwodXTbw2AXbcVWLdcube2a1bphTHi
 */
export default function parseHolaplexClaimBidTx(
  tx: ParsedTransactionWithMeta,
  // Cannot (easily) get this info from tx
  mint: PublicKeyOrString,
  // Cannot (easily) get this info from tx
  creatorId: PublicKeyOrString
): Maybe<NftTransactionOnchain> {
  const { instructions } = tx.transaction.message;
  const claimBidIxIndex = instructions.findIndex((ix) => isClaimBidIx(ix));

  if (claimBidIxIndex === -1) {
    return null;
  }

  const innerIxs = tx.meta?.innerInstructions?.find(
    (innerIx) => innerIx.index === claimBidIxIndex
  );
  // There should be 2 inner ixs—the claim bid ix for the Metaplex auction contract, and a SPL transfer ix.
  invariant(
    innerIxs != null && innerIxs.instructions.length === 2,
    "Invalid inner ixs"
  );

  const auctionClaimBidIx = innerIxs
    .instructions[0] as PartiallyDecodedInstruction;
  const transferIx = innerIxs.instructions[1] as ParsedInstruction;

  const txid = tx.transaction.signatures[0];
  const bidder = auctionClaimBidIx.accounts[5];
  const priceInLamports = Number(transferIx.parsed.info.amount);

  if (priceInLamports === 0) {
    // Seems like there can be multiple claims
    //
    // E.g. for https://monsterfriends.holaplex.com/listings/C6Npqz79dCzcpj9PBLEqBpD5Fk8QpkQUwH2Xooy9Zm4Q
    // - https://explorer.solana.com/tx/4jqsz7LZud5jxdedBTrBH2nRxV5uSevhFnu7SwCPmnZ8UYjaPh1pGbkstFUi4DhwHZLHatgc1gqDnMbgyxfKYZK4
    // - https://explorer.solana.com/tx/4YRGknaemZxcdEtnuhLBkjG4hjaHhijqxUUmQvv86grmnwpcKum7YB3ybWgo41uJQSEjL7uThXQq1mwh2HTSBYpY
    //
    // We only want the claim where SOL was actually transferred
    return null;
  }

  return {
    creatorId: creatorId.toString(),
    fromAddress: creatorId.toString(),
    id: txid,
    mint: mint.toString(),
    priceInLamports,
    source: NftTransactionSourceExpress_Enum.Holaplex,
    timeCreated: dayjs.unix(tx.blockTime!).toDate(),
    toAddress: bidder.toString(),
    txid,
    type: NftTransactionTypeExpress_Enum.Sold,
  };
}
