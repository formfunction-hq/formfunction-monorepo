import axios from "axios";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

// From https://docs.metaplex.com/programs/token-metadata/changelog/v1.0
type OffchainMetadata = {
  animation_url?: string;
  attributes: Array<{ trait_type: string; value: string }>;
  collection?: {
    family: string;
    name: string;
  };
  description: string;
  image: string;
  name: string;
  properties?: {
    category: string;
    creators: Array<{ address: string; share: number; verified: boolean }>;
    files: Array<{ type: string; uri: string }>;
  };
  seller_fee_basis_points: number;
  symbol: string;
};

export default async function fetchOffchainMetadata(
  uri: string
): Promise<Maybe<OffchainMetadata>> {
  try {
    const response = await axios(uri);
    return response.data;
  } catch {
    return null;
  }
}
