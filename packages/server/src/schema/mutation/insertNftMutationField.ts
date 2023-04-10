import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import insertNftResolver from "src/resolvers/mutation/insertNftResolver";
import InsertNftInputGqlType from "src/schema/input/InsertNftInputGqlType";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import { InsertNftInput, MetadataAccount } from "src/__generated__/generated";

const insertNftMutationField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(InsertNftInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input?: InsertNftInput },
    context: MyContext
  ): Promise<MetadataAccount> {
    return logErrorsForResolver(context.req, () => insertNftResolver(input!));
  },
  type: gqlNonNull(MetadataAccountGqlType),
};

export default insertNftMutationField;
