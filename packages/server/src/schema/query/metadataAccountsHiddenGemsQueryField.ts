import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import metadataAccountsHiddenGemsResolver from "src/resolvers/query/metadataAccountsHiddenGemsResolver";
import MetadataAccountsHiddenGemsResponseGqlType from "src/schema/object/response/metadataAccountsHiddenGemsResponseGqlType";
import MyContext from "src/types/MyContext";
import { MetadataAccountsHiddenGemsResponse } from "src/__generated__/generated";

const metadataAccountsHiddenGemsQueryField: GraphQLFieldConfig<unknown, any> = {
  async resolve(
    _source,
    context: MyContext
  ): Promise<MetadataAccountsHiddenGemsResponse> {
    return logErrorsForResolver(context.req, () =>
      metadataAccountsHiddenGemsResolver()
    );
  },
  type: MetadataAccountsHiddenGemsResponseGqlType,
};

export default metadataAccountsHiddenGemsQueryField;
