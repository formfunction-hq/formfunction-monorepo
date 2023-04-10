import { GraphQLObjectType } from "graphql";
import HolderGqlType from "src/schema/object/holder/HolderGqlType";
import SeriesGqlType from "src/schema/object/SeriesGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const SeriesHoldersGqlType = new GraphQLObjectType({
  fields: {
    holders: { type: gqlNonNullListOfNonNull(HolderGqlType) },
    series: { type: gqlNonNull(SeriesGqlType) },
  },
  name: Typename.SeriesHolders,
});

export default SeriesHoldersGqlType;
