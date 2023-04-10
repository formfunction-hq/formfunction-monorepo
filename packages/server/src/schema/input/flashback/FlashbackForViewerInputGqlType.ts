import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const FlashbackForViewerInputGqlType = new GraphQLInputObjectType({
  fields: {
    viewerId: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.FlashbackForViewerInput,
});

export default FlashbackForViewerInputGqlType;
