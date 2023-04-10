import { GraphQLString } from "graphql";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

/**
 * NOTE: input typing is a bit wack because we support both of these page paths:
 * - /profile/series/series-slug
 * - /@username/series/series-slug
 *
 * In the former case, we know the user's ID
 * In the latter case, we know the user's username
 */
const SERIES_INPUT_FIELDS = {
  creatorId: {
    description:
      "Either one of creatorId or creatorUsername should be specified",
    type: GraphQLString,
  },
  creatorUsername: {
    description:
      "Either one of creatorId or creatorUsername should be specified",
    type: GraphQLString,
  },
  seriesSlug: {
    type: gqlNonNull(GraphQLString),
  },
};

export default SERIES_INPUT_FIELDS;
