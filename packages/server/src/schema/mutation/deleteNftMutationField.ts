import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import deleteNftResolver from "src/resolvers/mutation/deleteNftResolver";
import DeleteNftInputGqlType from "src/schema/input/DeleteNftInputGqlType";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import { DeleteNftInput, MetadataAccount } from "src/__generated__/generated";

const deleteNftMutationField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(DeleteNftInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input: DeleteNftInput },
    context: MyContext
  ): Promise<MetadataAccount> {
    return logErrorsForResolver(context.req, () =>
      deleteNftResolver(context, input)
    );
  },
  type: gqlNonNull(MetadataAccountGqlType),
};

export default deleteNftMutationField;
