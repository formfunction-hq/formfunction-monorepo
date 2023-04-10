import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";

const UpdateSeriesIdForNftsInputGqlType = new GraphQLInputObjectType({
  fields: {
    mintsToAdd: { type: gqlListOfNonNull(GraphQLString) },
    mintsToRemove: { type: gqlListOfNonNull(GraphQLString) },
    order: { type: gqlListOfNonNull(GraphQLString) },
    seriesId: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.UpdateSeriesIdForNftsInput,
});

export default UpdateSeriesIdForNftsInputGqlType;
