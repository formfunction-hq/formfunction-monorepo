import { GraphQLBoolean, GraphQLInputObjectType } from "graphql";
import ExchangeRateCurrencyGqlType from "src/schema/enum/ExchangeRateCurrencyGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ExchangeRateInputGqlType = new GraphQLInputObjectType({
  fields: {
    baseCurrency: {
      description: "The currency we're exchanging from",
      type: gqlNonNull(ExchangeRateCurrencyGqlType),
    },
    exchangeCurrency: {
      description: "The currency we're exchanging to",
      type: gqlNonNull(ExchangeRateCurrencyGqlType),
    },
    forceUpdate: { defaultValue: false, type: GraphQLBoolean },
  },
  name: Typename.ExchangeRateInput,
});

export default ExchangeRateInputGqlType;
