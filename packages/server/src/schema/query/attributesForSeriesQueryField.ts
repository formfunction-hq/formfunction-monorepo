import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  AttributesForSeriesInput,
  AttributesForSeriesResponse,
} from "src/__generated__/generated";
import AttributesForSeriesInputGqlType from "src/schema/input/AttributesForSeriesInputGqlType";
import AttributesForSeriesResponseGqlType from "src/schema/object/response/AttributesForSeriesResponseGqlType";
import attributesForSeriesResolver from "src/resolvers/query/attributesForSeriesResolver";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

const attributesForSeriesQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(AttributesForSeriesInputGqlType),
    },
  },
  description: "Returns all the attributes for an NFT series",
  async resolve(
    _source,
    { input }: { input: AttributesForSeriesInput },
    context: MyContext
  ): Promise<Maybe<AttributesForSeriesResponse>> {
    return logErrorsForResolver(context.req, () =>
      attributesForSeriesResolver(context, input)
    );
  },
  type: AttributesForSeriesResponseGqlType,
};

export default attributesForSeriesQueryField;
