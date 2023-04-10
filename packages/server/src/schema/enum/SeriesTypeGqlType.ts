import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

// Keep in sync with SeriesType DB enum
const SeriesTypeGqlType = new GraphQLEnumType({
  name: Typename.SeriesType,
  values: {
    GenerativeMint: {},
    UserCurated: {},
  },
});

export default SeriesTypeGqlType;
