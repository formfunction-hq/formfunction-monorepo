import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import acceptCreatorInviteResolver from "src/resolvers/mutation/acceptCreatorInviteResolver";
import AcceptCreatorInviteInputGqlType from "src/schema/input/AcceptCreatorInviteInputGqlType";
import AcceptCreatorInviteResponseGqlType from "src/schema/object/response/AcceptCreatorInvitesResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  AcceptCreatorInviteInput,
  AcceptCreatorInviteResponse,
} from "src/__generated__/generated";

const acceptCreatorInviteMutationField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(AcceptCreatorInviteInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input: AcceptCreatorInviteInput },
    context: MyContext
  ): Promise<AcceptCreatorInviteResponse> {
    return logErrorsForResolver(context.req, () =>
      acceptCreatorInviteResolver(context, input)
    );
  },
  type: gqlNonNull(AcceptCreatorInviteResponseGqlType),
};

export default acceptCreatorInviteMutationField;
