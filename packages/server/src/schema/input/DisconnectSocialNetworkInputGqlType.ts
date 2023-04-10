import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import SocialNetworkTypeGqlType from "src/schema/enum/SocialNetworkTypeGqlType";

const DisconnectSocialNetworkInputGqlType = new GraphQLInputObjectType({
  fields: {
    socialNetworkType: { type: gqlNonNull(SocialNetworkTypeGqlType) },
    userId: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.DisconnectSocialNetworkInput,
});

export default DisconnectSocialNetworkInputGqlType;
