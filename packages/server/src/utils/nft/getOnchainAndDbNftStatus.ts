import getPrisma from "src/utils/prisma/getPrisma";
import getOnchainNftStatus from "src/utils/getOnchainNftStatus";

export default async function getOnchainAndDbNftStatus(
  mint: string,
  confirmedSignaturesLimit?: number
) {
  const prisma = getPrisma();
  const prismaNft = await prisma.nft.findUnique({
    include: { NftListing: { include: { Currency: true } } },
    where: { mint },
  });

  const onchainNft = await getOnchainNftStatus(
    prismaNft!,
    confirmedSignaturesLimit
  );

  return {
    onchainNft,
    prismaNft,
  };
}
