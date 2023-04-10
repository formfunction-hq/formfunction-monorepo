import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import metadataAccountsResolver from "src/resolvers/query/metadataAccountsResolver";
import MetadataAccountsInputGqlType from "src/schema/input/MetadataAccountsInputGqlType";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  MetadataAccount,
  MetadataAccountsInput,
} from "src/__generated__/generated";

const metadataAccountsQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(MetadataAccountsInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input?: MetadataAccountsInput },
    context: MyContext
  ): Promise<Array<MetadataAccount>> {
    return logErrorsForResolver(context.req, () =>
      metadataAccountsResolver(context, input!)
    );
  },
  type: gqlNonNullListOfNonNull(MetadataAccountGqlType),
};

export default metadataAccountsQueryField;
