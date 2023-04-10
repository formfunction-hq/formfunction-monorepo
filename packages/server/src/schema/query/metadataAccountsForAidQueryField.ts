import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import metadataAccountsForAidResolver from "src/resolvers/query/metadataAccountsForAidResolver";
import MetadataAccountsForAidInputGqlType from "src/schema/input/MetadataAccountsForAidInputGqlType";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import {
  MetadataAccount,
  MetadataAccountsForAidInput,
} from "src/__generated__/generated";

const metadataAccountsForAidQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: { type: MetadataAccountsForAidInputGqlType },
  },
  async resolve(
    _source,
    { input }: { input?: MetadataAccountsForAidInput },
    context: MyContext
  ): Promise<Array<MetadataAccount>> {
    return logErrorsForResolver(context.req, () =>
      metadataAccountsForAidResolver(input)
    );
  },
  type: gqlNonNullListOfNonNull(MetadataAccountGqlType),
};

export default metadataAccountsForAidQueryField;
