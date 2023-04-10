import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import metadataAccountsFeaturedResolver from "src/resolvers/query/metadataAccountsFeaturedResolver";
import MetadataAccountsFeaturedInputGqlType from "src/schema/input/MetadataAccountsFeaturedInputGqlType";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import {
  MetadataAccount,
  MetadataAccountsFeaturedInput,
} from "src/__generated__/generated";

const metadataAccountsFeaturedQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: { type: MetadataAccountsFeaturedInputGqlType },
  },
  async resolve(
    _source,
    { input }: { input?: MetadataAccountsFeaturedInput },
    context: MyContext
  ): Promise<Array<MetadataAccount>> {
    return logErrorsForResolver(context.req, () =>
      metadataAccountsFeaturedResolver(input)
    );
  },
  type: gqlNonNullListOfNonNull(MetadataAccountGqlType),
};

export default metadataAccountsFeaturedQueryField;
