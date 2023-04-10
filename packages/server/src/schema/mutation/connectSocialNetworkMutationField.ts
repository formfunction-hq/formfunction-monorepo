import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import connectSocialNetworkResolver from "src/resolvers/mutation/connectSocialNetworkResolver";
import ConnectSocialNetworkInputGqlType from "src/schema/input/ConnectSocialNetworkInputGqlType";
import SocialNetworkGqlType from "src/schema/object/SocialNetworkGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  ConnectSocialNetworkInput,
  SocialNetwork,
} from "src/__generated__/generated";

const connectSocialNetworkMutationField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(ConnectSocialNetworkInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input: ConnectSocialNetworkInput },
    context: MyContext
  ): Promise<SocialNetwork> {
    return logErrorsForResolver(context.req, () =>
      connectSocialNetworkResolver(context, input)
    );
  },
  type: gqlNonNull(SocialNetworkGqlType),
};

export default connectSocialNetworkMutationField;
