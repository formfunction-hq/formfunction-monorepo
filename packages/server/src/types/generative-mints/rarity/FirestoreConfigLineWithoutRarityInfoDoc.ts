import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import NftAttributes from "src/types/NftAttributes";

type FirestoreConfigLineWithoutRarityInfoDoc = {
  assetArweaveTxid: string;
  assetHeight: MaybeUndef<number>;
  assetWidth: MaybeUndef<number>;
  attributes: NftAttributes;
  contentType: string;
  creatorsMetadataString: string;
  description: string;
  image: string;
  index: number;
  maxSupply: number;
  metadataArweaveTxid: string;
  name: string;
  sellerFeeBasisPoints: number;
};

export default FirestoreConfigLineWithoutRarityInfoDoc;
