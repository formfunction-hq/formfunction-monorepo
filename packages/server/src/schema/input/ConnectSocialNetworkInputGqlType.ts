import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import SocialNetworkTypeGqlType from "src/schema/enum/SocialNetworkTypeGqlType";
import RedirectLocationGqlType from "src/schema/enum/RedirectLocationGqlType";

const ConnectSocialNetworkInputGqlType = new GraphQLInputObjectType({
  fields: {
    redirectLocation: { type: RedirectLocationGqlType },
    socialNetworkType: { type: gqlNonNull(SocialNetworkTypeGqlType) },
    userId: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.ConnectSocialNetworkInput,
});

export default ConnectSocialNetworkInputGqlType;
