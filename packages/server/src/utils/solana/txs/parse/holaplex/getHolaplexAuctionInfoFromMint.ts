import { PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import HOLAPLEX_TRANSACTION_TYPES from "src/constants/HolaplexTransactionTypes";
import HolaplexAuctionInfo from "src/types/HolaplexAuctionInfo";
import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import getStandardEditionMintFromMasterEditionMint from "src/utils/solana/accounts/getStandardEditionMintFromMasterEditionMint";
import getMasterEditionMintFromStandardEditionMint from "src/utils/solana/accounts/getMasterEditionMintFromStandardEditionMint";
import getParsedTransactionsForAddress from "src/utils/solana/getParsedTransactionsForAddress";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";
import getHolaplexTxsForAuction from "src/utils/solana/txs/parse/holaplex/getHolaplexTxsForAuction";
import parseHolaplexRedeemFullRightsTx from "src/utils/solana/txs/parse/holaplex/parseHolaplexRedeemFullRightsTx";
import parseHolaplexRedeemPrintingTx from "src/utils/solana/txs/parse/holaplex/parseHolaplexRedeemPrintingTx";
import parseHolaplexRedeemTx from "src/utils/solana/txs/parse/holaplex/parseHolaplexRedeemTx";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import { NftOriginalEdition } from "@metaplex-foundation/js";

/**
 * This is the case where a limited edition NFT is auctioned off.
 *
 * Basic flow is as follows:
 *
 * - Start with master edition mint
 * - Query master edition txs
 * - Find the "RedeemPrinting" tx, which tells us a) the limited edition mint and b) the auction address
 * - Use the auction address to find the Holaplex transactions
 */
async function getHolaplexAuctionInfoForLimitedEditionMint(
  masterEditionMint: PublicKeyOrString,
  masterEdition: NftOriginalEdition,
  // Cannot (easily) get this info from txs
  creatorId: PublicKeyOrString
): Promise<Maybe<HolaplexAuctionInfo>> {
  const [masterEditionTxs, masterEditionMintTxs] = await Promise.all([
    getParsedTransactionsForAddress(masterEdition.address),
    getParsedTransactionsForAddress(new PublicKey(masterEditionMint)),
  ]);
  const redeemTx =
    masterEditionTxs
      .map((tx) => parseHolaplexRedeemPrintingTx(tx, creatorId))
      .find((tx) => tx != null) ??
    masterEditionMintTxs
      .map((tx) => parseHolaplexRedeemFullRightsTx(tx, creatorId))
      .find((tx) => tx != null);

  if (redeemTx == null) {
    return null;
  }

  let limitedEditionMint = redeemTx[0].mint;

  if (
    redeemTx[0].type ===
    NftTransactionTypeExpress_Enum.HolaplexRedeemFullRightsTransferBid
  ) {
    // Ran into this scenario for https://zen0m.holaplex.com/listings/4GFXApJFEsvocyjwvn8aHUsTSKr5hS141fZauBYWoYHK.
    // For some reason, that auction uses RedeemFullRightsTransferBid on a master edition, but still
    // auctioned off a limited edition...
    const limitedEditionMintAccount =
      await getStandardEditionMintFromMasterEditionMint(masterEditionMint);
    if (limitedEditionMintAccount == null) {
      return null;
    }
    limitedEditionMint = limitedEditionMintAccount.address.toString();
  }

  const masterEditionMetadata = await AccountLoader.loadNft(masterEditionMint);

  if (masterEditionMetadata == null) {
    return null;
  }

  const auctionAddress = redeemTx[1].auctionAddress.toString();

  const holaplexTxs = await getHolaplexTxsForAuction(
    auctionAddress,
    "PLACEHOLDER",
    creatorId
  );

  return {
    auctionAddress: redeemTx[1].auctionAddress.toString(),
    limitedEditionMint,
    masterEditionMint: masterEditionMint.toString(),
    masterEditionUpdateAuthority:
      masterEditionMetadata.updateAuthorityAddress.toString(),
    // Need to replace PLACEHOLDER
    transactions: holaplexTxs
      // Use limited edition mint
      .map((txInner) => ({ ...txInner, mint: limitedEditionMint }))
      // We don't want to use these txs anymore
      .filter((txInner) => !HOLAPLEX_TRANSACTION_TYPES.includes(txInner.type)),
  };
}

/**
 * This is the case where a master edition NFT is auctioned off.
 *
 * Basic flow is as follows:
 *
 * - Start with master edition mint
 * - Query master edition mint txs
 * - Find the "Redeem" tx, which tells us the auction address
 * - Use the auction address to find the Holaplex transactions
 */
async function getHolaplexAuctionInfoForMasterEditionMint(
  masterEditionMint: PublicKeyOrString,
  // Cannot (easily) get this info from txs
  creatorId: PublicKeyOrString
): Promise<Maybe<HolaplexAuctionInfo>> {
  const txs = await getParsedTransactionsForAddress(
    new PublicKey(masterEditionMint)
  );

  const redeemTx = txs
    .map(
      (tx) =>
        parseHolaplexRedeemTx(tx, creatorId) ??
        parseHolaplexRedeemFullRightsTx(tx, creatorId)
    )
    .find((tx) => tx != null);
  if (redeemTx == null) {
    return null;
  }

  const masterEditionMetadata = await AccountLoader.loadNft(masterEditionMint);

  if (masterEditionMetadata == null) {
    return null;
  }

  const auctionAddress = redeemTx[1].auctionAddress.toString();

  const holaplexTxs = await getHolaplexTxsForAuction(
    auctionAddress,
    "PLACEHOLDER",
    creatorId
  );

  return {
    auctionAddress: redeemTx[1].auctionAddress.toString(),
    masterEditionMint: masterEditionMint.toString(),
    masterEditionUpdateAuthority:
      masterEditionMetadata.updateAuthorityAddress.toString(),
    // Need to replace PLACEHOLDER
    transactions: holaplexTxs
      .map((txInner) => ({ ...txInner, masterEditionMint }))
      // We don't want to use these txs anymore
      .filter((txInner) => !HOLAPLEX_TRANSACTION_TYPES.includes(txInner.type)),
  };
}

export default async function getHolaplexAuctionInfoFromMint(
  mint: PublicKeyOrString,
  // Cannot (easily) get this info from txs
  creatorId: PublicKeyOrString
): Promise<Maybe<HolaplexAuctionInfo>> {
  let masterEdition = await AccountLoader.loadMasterEditionAccount(mint);
  let masterEditionMint = mint;
  if (masterEdition == null) {
    // Support cases where a limited edition mint is passed in. We only support
    // fetching Holaplex txs starting from a master edition mint.
    const masterEditionMintAccount =
      await getMasterEditionMintFromStandardEditionMint(mint);
    if (masterEditionMintAccount == null) {
      return null;
    }
    masterEdition = await AccountLoader.loadMasterEditionAccount(
      masterEditionMintAccount.address
    );
    masterEditionMint = masterEditionMintAccount.address;
  }

  if (masterEdition == null) {
    return null;
  }

  if (masterEdition.supply.toNumber() === 0) {
    return getHolaplexAuctionInfoForMasterEditionMint(
      masterEditionMint,
      creatorId
    );
  }

  return getHolaplexAuctionInfoForLimitedEditionMint(
    masterEditionMint,
    masterEdition,
    creatorId
  );
}
