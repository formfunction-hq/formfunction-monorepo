import {
  MetadataAccount,
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function numberOfBidsForCurrentAuctionResolver(
  metadataAccount: MetadataAccount
): Promise<Maybe<number>> {
  if (metadataAccount.nft.status !== NftStatusExpress_Enum.Auction) {
    return null;
  }

  const prisma = getPrisma();
  // Use Prisma's fluent API so that queries get batched,
  // see https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance#solving-n1-in-graphql-with-findunique-and-prismas-dataloader
  // for more info
  const transactions = await prisma.nft
    .findUnique({ where: { mint: metadataAccount.mint } })
    .NftTransaction({
      where: {
        auctionCount: metadataAccount.nft.auctionCount,
        type: NftTransactionTypeExpress_Enum.Bid,
      },
    });
  return transactions?.length ?? 0;
}
