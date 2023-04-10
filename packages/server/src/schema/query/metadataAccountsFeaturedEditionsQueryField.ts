import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import metadataAccountsFeaturedEditionsResolver from "src/resolvers/query/metadataAccountsFeaturedEditionsResolver";
import MetadataAccountsFeaturedEditionsResponseGqlType from "src/schema/object/response/MetadataAccountsFeaturedEditionsResponseGqlType";
import MyContext from "src/types/MyContext";
import { MetadataAccountsFeaturedEditionsResponse } from "src/__generated__/generated";

const metadataAccountsFeaturedEditionsQueryField: GraphQLFieldConfig<
  unknown,
  any
> = {
  async resolve(
    _source,
    context: MyContext
  ): Promise<MetadataAccountsFeaturedEditionsResponse> {
    return logErrorsForResolver(context.req, () =>
      metadataAccountsFeaturedEditionsResolver()
    );
  },
  type: MetadataAccountsFeaturedEditionsResponseGqlType,
};

export default metadataAccountsFeaturedEditionsQueryField;
