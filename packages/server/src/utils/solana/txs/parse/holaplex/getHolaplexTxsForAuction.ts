import { PublicKey } from "@solana/web3.js";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import parseHolaplexTx from "src/utils/solana/txs/parse/holaplex/parseHolaplexTx";

/**
 * AFAIK, an auction address can only be associated with an NFT mint by going to the NFT's
 * Holaplex page (e.g. https://monsterfriends.holaplex.com/listings/D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ).
 * The auction address is the address in the URL (D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ for this example).
 */
export default async function getHolaplexTxsForAuction(
  auctionAddress: PublicKeyOrString,
  // Cannot (easily) get this info from txs
  mint: PublicKeyOrString,
  // Cannot (easily) get this info from txs
  creatorId: PublicKeyOrString
): Promise<Array<NftTransactionOnchain>> {
  const sigs = await ConnectionWrapper.getConfirmedSignaturesForAddress2(
    new PublicKey(auctionAddress),
    { limit: 100 },
    "confirmed"
  );

  const parsedTxs = await ConnectionWrapper.getParsedTransactions(
    sigs.map((sig) => sig.signature),
    "confirmed"
  );

  const holaplexTxs = parsedTxs.map((tx) =>
    parseHolaplexTx(tx, mint, creatorId)
  );

  return filterNulls(holaplexTxs);
}
