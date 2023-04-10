import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const ExploreExtraGqlType = new GraphQLEnumType({
  name: Typename.ExploreExtra,
  values: {
    HasPnft: {},
    HasUnlockable: {},
  },
});

export default ExploreExtraGqlType;
