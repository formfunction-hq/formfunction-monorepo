import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const SocialNetworkTypeGqlType = new GraphQLEnumType({
  name: Typename.SocialNetworkType,
  values: {
    Discord: {},
    Instagram: {},
    Twitter: {},
  },
});

export default SocialNetworkTypeGqlType;
