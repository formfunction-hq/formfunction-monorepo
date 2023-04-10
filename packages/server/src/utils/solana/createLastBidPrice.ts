import { AuctionHouseSdk } from "@formfunction-hq/formfunction-auction-house";
import { PublicKey, Transaction } from "@solana/web3.js";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import getNftKind from "formfn-shared/dist/utils/nft/getNftKind";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import getPrisma from "src/utils/prisma/getPrisma";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";

/**
 * For standard edition prints, we want to set hasBeenSold to true.
 * Otherwise, we will take a 5% fee if they get sold on secondary, even though they
 * were already technically sold during the primary minting.
 *
 * We also want to do this for pNFT standard editions.
 */
async function getHasBeenSoldTx(
  auctionHouseSdk: AuctionHouseSdk,
  mint: string,
  nftKind: NftKind
): Promise<Maybe<Transaction>> {
  switch (nftKind) {
    case NftKind.StandardEditionPrintNonzeroSupply:
    case NftKind.StandardEditionPrintUnlimitedSupply:
    case NftKind.PnftStandardEdition: {
      return auctionHouseSdk.setHasBeenSoldTx(
        {
          tokenMint: new PublicKey(mint),
        },
        { hasBeenSold: true }
      );
    }
    case NftKind.MasterEditionWithNonzeroSupply:
    case NftKind.MasterEditionWithUnlimitedSupply:
    case NftKind.PnftMasterEdition:
    case NftKind.Generative:
    case NftKind.OneOfOne:
      return null;
    default:
      return assertUnreachable(nftKind);
  }
}

export default async function createLastBidPrice(mint: string): Promise<void> {
  const prisma = getPrisma();
  const nftForMint = await prisma.nft.findUnique({
    include: {
      MasterEditionNft: true,
      NftListing: { include: { Currency: true } },
      Series: {
        include: {
          CandyMachine: true,
        },
      },
    },
    where: { mint },
  });
  if (nftForMint == null) {
    throw new Error("Mint does not exist in table");
  }

  const auctionHouseSdk = getAuctionHouseSdk(
    nftForMint.NftListing!.Currency.name as CurrencyNameExpress_Enum
  );
  const [lastBidPrice] = await auctionHouseSdk.findLastBidPrice(
    new PublicKey(mint)
  );
  const lastBidPriceAccountInfo = await ConnectionWrapper.getAccountInfo(
    lastBidPrice,
    "confirmed"
  );
  if (lastBidPriceAccountInfo != null) {
    return;
  }

  const createLastBidPriceTx = await auctionHouseSdk.createLastBidPriceTx({
    tokenMint: new PublicKey(mint),
    wallet: getAuthorityKeypair().publicKey,
  });
  const nftKind = getNftKind(
    nftForMint.isMasterEdition,
    nftForMint.isPnft,
    nftForMint.maxSupply,
    nftForMint.MasterEditionNft?.maxSupply ?? null,
    nftForMint.Series?.CandyMachine != null
  );
  const hasBeenSoldTx = await getHasBeenSoldTx(auctionHouseSdk, mint, nftKind);
  if (hasBeenSoldTx != null) {
    createLastBidPriceTx.add(...hasBeenSoldTx.instructions);
  }

  await ConnectionWrapper.sendAndConfirmTransaction(createLastBidPriceTx, [
    getAuthorityKeypair(),
  ]);
}
