import { GraphQLFloat, GraphQLObjectType } from "graphql";
import Typename from "src/types/enums/Typename";

const ExchangeRateResponseGqlType = new GraphQLObjectType({
  fields: {
    rate: { type: GraphQLFloat },
  },
  name: Typename.ExchangeRateResponse,
});

export default ExchangeRateResponseGqlType;
