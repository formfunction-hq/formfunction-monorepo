import { GraphQLObjectType } from "graphql";
import UnlockableWinnerGqlType from "src/schema/object/UnlockableWinnerGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UpdateUnlockableWinnerResponseGqlType = new GraphQLObjectType({
  fields: {
    unlockableWinner: { type: gqlNonNull(UnlockableWinnerGqlType) },
  },
  name: Typename.UpdateUnlockableWinnerResponse,
});

export default UpdateUnlockableWinnerResponseGqlType;
