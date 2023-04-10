import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import NftOffChainMetadata from "types/NftOffChainMetadata";

// Not in use in our code
type NftMetadata = {
  metadata: Metadata;
  offChainMetadata: NftOffChainMetadata;
};

export default NftMetadata;
