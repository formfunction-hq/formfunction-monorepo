import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import isOwnerValidResolver from "src/resolvers/query/isOwnerValidResolver";
import IsOwnerValidInputGqlType from "src/schema/input/IsOwnerValidInputGqlType";
import IsOwnerValidResponseGqlType from "src/schema/object/response/IsOwnerValidResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  IsOwnerValidInput,
  IsOwnerValidResponse,
} from "src/__generated__/generated";

const isOwnerValidQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(IsOwnerValidInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input?: IsOwnerValidInput },
    context: MyContext
  ): Promise<IsOwnerValidResponse> {
    return logErrorsForResolver(context.req, () =>
      isOwnerValidResolver(input!)
    );
  },
  type: gqlNonNull(IsOwnerValidResponseGqlType),
};

export default isOwnerValidQueryField;
