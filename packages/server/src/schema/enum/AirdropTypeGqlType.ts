import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

// Keep in sync with AirdropType DB enum
const AirdropTypeGqlType = new GraphQLEnumType({
  name: Typename.AirdropType,
  values: {
    Claim: {},
    Gift: {},
  },
});

export default AirdropTypeGqlType;
