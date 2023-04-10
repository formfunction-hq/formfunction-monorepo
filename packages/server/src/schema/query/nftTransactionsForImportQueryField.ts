import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import nftTransactionsForImportResolver from "src/resolvers/query/nftTransactionsForImportResolver";
import NftTransactionsForImportInputGqlType from "src/schema/input/NftTransactionsForImportInputGqlType";
import NftTransactionsForImportResponseGqlType from "src/schema/object/response/NftTransactionsForImportResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  NftTransactionsForImportInput,
  NftTransactionsForImportResponse,
} from "src/__generated__/generated";

const nftTransactionsForImportQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(NftTransactionsForImportInputGqlType),
    },
  },
  description:
    "Fetches the list of transactions that will be associated with an NFT once it is imported. " +
    "Used so we can display a preview of these transactions to users",
  async resolve(
    _source,
    { input }: { input?: NftTransactionsForImportInput },
    context: MyContext
  ): Promise<NftTransactionsForImportResponse> {
    return logErrorsForResolver(context.req, () =>
      nftTransactionsForImportResolver(context, input!)
    );
  },
  type: gqlNonNull(NftTransactionsForImportResponseGqlType),
};

export default nftTransactionsForImportQueryField;
