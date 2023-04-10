import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const DismissUnlockableWinnerBuyerShareInfoCtaInputGqlType =
  new GraphQLInputObjectType({
    description:
      'Used to dismiss the "Share info" CTA the buyer sees in the UI.',
    fields: {
      unlockableId: { type: gqlNonNull(GraphQLID) },
    },
    name: Typename.DismissUnlockableWinnerBuyerShareInfoCtaInput,
  });

export default DismissUnlockableWinnerBuyerShareInfoCtaInputGqlType;
