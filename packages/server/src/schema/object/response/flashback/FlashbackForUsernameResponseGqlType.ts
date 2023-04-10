import { GraphQLObjectType } from "graphql";
import FlashbackArtistStatsGqlType from "src/schema/object/flashback/FlashbackArtistStatsGqlType";
import FlashbackCollectorStatsGqlType from "src/schema/object/flashback/FlashbackCollectorStatsGqlType";
import Typename from "src/types/enums/Typename";

const FlashbackForUsernameResponseGqlType = new GraphQLObjectType({
  fields: {
    artistStats: {
      description: "Null if viewer is not a user or if they are not an artist",
      type: FlashbackArtistStatsGqlType,
    },
    collectorStats: {
      description:
        "Null if viewer is not a user or if they have not collected any pieces",
      type: FlashbackCollectorStatsGqlType,
    },
  },
  name: Typename.FlashbackForUsernameResponse,
});

export default FlashbackForUsernameResponseGqlType;
