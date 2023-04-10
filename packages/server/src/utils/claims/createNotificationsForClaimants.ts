import getPrisma from "src/utils/prisma/getPrisma";
import { Nft, NftMetadata } from "@prisma/client";
import getPnftDropTimes from "src/utils/getPnftDropTimes";
import createBidderClaimPnftNotifications from "src/utils/notifications/create/createBidderClaimPnftNotifications";

export default async function createNotificationsForClaimants(
  auctionNft: Nft & {
    NftMetadata: NftMetadata;
  },
  pnftIdForAuction: string,
  createdClaimsUserIds: Array<string>
) {
  const prisma = getPrisma();

  const pnft = await prisma.nft.findUnique({
    include: {
      NftMetadata: true,
      Owner: true,
    },
    where: { id: pnftIdForAuction },
  });

  if (pnft == null) {
    return;
  }

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: createdClaimsUserIds,
      },
    },
  });

  const { dropDuration } = await getPnftDropTimes();
  await createBidderClaimPnftNotifications(
    users.map((user) => ({
      data: {
        auctionNftMint: auctionNft.mint,
        dropDurationInMinutes: dropDuration.asMinutes(),
        pnftMint: pnft.mint,
      },
      receiverId: user.id,
      senderId: auctionNft.creatorId,
    }))
  );
}
