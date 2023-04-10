import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const ExploreAvailabilityGqlType = new GraphQLEnumType({
  name: Typename.ExploreAvailability,
  values: {
    All: {},
    Available: {},
    OnAuction: {},
    Sold: {},
  },
});

export default ExploreAvailabilityGqlType;
