import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { GraphQLObjectType } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import seriesStatsResolver from "src/resolvers/query/nested/series/seriesStatsResolver";
import SeriesStatsInputGqlType from "src/schema/input/series/SeriesStatsInputGqlType";
import SeriesStatsResponseGqlType from "src/schema/object/response/series/SeriesStatsResponseGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  SeriesStatsInput,
  SeriesStatsResponse,
} from "src/__generated__/generated";

const SeriesNamespaceResponseGqlType = new GraphQLObjectType({
  fields: {
    seriesStats: {
      args: {
        input: { type: gqlNonNull(SeriesStatsInputGqlType) },
      },
      async resolve(
        _source,
        {
          input,
        }: {
          input: SeriesStatsInput;
        },
        context: MyContext
      ): Promise<Maybe<SeriesStatsResponse>> {
        return logErrorsForResolver(context.req, () =>
          seriesStatsResolver(context, input)
        );
      },
      type: SeriesStatsResponseGqlType,
    },
  },
  name: Typename.SeriesNamespaceResponse,
});

export default SeriesNamespaceResponseGqlType;
