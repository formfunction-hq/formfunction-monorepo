import { Request } from "express";
import { PublicKey } from "@solana/web3.js";
import { Airdrop, Nft, User } from "@prisma/client";
import createAirdropGiftReceivedNotification from "src/utils/notifications/create/createAirdropGiftReceivedNotification";
import getPrisma from "src/utils/prisma/getPrisma";
import insertNftTransaction from "src/utils/transaction/insertNftTransaction";
import {
  CurrencyNameExpress_Enum,
  InsertNftTransactionInput,
  InsertStandardEditionInput,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import findParsedNftTransaction from "formfn-shared/dist/utils/solana/txs/findParsedNftTransaction";
import getAllParsedTransactionsForAddress from "src/utils/solana/getAllParsedTransactionsForAddress";
import parseBuyEditionTx from "src/utils/solana/txs/parse/editions/parseBuyEditionTx";
import invariant from "tiny-invariant";
import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";

export async function getMintTxid(
  standardEditionMint: PublicKey,
  mintTxid?: string
) {
  if (mintTxid != null) {
    return mintTxid;
  }

  const txs = await getAllParsedTransactionsForAddress(standardEditionMint);
  const parsed = await findParsedNftTransaction(
    txs,
    // Although this is technically the BuyEditionV2 tx, we are referring
    // to it as the Mint tx here
    (t) => {
      const decodedTransaction = decodeAuctionHouseTransaction(
        getAuctionHouseConstants().programId,
        t
      );
      return parseBuyEditionTx(t, decodedTransaction);
    },
    SortOrder.Asc
  );
  invariant(
    parsed != null,
    `Mint tx for standard edition ${standardEditionMint.toString()} should not be null`
  );

  return parsed.tx.txid;
}

export default async function insertAirdroppedNftAndNotify(
  req: Request,
  masterEditionNft: Nft,
  masterEditionMint: PublicKey,
  standardEditionMint: PublicKey,
  airdrop: Airdrop & { ToUser: User },
  mintTxid?: string
) {
  const { ToUser } = airdrop;
  const existingNft = await getPrisma().nft.findUnique({
    where: { id: standardEditionMint.toString() },
  });
  if (existingNft != null) {
    // We already inserted the NFT => no-op
    return;
  }

  const mintTxidInner = await getMintTxid(standardEditionMint, mintTxid);
  const insertStandardEditionInput: InsertStandardEditionInput = {
    masterEditionMint: masterEditionMint.toString(),
    ownerId: ToUser.id,
    standardEditionMint: standardEditionMint.toString(),
  };
  const insertMintedNftTransactionInput: InsertNftTransactionInput = {
    creatorId: masterEditionNft.creatorId,
    currencyName: CurrencyNameExpress_Enum.Solana,
    fromUserId: masterEditionNft.creatorId,
    insertStandardEditionInput,
    mint: standardEditionMint.toString(),
    toUserId: ToUser.id,
    txid: mintTxidInner!,
    type: NftTransactionTypeExpress_Enum.Minted,
  };

  await insertNftTransaction(req, insertMintedNftTransactionInput);
  await createAirdropGiftReceivedNotification(
    { airdropId: airdrop.id },
    airdrop.ToUser.id,
    airdrop.fromAddress
  );

  // Finally, update the `standardEditionMint` column
  await getPrisma().airdrop.update({
    data: { standardEditionMint: standardEditionMint.toString() },
    where: { id: airdrop.id },
  });
}
