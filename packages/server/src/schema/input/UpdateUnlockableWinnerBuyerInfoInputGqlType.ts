import { GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UpdateUnlockableWinnerBuyerInfoInputGqlType = new GraphQLInputObjectType({
  description:
    "Used to update the UnlockableWinner buyer info for the creator to send them the unlockable.",
  fields: {
    unlockableId: { type: gqlNonNull(GraphQLID) },
    userEmail: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.UpdateUnlockableWinnerBuyerInfoInput,
});

export default UpdateUnlockableWinnerBuyerInfoInputGqlType;
