import getPrisma from "src/utils/prisma/getPrisma";
import NftSourceType from "src/types/graphql-source/NftSourceType";
import getNftKind from "formfn-shared/dist/utils/nft/getNftKind";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

export default async function isAirdropResolver(
  nft: NftSourceType
): Promise<boolean> {
  const prisma = getPrisma();
  const nftKind = getNftKind(
    nft.isMasterEdition,
    nft.isPnft,
    nft.maxSupply ?? null,
    nft.maxSupplyOfMasterEdition ?? null,
    nft.CandyMachine != null
  );
  switch (nftKind) {
    case NftKind.MasterEditionWithNonzeroSupply: {
      const resultingNft = await prisma.nft.findUnique({
        include: {
          AirdropMasterEdition: { take: 1 },
        },
        where: { id: nft.mint },
      });

      return (resultingNft?.AirdropMasterEdition?.length ?? 0) > 0;
    }
    case NftKind.StandardEditionPrintNonzeroSupply: {
      const resultingNft = await prisma.nft.findUnique({
        include: {
          AirdropStandardEdition: true,
        },
        where: { id: nft.mint },
      });

      return resultingNft?.AirdropStandardEdition != null;
    }
    case NftKind.MasterEditionWithUnlimitedSupply:
    case NftKind.PnftMasterEdition:
    case NftKind.Generative:
    case NftKind.OneOfOne:
    case NftKind.PnftStandardEdition:
    case NftKind.StandardEditionPrintUnlimitedSupply:
      return false;
    default:
      return assertUnreachable(nftKind);
  }
}
