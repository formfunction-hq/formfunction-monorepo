import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

// NOTE: Keep in sync with DB values
const SpotlightHeroUnitLayoutGqlType = new GraphQLEnumType({
  name: Typename.SpotlightHeroUnitLayout,
  values: {
    Standard: {},
    TwoColumnSquareImage: {},
  },
});

export default SpotlightHeroUnitLayoutGqlType;
