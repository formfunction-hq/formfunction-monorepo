import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import insertPnftResolver from "src/resolvers/mutation/insertPnftResolver";
import InsertPnftInputGqlType from "src/schema/input/InsertPnftInputGqlType";
import InsertPnftResponseGqlType from "src/schema/object/response/InsertPnftResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  InsertPnftInput,
  InsertPnftResponse,
} from "src/__generated__/generated";

const insertPnftMutationField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(InsertPnftInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input: InsertPnftInput },
    context: MyContext
  ): Promise<InsertPnftResponse> {
    return logErrorsForResolver(context.req, () => insertPnftResolver(input));
  },
  type: gqlNonNull(InsertPnftResponseGqlType),
};

export default insertPnftMutationField;
