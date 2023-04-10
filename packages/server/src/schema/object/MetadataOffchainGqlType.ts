import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  MetadataOffchain,
  MetadataOffchainImageInput,
} from "src/__generated__/generated";
import MetadataOffchainImageInputGqlType from "src/schema/input/MetadataOffchainImageInputGqlType";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import convertNftMetadataImageToUrl from "src/utils/nft/convertNftMetadataImageToUrl";

function resolveImage(
  offchain: MetadataOffchain,
  { input }: { input?: Maybe<MetadataOffchainImageInput> }
): string {
  return convertNftMetadataImageToUrl(
    offchain.image,
    offchain._isOffPlatform,
    offchain._contentType,
    input
  );
}

// TODO: this is incomplete, fill out
const MetadataOffchainGqlType = new GraphQLObjectType({
  fields: {
    _contentType: { type: gqlNonNull(GraphQLString) },
    _isOffPlatform: { type: gqlNonNull(GraphQLBoolean) },
    _mint: { type: gqlNonNull(GraphQLString) },
    description: { type: GraphQLString },
    image: {
      args: {
        input: {
          type: MetadataOffchainImageInputGqlType,
        },
      },
      resolve: resolveImage,
      type: gqlNonNull(GraphQLString),
    },
  },
  name: Typename.MetadataOffchain,
});

export default MetadataOffchainGqlType;
