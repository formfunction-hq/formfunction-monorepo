import { GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import PostVisibilityGqlType from "src/schema/enum/PostVisibilityGqlType";
import AssetInputGqlType from "src/schema/input/AssetInputGqlType";
import Typename from "src/types/enums/Typename";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CreatePostBaseInputGqlType = new GraphQLInputObjectType({
  fields: {
    assets: {
      type: gqlListOfNonNull(AssetInputGqlType),
    },
    body: { type: GraphQLString },
    link: { type: GraphQLString },
    title: { type: gqlNonNull(GraphQLString) },
    visibility: { type: gqlNonNull(PostVisibilityGqlType) },
    visibilityFundingTierIds: { type: gqlListOfNonNull(GraphQLID) },
  },
  name: Typename.CreatePostBaseInput,
});

export default CreatePostBaseInputGqlType;
