import { GraphQLObjectType } from "graphql";
import SeriesHoldersGqlType from "src/schema/object/holder/SeriesHoldersGqlType";
import Typename from "src/types/enums/Typename";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";

const SeriesHoldersForUserResponseGqlType = new GraphQLObjectType({
  fields: {
    seriesHolders: {
      description: "Null if viewer is null",
      type: gqlListOfNonNull(SeriesHoldersGqlType),
    },
  },
  name: Typename.SeriesHoldersForUserResponse,
});

export default SeriesHoldersForUserResponseGqlType;
