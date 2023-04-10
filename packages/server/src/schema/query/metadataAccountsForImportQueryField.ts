import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import metadataAccountsForImportResolver from "src/resolvers/query/metadataAccountsForImportResolver";
import MetadataAccountsForImportInputGqlType from "src/schema/input/MetadataAccountsForImportInputGqlType";
import MetadataAccountsForImportResponseGqlType from "src/schema/object/response/MetadataAccountsForImportResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  MetadataAccountsForImportInput,
  MetadataAccountsForImportResponse,
} from "src/__generated__/generated";

const metadataAccountsForImportQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(MetadataAccountsForImportInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input?: MetadataAccountsForImportInput },
    context: MyContext
  ): Promise<MetadataAccountsForImportResponse> {
    return logErrorsForResolver(context.req, () =>
      metadataAccountsForImportResolver(context, input!)
    );
  },
  type: MetadataAccountsForImportResponseGqlType,
};

export default metadataAccountsForImportQueryField;
