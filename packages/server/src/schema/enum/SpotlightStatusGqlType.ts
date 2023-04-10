import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const SpotlightStatusGqlType = new GraphQLEnumType({
  name: Typename.SpotlightStatus,
  values: {
    Available: {},
    Ended: {},
    Override: {
      description:
        "To be used when a value is set in the DB to override this field",
    },
    Sold: {},
    SoldOut: {},
  },
});

export default SpotlightStatusGqlType;
