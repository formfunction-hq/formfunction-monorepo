import getPrisma from "src/utils/prisma/getPrisma";

export default async function hasUserClaimedPnft(
  auctionNftMint: string,
  userId: string
): Promise<boolean> {
  const prisma = getPrisma();
  const fulfilledClaim = await prisma.claim.findFirst({
    where: {
      auctionNftId: auctionNftMint,
      claimTransactionId: {
        not: null,
      },
      userId,
    },
  });
  return fulfilledClaim != null;
}
