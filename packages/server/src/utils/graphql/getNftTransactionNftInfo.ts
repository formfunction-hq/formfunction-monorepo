import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertNftTransactionType from "src/types/convert/ConvertNftTransactionType";
import Typename from "src/types/enums/Typename";
import { NftTransactionNftInfo } from "src/__generated__/generated";

export default function getNftTransactionNftInfo(
  nft: Maybe<ConvertNftTransactionType["Nft"]>
): NftTransactionNftInfo {
  return {
    __typename: Typename.NftTransactionNftInfo as const,
    assetHeight: nft?.NftMetadata.assetHeight,
    assetWidth: nft?.NftMetadata.assetWidth,
    edition: nft?.edition,
    maxSupply: nft?.maxSupply,
    maxSupplyOfMasterEdition: nft?.MasterEditionNft?.maxSupply,
    mint: nft?.mint ?? "",
    name: nft?.NftMetadata.name ?? "",
  };
}
