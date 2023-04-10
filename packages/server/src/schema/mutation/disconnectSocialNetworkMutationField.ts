import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import disconnectSocialNetworkResolver from "src/resolvers/mutation/disconnectSocialNetworkResolver";
import DisconnectSocialNetworkInputGqlType from "src/schema/input/DisconnectSocialNetworkInputGqlType";
import SocialNetworkGqlType from "src/schema/object/SocialNetworkGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  DisconnectSocialNetworkInput,
  SocialNetwork,
} from "src/__generated__/generated";

const disconnectSocialNetworkMutationField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(DisconnectSocialNetworkInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input: DisconnectSocialNetworkInput },
    context: MyContext
  ): Promise<SocialNetwork> {
    return logErrorsForResolver(context.req, () =>
      disconnectSocialNetworkResolver(context, input)
    );
  },
  type: gqlNonNull(SocialNetworkGqlType),
};

export default disconnectSocialNetworkMutationField;
