import getPrisma from "src/utils/prisma/getPrisma";

export default async function isPnftDropClosed(
  auctionNftMint: string
): Promise<boolean> {
  const prisma = getPrisma();
  const nftListing = await prisma.nftListing.findUnique({
    where: {
      nftId: auctionNftMint,
    },
  });
  return !nftListing!.isPnftDropActive;
}
