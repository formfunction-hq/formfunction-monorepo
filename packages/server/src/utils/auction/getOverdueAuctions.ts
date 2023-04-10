import getPrisma from "src/utils/prisma/getPrisma";
import { NftStatusExpress_Enum } from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";

/**
 * Returns NFTs whose auctions ended at least 3 days ago, but have not been settled yet.
 */
export default async function getOverdueAuctions() {
  const prisma = getPrisma();
  return prisma.nft.findMany({
    where: {
      NftListing: {
        auctionEndTime: {
          lte: dayjs().subtract(3, "day").toDate(),
        },
      },
      status: NftStatusExpress_Enum.Auction,
    },
  });
}
