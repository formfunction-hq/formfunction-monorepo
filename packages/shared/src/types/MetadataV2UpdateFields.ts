import {
  Collection,
  Creator,
  Uses,
} from "@metaplex-foundation/mpl-token-metadata";

type MetadataV2UpdateFields = {
  collection?: Collection | null;
  creators?: Array<Creator> | null;
  name?: string;
  sellerFeeBasisPoints?: number;
  symbol?: string;
  uri?: string;
  uses?: Uses | null;
};

export default MetadataV2UpdateFields;
