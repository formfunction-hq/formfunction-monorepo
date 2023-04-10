import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getPrisma from "src/utils/prisma/getPrisma";
import getNftKind from "formfn-shared/dist/utils/nft/getNftKind";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import NftSourceType from "src/types/graphql-source/NftSourceType";

async function numberOfStandardEditionsMintedResolver(
  nft: NftSourceType
): Promise<Maybe<number>> {
  const nftKind = getNftKind(
    nft.isMasterEdition,
    nft.isPnft,
    nft.maxSupplyOnchain ?? null,
    nft.maxSupplyOfMasterEdition ?? null,
    nft.CandyMachine != null
  );

  const prisma = getPrisma();

  switch (nftKind) {
    case NftKind.MasterEditionWithNonzeroSupply:
    case NftKind.MasterEditionWithUnlimitedSupply:
    case NftKind.PnftMasterEdition: {
      // Use Prisma's fluent API so that queries get batched,
      // see https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance#solving-n1-in-graphql-with-findunique-and-prismas-dataloader
      // for more info
      // const standardEditions = await prisma.nft
      //   .findUnique({
      //     where: {
      //       mint: nft.mint,
      //     },
      //   })
      //   .StandardEditionNft();
      // return standardEditions?.length ?? 0;

      // TODO[@arcticmatt]: check to see if this is faster, if not revert
      return prisma.nft.count({
        where: {
          masterEditionMint: nft.mint,
        },
      });
    }
    case NftKind.PnftStandardEdition:
    case NftKind.StandardEditionPrintNonzeroSupply:
    case NftKind.StandardEditionPrintUnlimitedSupply: {
      if (nft.masterEditionMint == null) {
        return 1;
      }

      // Use Prisma's fluent API so that queries get batched,
      // see https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance#solving-n1-in-graphql-with-findunique-and-prismas-dataloader
      // for more info
      // const standardEditions = await prisma.nft
      //   .findUnique({
      //     where: {
      //       mint: nft.masterEditionMint,
      //     },
      //   })
      //   .StandardEditionNft();
      // return standardEditions?.length ?? 0;

      // TODO[@arcticmatt]: check to see if this is faster, if not revert
      return prisma.nft.count({
        where: {
          masterEditionMint: nft.masterEditionMint,
        },
      });
    }
    case NftKind.Generative:
    case NftKind.OneOfOne:
      return null;
    default:
      return assertUnreachable(nftKind);
  }
}

export default numberOfStandardEditionsMintedResolver;
