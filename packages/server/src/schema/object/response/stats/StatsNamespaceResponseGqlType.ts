import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { GraphQLObjectType } from "graphql";
import DEFAULT_CONNECTION_PARAMS from "src/constants/graphql/DefaultConnectionParams";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import topCollectorStatsConnectionResolver from "src/resolvers/query/nested/stats/topCollectorStatsConnectionResolver";
import topCreatorStatsConnectionResolver from "src/resolvers/query/nested/stats/topCreatorStatsConnectionResolver";
import TopCollectorStatsInputGqlType from "src/schema/input/TopCollectorStatsInputGqlType";
import TopCreatorStatsInputGqlType from "src/schema/input/TopCreatorStatsInputGqlType";
import CollectorStatsConnectionGqlType from "src/schema/object/pagination/CollectorStatsConnectionGqlType";
import CreatorStatsConnectionGqlType from "src/schema/object/pagination/CreatorStatsConnectionGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CollectorStatsConnection,
  CreatorStatsConnection,
  TopCollectorStatsInput,
  TopCreatorStatsInput,
} from "src/__generated__/generated";

const StatsNamespaceResponseGqlType = new GraphQLObjectType({
  fields: {
    topCollectorStats: {
      args: {
        ...DEFAULT_CONNECTION_PARAMS,
        input: { type: TopCollectorStatsInputGqlType },
      },
      async resolve(
        _source,
        {
          after,
          first,
          input,
        }: {
          after?: Maybe<string>;
          first: number;
          input: TopCollectorStatsInput;
        },
        context: MyContext
      ): Promise<CollectorStatsConnection> {
        return logErrorsForResolver(context.req, () =>
          topCollectorStatsConnectionResolver(
            context,
            after ?? null,
            first,
            input
          )
        );
      },
      type: gqlNonNull(CollectorStatsConnectionGqlType),
    },
    topCreatorStats: {
      args: {
        ...DEFAULT_CONNECTION_PARAMS,
        input: { type: TopCreatorStatsInputGqlType },
      },
      async resolve(
        _source,
        {
          after,
          first,
          input,
        }: {
          after?: Maybe<string>;
          first: number;
          input: TopCreatorStatsInput;
        },
        context: MyContext
      ): Promise<CreatorStatsConnection> {
        return logErrorsForResolver(context.req, () =>
          topCreatorStatsConnectionResolver(
            context,
            after ?? null,
            first,
            input
          )
        );
      },
      type: gqlNonNull(CreatorStatsConnectionGqlType),
    },
  },
  name: Typename.StatsNamespaceResponse,
});

export default StatsNamespaceResponseGqlType;
