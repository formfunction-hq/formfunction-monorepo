import {
  NftExpress,
  NftTransactionTypeExpress_Enum,
  Price,
} from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getPrisma from "src/utils/prisma/getPrisma";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import bigintToNumber from "src/utils/bigintToNumber";
import convertPrice from "src/utils/convert/convertPrice";

export default async function priceLastListedV2Resolver(
  nft: NftExpress
): Promise<Maybe<Price>> {
  const prisma = getPrisma();
  const lastListing = await prisma.nftTransaction.findFirst({
    include: { Currency: true },
    orderBy: NFT_TRANSACTION_ORDER_BY,
    where: {
      mint: nft.mint,
      type: NftTransactionTypeExpress_Enum.Listed,
    },
  });

  return convertPrice(
    bigintToNumber(lastListing?.price),
    lastListing?.Currency
  );
}
