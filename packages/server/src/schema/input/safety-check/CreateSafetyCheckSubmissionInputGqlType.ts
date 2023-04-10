import { GraphQLBoolean, GraphQLInputObjectType, GraphQLString } from "graphql";
import AssetInputGqlType from "src/schema/input/AssetInputGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CreateSafetyCheckSubmissionInputGqlType = new GraphQLInputObjectType({
  fields: {
    artProcess: { type: gqlNonNull(GraphQLString) },
    instagramName: { type: GraphQLString },
    isCopyrightVerified: { type: gqlNonNull(GraphQLBoolean) },
    processVideo: { type: AssetInputGqlType },
    websiteUrl: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.CreateSafetyCheckSubmissionInput,
});

export default CreateSafetyCheckSubmissionInputGqlType;
