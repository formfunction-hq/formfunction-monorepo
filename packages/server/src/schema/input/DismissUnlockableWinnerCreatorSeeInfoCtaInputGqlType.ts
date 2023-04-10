import { GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const DismissUnlockableWinnerCreatorSeeInfoCtaInputGqlType =
  new GraphQLInputObjectType({
    description:
      'Used to dismiss the "See info" CTA the creator sees in the UI.',
    fields: {
      unlockableId: { type: gqlNonNull(GraphQLID) },
      unlockableWinnerUserId: { type: gqlNonNull(GraphQLString) },
    },
    name: Typename.DismissUnlockableWinnerCreatorSeeInfoCtaInput,
  });

export default DismissUnlockableWinnerCreatorSeeInfoCtaInputGqlType;
