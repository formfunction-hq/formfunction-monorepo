import { Nft } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import getNftMintOwner from "src/utils/solana/getNftMintOwner";
import findNftOwnerFromTxs from "src/utils/solana/txs/findNftOwnerFromTxs";
import findNftPriceFromTxs from "src/utils/solana/txs/findNftPriceFromTxs";
import findNftStatusFromTxs from "src/utils/solana/txs/findNftStatusFromTxs";
import getNftTxs from "src/utils/solana/txs/getNftTxs";
import { NftStatusExpress_Enum } from "src/__generated__/generated";

export default async function getOnchainNftStatus(
  prismaNft: Nft,
  confirmedSignaturesLimit?: number
): Promise<{
  mint: string;
  ownerId: Maybe<string>;
  price: MaybeUndef<number>;
  status: NftStatusExpress_Enum;
  txs: Array<NftTransactionOnchain>;
}> {
  const { mint } = prismaNft;
  const [txs, owner] = await Promise.all([
    getNftTxs(new PublicKey(mint), confirmedSignaturesLimit),
    getNftMintOwner(new PublicKey(mint)),
  ]);
  const ownerAddress =
    owner == null ? findNftOwnerFromTxs(txs) : owner.toString();
  const [price, status] = await Promise.all([
    findNftPriceFromTxs(prismaNft.mint, txs),
    findNftStatusFromTxs(prismaNft.mint, txs),
  ]);

  return {
    mint,
    ownerId: ownerAddress,
    price,
    status: status ?? (prismaNft.status as NftStatusExpress_Enum),
    txs,
  };
}
