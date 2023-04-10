import { GraphQLObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import SpotlightsConnectionGqlType from "src/schema/object/pagination/SpotlightsConnectionGqlType";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import MyContext from "src/types/MyContext";
import { SpotlightsConnection } from "src/__generated__/generated";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import activeSpotlightsConnectionResolver from "src/resolvers/query/nested/spotlights/activeSpotlightsConnectionResolver";
import recentSpotlightsConnectionResolver from "src/resolvers/query/nested/spotlights/recentSpotlightsConnectionResolver";
import upcomingSpotlightsConnectionResolver from "src/resolvers/query/nested/spotlights/upcomingSpotlightsConnectionResolver";
import DEFAULT_CONNECTION_PARAMS from "src/constants/graphql/DefaultConnectionParams";

function getSpotlightsConnectionResolver(
  resolver: (
    context: MyContext,
    after: Maybe<string>,
    first: number
  ) => Promise<SpotlightsConnection>
) {
  return async (
    _source: any,
    {
      after,
      first,
    }: {
      after?: Maybe<string>;
      first?: number;
    },
    context: MyContext
  ): Promise<SpotlightsConnection> =>
    logErrorsForResolver(context.req, () =>
      resolver(context, after ?? null, first!)
    );
}

const SpotlightResponseGqlType = new GraphQLObjectType({
  fields: {
    activeSpotlights: {
      args: DEFAULT_CONNECTION_PARAMS,
      resolve: getSpotlightsConnectionResolver(
        activeSpotlightsConnectionResolver
      ),
      type: gqlNonNull(SpotlightsConnectionGqlType),
    },
    recentSpotlights: {
      args: DEFAULT_CONNECTION_PARAMS,
      description:
        "Connection for querying spotlights that have happened in the past",
      resolve: getSpotlightsConnectionResolver(
        recentSpotlightsConnectionResolver
      ),
      type: gqlNonNull(SpotlightsConnectionGqlType),
    },
    upcomingSpotlights: {
      args: DEFAULT_CONNECTION_PARAMS,
      description: "Connection for querying spotlights that are upcoming",
      resolve: getSpotlightsConnectionResolver(
        upcomingSpotlightsConnectionResolver
      ),
      type: gqlNonNull(SpotlightsConnectionGqlType),
    },
  },
  name: Typename.SpotlightResponse,
});

export default SpotlightResponseGqlType;
