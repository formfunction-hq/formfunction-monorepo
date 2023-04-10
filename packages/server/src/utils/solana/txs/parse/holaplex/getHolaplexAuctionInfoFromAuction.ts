import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import invariant from "tiny-invariant";
import HOLAPLEX_TRANSACTION_TYPES from "src/constants/HolaplexTransactionTypes";
import HolaplexAuctionInfo from "src/types/HolaplexAuctionInfo";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import getMasterEditionMintFromStandardEditionMint from "src/utils/solana/accounts/getMasterEditionMintFromStandardEditionMint";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";
import getHolaplexTxsForAuction from "src/utils/solana/txs/parse/holaplex/getHolaplexTxsForAuction";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

async function getLimitedEditionAuctionInfo(
  auctionAddress: string,
  tx: NftTransactionOnchain,
  txs: Array<NftTransactionOnchain>
): Promise<Maybe<HolaplexAuctionInfo>> {
  invariant(
    tx.type === NftTransactionTypeExpress_Enum.HolaplexRedeemPrintingV2Bid,
    "Invalid tx"
  );

  const masterEditionMint = await getMasterEditionMintFromStandardEditionMint(
    tx.mint
  );

  if (masterEditionMint == null) {
    return null;
  }

  const masterEditionMetadata = await AccountLoader.loadNft(
    masterEditionMint.address
  );

  if (masterEditionMetadata == null) {
    return null;
  }

  return {
    auctionAddress,
    limitedEditionMint: tx.mint,
    masterEditionMint: masterEditionMint.address.toString(),
    masterEditionUpdateAuthority:
      masterEditionMetadata.updateAuthorityAddress.toString(),
    // Need to replace PLACEHOLDER
    transactions: txs
      .map((txInner) => ({ ...txInner, mint: tx.mint }))
      // We don't want to use these txs anymore
      .filter((txInner) => !HOLAPLEX_TRANSACTION_TYPES.includes(txInner.type)),
  };
}

async function getMasterEditionAuctionInfo(
  auctionAddress: string,
  tx: NftTransactionOnchain,
  txs: Array<NftTransactionOnchain>
): Promise<Maybe<HolaplexAuctionInfo>> {
  invariant(
    [
      NftTransactionTypeExpress_Enum.HolaplexRedeemFullRightsTransferBid,
      NftTransactionTypeExpress_Enum.HolaplexRedeemBid,
    ].includes(tx.type),
    "Invalid tx"
  );

  const masterEditionMetadata = await AccountLoader.loadNft(tx.mint);

  if (masterEditionMetadata == null) {
    return null;
  }

  return {
    auctionAddress,
    masterEditionMint: tx.mint,
    masterEditionUpdateAuthority:
      masterEditionMetadata.updateAuthorityAddress.toString(),
    // Need to replace PLACEHOLDER
    transactions: txs
      .map((txInner) => ({ ...txInner, mint: tx.mint }))
      // We don't want to use these txs anymore
      .filter((txInner) => !HOLAPLEX_TRANSACTION_TYPES.includes(txInner.type)),
  };
}

/**
 * Should prefer to use getHolaplexAuctionInfoFromMint in most scenarios.
 */
export default async function getHolaplexAuctionInfoFromAuction(
  auctionAddress: PublicKeyOrString,
  // Cannot (easily) get this info from txs
  creatorId: PublicKeyOrString
): Promise<Maybe<HolaplexAuctionInfo>> {
  const txs = await getHolaplexTxsForAuction(
    auctionAddress,
    "PLACEHOLDER",
    creatorId
  );

  const redeemTx = txs.find((tx) =>
    HOLAPLEX_TRANSACTION_TYPES.includes(tx.type)
  );

  if (redeemTx == null) {
    // Auction may not be finished?
    return null;
  }

  if (
    redeemTx.type === NftTransactionTypeExpress_Enum.HolaplexRedeemPrintingV2Bid
  ) {
    return getLimitedEditionAuctionInfo(
      auctionAddress.toString(),
      redeemTx,
      txs
    );
  }
  return getMasterEditionAuctionInfo(auctionAddress.toString(), redeemTx, txs);
}
