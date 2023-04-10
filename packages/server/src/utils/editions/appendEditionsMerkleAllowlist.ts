import { Request } from "express";
import { APPEND_MERKLE_ROOTS_LIMIT_PER_TX } from "@formfunction-hq/formfunction-auction-house";
import MerkleAllowlistBuyersList from "@formfunction-hq/formfunction-auction-house/dist/types/merkle-tree/MerkleAllowlistBuyersList";
import { PublicKey } from "@solana/web3.js";
import batchArray from "formfn-shared/dist/utils/array/batchArray";
import forEachAsync from "formfn-shared/dist/utils/array/forEachAsync";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import loadAuctionHouseSdk from "src/utils/solana/loadAuctionHouseSdk";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";

export default async function appendEditionsMerkleAllowlist(
  req: Request,
  merkleAllowlist: Array<MerkleAllowlistBuyersList>,
  mint: string
): Promise<Array<string>> {
  const auctionHouseSdk = loadAuctionHouseSdk(CurrencyNameExpress_Enum.Solana);
  const appendTxids: Array<string> = [];
  const uploadBatches = batchArray(
    merkleAllowlist,
    APPEND_MERKLE_ROOTS_LIMIT_PER_TX
  );
  // Then, append all the roots.
  // Needs to be done serially b/c the order of the merkle roots matters
  await forEachAsync(uploadBatches, async (batch) => {
    const merkleRoots = batch.map((val) => val.tree.getRoot());
    try {
      const tx = await auctionHouseSdk.appendEditionAllowlistMerkleRootsTx(
        {
          mint: new PublicKey(mint),
        },
        {
          merkleRoots,
        }
      );
      const txid = await ConnectionWrapper.sendAndConfirmTransaction(tx, [
        getAuthorityKeypair(),
      ]);
      appendTxids.push(txid);
    } catch (e: any) {
      logError(AnalyticsEvent.AppendEditionsMerkleAllowlistFail, e, req, {
        mint,
      });

      throw e;
    }
  });

  return appendTxids;
}
