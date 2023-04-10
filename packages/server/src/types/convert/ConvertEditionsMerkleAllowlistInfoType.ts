import { EditionsMerkleAllowlistInfo, Nft, NftListing } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

type ConvertEditionsMerkleAllowlistInfoType = EditionsMerkleAllowlistInfo & {
  Nft: Nft & {
    NftListing: Maybe<NftListing>;
  };
};

export default ConvertEditionsMerkleAllowlistInfoType;
