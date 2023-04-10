import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const ExchangeRateCurrencyGqlType = new GraphQLEnumType({
  name: Typename.ExchangeRateCurrency,
  values: {
    SOL: {},
    USD: {},
    USDC: {},
  },
});

export default ExchangeRateCurrencyGqlType;
