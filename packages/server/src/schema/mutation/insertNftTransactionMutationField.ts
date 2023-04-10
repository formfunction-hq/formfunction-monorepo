import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import insertNftTransactionResolver from "src/resolvers/mutation/insertNftTransactionResolver";
import InsertNftTransactionInputGqlType from "src/schema/input/InsertNftTransactionInputGqlType";
import InsertNftTransactionResponseGqlType from "src/schema/object/response/InsertNftTransactionResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  InsertNftTransactionInput,
  InsertNftTransactionResponse,
} from "src/__generated__/generated";

const insertNftTransactionMutationField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(InsertNftTransactionInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input?: InsertNftTransactionInput },
    context: MyContext
  ): Promise<InsertNftTransactionResponse> {
    return logErrorsForResolver(context.req, () =>
      insertNftTransactionResolver(context, input!)
    );
  },
  type: gqlNonNull(InsertNftTransactionResponseGqlType),
};

export default insertNftTransactionMutationField;
