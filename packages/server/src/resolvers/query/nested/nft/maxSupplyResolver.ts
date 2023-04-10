import { NftStatusExpress_Enum } from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getNftKind from "formfn-shared/dist/utils/nft/getNftKind";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import getPrisma from "src/utils/prisma/getPrisma";
import NftSourceType from "src/types/graphql-source/NftSourceType";

export default async function maxSupplyResolver(
  nft: NftSourceType
): Promise<Maybe<number>> {
  const maxSupplyOnchain = nft.maxSupplyOnchain ?? null;
  const maxSupplyOfMasterEdition = nft.maxSupplyOfMasterEdition ?? null;
  const { status } = nft;
  const nftKind = getNftKind(
    nft.isMasterEdition,
    nft.isPnft,
    maxSupplyOnchain,
    maxSupplyOfMasterEdition,
    nft.CandyMachine != null
  );
  const prisma = getPrisma();

  switch (nftKind) {
    case NftKind.MasterEditionWithNonzeroSupply: {
      // If the user stops minting, then we want to return the number of standard
      // editions that have been minted as maxSupply.
      //
      // Note that this diverges from what's on-chain/stored in our DB. But this way,
      // in our product, we'll show something like Edition #1/7, instead of Edition #1/10
      // (the latter doesn't make sense once minting has stopped).
      if (status !== NftStatusExpress_Enum.OwnedStoppedMintingForEditions) {
        return maxSupplyOnchain;
      }

      // Use Prisma's fluent API so that queries get batched,
      // see https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance#solving-n1-in-graphql-with-findunique-and-prismas-dataloader
      // for more info
      const standardEditions = await prisma.nft
        .findUnique({
          where: {
            mint: nft.mint,
          },
        })
        .StandardEditionNft();
      return standardEditions?.length ?? 0;
    }
    case NftKind.StandardEditionPrintNonzeroSupply:
    case NftKind.MasterEditionWithUnlimitedSupply:
    case NftKind.PnftMasterEdition:
    case NftKind.Generative:
    case NftKind.OneOfOne:
    case NftKind.PnftStandardEdition:
    case NftKind.StandardEditionPrintUnlimitedSupply:
      return maxSupplyOnchain;
    default:
      return assertUnreachable(nftKind);
  }
}
