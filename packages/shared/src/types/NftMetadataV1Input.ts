// Keep in sync with useUploadNftToArweaveMutation.graphql.ts

type NftMetadataV1AttributeInput = {
  trait_type: string;
  value: string;
};

type NftMetadataV1CollectionInput = {
  family?: string | null;
  name?: string | null;
};

type NftMetadataV1PropertiesInput = {
  category?: string | null;
  creators: ReadonlyArray<NftMetadataV1CreatorPropertyInput>;
  files?: ReadonlyArray<NftMetadataV1FilePropertyInput> | null;
};

type NftMetadataV1CreatorPropertyInput = {
  address: string;
  share: number;
  verified: boolean;
};

type NftMetadataV1FilePropertyInput = {
  cdn?: boolean | null;
  type: string;
  uri: string;
};

type NftMetadataV1Input = {
  animation_url?: string | null;
  attributes?: ReadonlyArray<NftMetadataV1AttributeInput> | null;
  collection?: NftMetadataV1CollectionInput | null;
  description: string;
  external_url?: string | null;
  name: string;
  properties: NftMetadataV1PropertiesInput;
  seller_fee_basis_points: number;
  symbol: string;
};

export default NftMetadataV1Input;
