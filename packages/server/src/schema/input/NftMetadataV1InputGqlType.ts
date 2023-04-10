/**
 * GraphQL types based on Metaplex's NFT Metadata v1.0.0 standard
 * See https://docs.metaplex.com/token-metadata/v1.0.0/nft-standard
 * for more info.
 */
import {
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullList from "src/utils/graphql/gqlNonNullList";
import gqlList from "src/utils/graphql/gqlList";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";

const NftMetadataV1AttributeInput = new GraphQLInputObjectType({
  fields: {
    trait_type: { type: gqlNonNull(GraphQLString) },
    value: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.NftMetadataV1AttributeInput,
});

const NftMetadataV1CollectionInput = new GraphQLInputObjectType({
  fields: {
    family: { type: GraphQLString },
    name: { type: GraphQLString },
  },
  name: Typename.NftMetadataV1CollectionInput,
});

const NftMetadataV1CreatorPropertyInput = new GraphQLInputObjectType({
  fields: {
    address: { type: gqlNonNull(GraphQLString) },
    share: { type: gqlNonNull(GraphQLInt) },
    verified: { type: gqlNonNull(GraphQLBoolean) },
  },
  name: Typename.NftMetadataV1CreatorPropertyInput,
});

const NftMetadataV1FilePropertyInput = new GraphQLInputObjectType({
  fields: {
    cdn: { type: GraphQLBoolean },
    type: { type: gqlNonNull(GraphQLString) },
    uri: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.NftMetadataV1FilePropertyInput,
});

const NftMetadataV1PropertiesInput = new GraphQLInputObjectType({
  fields: {
    category: { type: GraphQLString },
    creators: {
      type: gqlNonNullList(gqlNonNull(NftMetadataV1CreatorPropertyInput)),
    },
    files: { type: gqlList(gqlNonNull(NftMetadataV1FilePropertyInput)) },
  },
  name: Typename.NftMetadataV1PropertiesInput,
});

const NftMetadataV1InputGqlType = new GraphQLInputObjectType({
  fields: {
    animation_url: { type: GraphQLString },
    attributes: { type: gqlListOfNonNull(NftMetadataV1AttributeInput) },
    collection: { type: NftMetadataV1CollectionInput },
    description: { type: gqlNonNull(GraphQLString) },
    external_url: { type: GraphQLString },
    name: { type: gqlNonNull(GraphQLString) },
    properties: { type: gqlNonNull(NftMetadataV1PropertiesInput) },
    seller_fee_basis_points: { type: gqlNonNull(GraphQLInt) },
    symbol: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.NftMetadataV1Input,
});

export default NftMetadataV1InputGqlType;
