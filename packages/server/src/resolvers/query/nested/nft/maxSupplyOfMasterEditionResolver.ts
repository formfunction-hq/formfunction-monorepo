import { NftStatusExpress_Enum } from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getNftKind from "formfn-shared/dist/utils/nft/getNftKind";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import getPrisma from "src/utils/prisma/getPrisma";
import NftSourceType from "src/types/graphql-source/NftSourceType";

export default async function maxSupplyOfMasterEditionResolver(
  nft: NftSourceType
): Promise<Maybe<number>> {
  const maxSupplyOnchain = nft.maxSupplyOnchain ?? null;
  const maxSupplyOfMasterEdition = nft.maxSupplyOfMasterEdition ?? null;
  const nftKind = getNftKind(
    nft.isMasterEdition,
    nft.isPnft,
    maxSupplyOnchain,
    maxSupplyOfMasterEdition,
    nft.CandyMachine != null
  );
  const prisma = getPrisma();

  switch (nftKind) {
    case NftKind.StandardEditionPrintNonzeroSupply: {
      // See maxSupplyResolver for rationale.
      if (
        nft._MasterEditionNft?.status !==
          NftStatusExpress_Enum.OwnedStoppedMintingForEditions ||
        nft.masterEditionMint == null
      ) {
        return maxSupplyOfMasterEdition;
      }

      // Use Prisma's fluent API so that queries get batched,
      // see https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance#solving-n1-in-graphql-with-findunique-and-prismas-dataloader
      // for more info
      const standardEditions = await prisma.nft
        .findUnique({
          where: {
            mint: nft.masterEditionMint,
          },
        })
        .StandardEditionNft();
      return standardEditions?.length ?? 0;
    }
    case NftKind.MasterEditionWithNonzeroSupply:
    case NftKind.MasterEditionWithUnlimitedSupply:
    case NftKind.PnftMasterEdition:
    case NftKind.Generative:
    case NftKind.OneOfOne:
    case NftKind.PnftStandardEdition:
    case NftKind.StandardEditionPrintUnlimitedSupply:
      return maxSupplyOfMasterEdition;
    default:
      return assertUnreachable(nftKind);
  }
}
