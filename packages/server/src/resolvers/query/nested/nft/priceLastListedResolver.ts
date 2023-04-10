import {
  NftExpress,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getPrisma from "src/utils/prisma/getPrisma";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import bigintToNumber from "src/utils/bigintToNumber";

export default async function priceLastListedResolver(
  nft: NftExpress
): Promise<Maybe<number>> {
  const prisma = getPrisma();
  const lastListing = await prisma.nftTransaction.findFirst({
    orderBy: NFT_TRANSACTION_ORDER_BY,
    where: {
      mint: nft.mint,
      type: NftTransactionTypeExpress_Enum.Listed,
    },
  });

  return bigintToNumber(lastListing?.price);
}
