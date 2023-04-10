import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import sendCreatorInvitesResolver from "src/resolvers/mutation/sendCreatorInvitesResolver";
import SendCreatorInvitesInputGqlType from "src/schema/input/SendCreatorInvitesInputGqlType";
import SendCreatorInvitesResponseGqlType from "src/schema/object/response/SendCreatorInvitesResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  SendCreatorInvitesInput,
  SendCreatorInvitesResponse,
} from "src/__generated__/generated";

const sendCreatorInvitesMutationField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(SendCreatorInvitesInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input: SendCreatorInvitesInput },
    context: MyContext
  ): Promise<SendCreatorInvitesResponse> {
    return logErrorsForResolver(context.req, () =>
      sendCreatorInvitesResolver(context, input)
    );
  },
  type: gqlNonNull(SendCreatorInvitesResponseGqlType),
};

export default sendCreatorInvitesMutationField;
