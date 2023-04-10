import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import unlockableWinnerUserEmailResolver from "src/resolvers/query/nested/unlockable-winner/unlockableWinnerUserEmailResolver";
import UserGqlType from "src/schema/object/UserGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  UnlockableWinnerExpress,
  UnlockableWinnerUserEmailInput,
} from "src/__generated__/generated";

const UnlockableWinnerUserEmailInputGqlType = new GraphQLInputObjectType({
  fields: {
    viewerId: {
      type: GraphQLID,
    },
  },
  name: Typename.UnlockableWinnerUserEmailInput,
});

const UnlockableWinnerGqlType = new GraphQLObjectType({
  fields: {
    hasBuyerDismissedShareInfoCta: { type: gqlNonNull(GraphQLBoolean) },
    hasCreatorDismissedSeeInfoCta: { type: gqlNonNull(GraphQLBoolean) },
    hasUserDismissedPromptToShareInfo: {
      deprecationReason: "Renamed the field to hasBuyerDismissedShareInfoCta.",
      type: gqlNonNull(GraphQLBoolean),
    },
    id: { type: gqlNonNull(GraphQLID) },
    timeCreated: { type: gqlNonNull(TimestamptzScalarGqlType) },
    user: { type: gqlNonNull(UserGqlType) },
    userEmail: {
      args: {
        // TODO[@arcticmatt]: make input required once all clients have switched to passing up the input
        input: { type: UnlockableWinnerUserEmailInputGqlType },
      },
      description: "Only the unlockable creator or winner can view this field.",
      resolve: (
        source: UnlockableWinnerExpress,
        { input }: { input: MaybeUndef<UnlockableWinnerUserEmailInput> },
        context: MyContext
      ) => unlockableWinnerUserEmailResolver(context, source, input),
      type: GraphQLString,
    },
    userId: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.UnlockableWinner,
});

export default UnlockableWinnerGqlType;
