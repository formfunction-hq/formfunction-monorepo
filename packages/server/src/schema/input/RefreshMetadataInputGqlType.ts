import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const RefreshMetadataInputGqlType = new GraphQLInputObjectType({
  fields: {
    mint: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.RefreshMetadataInput,
});

export default RefreshMetadataInputGqlType;
