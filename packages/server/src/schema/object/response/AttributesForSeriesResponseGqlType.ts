import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

// NOTE: may want to add rarity info here later
const AttributesForSeriesTraitGqlType = new GraphQLObjectType({
  fields: {
    count: {
      description: "How many times this trait appears in the series",
      type: gqlNonNull(GraphQLInt),
    },
    traitName: { type: gqlNonNull(GraphQLString) },
    traitValue: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.AttributesForSeriesTrait,
});

const AttributesForSeriesResponseGqlType = new GraphQLObjectType({
  fields: {
    traits: { type: gqlNonNullListOfNonNull(AttributesForSeriesTraitGqlType) },
  },
  name: Typename.AttributesForSeriesResponse,
});

export default AttributesForSeriesResponseGqlType;
