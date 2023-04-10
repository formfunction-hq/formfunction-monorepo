import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import refreshMetadataResolver from "src/resolvers/mutation/refreshMetadataResolver";
import RefreshMetadataInputGqlType from "src/schema/input/RefreshMetadataInputGqlType";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  MetadataAccount,
  RefreshMetadataInput,
} from "src/__generated__/generated";

const refreshMetadataMutationField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(RefreshMetadataInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input?: RefreshMetadataInput },
    context: MyContext
  ): Promise<MetadataAccount> {
    return logErrorsForResolver(context.req, () =>
      refreshMetadataResolver(context, input!)
    );
  },
  type: gqlNonNull(MetadataAccountGqlType),
};

export default refreshMetadataMutationField;
