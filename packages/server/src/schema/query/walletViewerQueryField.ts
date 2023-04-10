import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import walletViewerResolver from "src/resolvers/query/walletViewerResolver";
import WalletViewerInputGqlType from "src/schema/input/WalletViewerInputGqlType";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  MetadataAccount,
  WalletViewerInput,
} from "src/__generated__/generated";

const walletViewerQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(WalletViewerInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input?: WalletViewerInput },
    context: MyContext
  ): Promise<Array<MetadataAccount>> {
    return logErrorsForResolver(context.req, () =>
      walletViewerResolver(context, input!)
    );
  },
  type: gqlNonNullListOfNonNull(MetadataAccountGqlType),
};

export default walletViewerQueryField;
