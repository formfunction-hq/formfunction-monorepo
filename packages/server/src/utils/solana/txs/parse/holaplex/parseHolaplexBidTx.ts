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
import base58ToHex from "src/utils/base58ToHex";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";

function isBidIx(ix: ParsedInstruction | PartiallyDecodedInstruction): boolean {
  // @ts-ignore
  const data = ix.data ?? "";
  return (
    arePublicKeysEqual(
      ix.programId,
      "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8"
    ) &&
    // First byte of ix data is the ix discriminator
    base58ToHex(data).startsWith("06")
  );
}

/**
 * Format of Holaplex bid ix data is as follows:
 * - Byte #1: ix discriminator
 * - Bytes #2 through #5: the price
 *
 * E.g. if the ix data looks like this:
 * 0600ca9a3b00000000a7e6a6245db195070dbc6436c8add9004fe455d16e558e4f3e3e74c4f74857fd
 *
 * Then the price in lamports is 3b9aca00
 */
function getBidPriceFromIxHexString(hexString: string) {
  let priceHexString = "";
  // eslint-disable-next-line for-direction
  for (let i = 5; i >= 1; i--) {
    priceHexString += hexString.slice(i * 2, (i + 1) * 2);
  }
  return parseInt(priceHexString, 16);
}

/**
 * Example bid txs (for https://monsterfriends.holaplex.com/listings/D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ)
 *
 * - Bid for 1 SOL: o1qP6cTghjEH88sqm1VEsknkyYVBgDZcHJJ3ZHNCZMQ6wvXMJbAKD4vUQ3mfVvHdZiSh4Zwh5JAz8dNbJzzTMWk
 * - Bid for 2.5 SOL: GLX4rjVax72YXNmQ2R3ZbWygQkcWEKz6yPkbbMn9ZAVNdG33V5coqGxSnd5ZM9YiuAqZQYXBE22TGGePRNjutE6
 */
export default function parseHolaplexBidTx(
  tx: ParsedTransactionWithMeta,
  // Cannot (easily) get this info from tx
  mint: PublicKeyOrString,
  // Cannot (easily) get this info from tx
  creatorId: PublicKeyOrString
): Maybe<NftTransactionOnchain> {
  const { instructions } = tx.transaction.message;
  const bidIx = instructions.find((ix) =>
    isBidIx(ix)
  ) as Maybe<PartiallyDecodedInstruction>;

  if (bidIx == null) {
    return null;
  }

  if (
    tx.meta?.logMessages?.find((log) => log.includes("Auction ended")) != null
  ) {
    return null;
  }

  const txid = tx.transaction.signatures[0];
  const hexData = base58ToHex(bidIx.data);
  const priceInLamports = getBidPriceFromIxHexString(hexData);

  return {
    creatorId: creatorId.toString(),
    fromAddress: bidIx.accounts[0].toString(),
    id: txid,
    mint: mint.toString(),
    priceInLamports,
    source: NftTransactionSourceExpress_Enum.Holaplex,
    timeCreated: dayjs.unix(tx.blockTime!).toDate(),
    toAddress: creatorId.toString(),
    txid,
    type: NftTransactionTypeExpress_Enum.Bid,
  };
}
