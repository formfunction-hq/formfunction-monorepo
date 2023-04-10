import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const ExploreMarketGqlType = new GraphQLEnumType({
  name: Typename.ExploreMarket,
  values: {
    Primary: {},
    Secondary: {},
  },
});

export default ExploreMarketGqlType;
