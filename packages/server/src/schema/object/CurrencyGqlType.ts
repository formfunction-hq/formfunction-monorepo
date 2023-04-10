import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import CurrencyNameGqlType from "src/schema/enum/CurrencyNameGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CurrencyGqlType = new GraphQLObjectType({
  fields: {
    decimals: { type: gqlNonNull(GraphQLInt) },
    iconSrc: { type: GraphQLString },
    id: { type: gqlNonNull(GraphQLID) },
    mint: { type: gqlNonNull(GraphQLString) },
    name: { type: gqlNonNull(CurrencyNameGqlType) },
    shortSymbol: { type: GraphQLString },
    symbol: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.Currency,
});

export default CurrencyGqlType;
