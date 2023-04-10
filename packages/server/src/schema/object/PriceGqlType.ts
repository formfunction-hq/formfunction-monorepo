import { GraphQLObjectType } from "graphql";
import CurrencyGqlType from "src/schema/object/CurrencyGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const PriceGqlType = new GraphQLObjectType({
  fields: {
    amount: { type: gqlNonNull(BigintScalarGqlType) },
    currencyInfo: { type: gqlNonNull(CurrencyGqlType) },
  },
  name: Typename.Price,
});

export default PriceGqlType;
