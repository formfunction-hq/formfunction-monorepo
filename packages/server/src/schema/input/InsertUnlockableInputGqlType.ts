import { GraphQLInputObjectType } from "graphql";
import AssetInputGqlType from "src/schema/input/AssetInputGqlType";
import UnlockableInputGqlType from "src/schema/input/UnlockableInputGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const InsertUnlockableInputGqlType = new GraphQLInputObjectType({
  fields: {
    asset: { type: gqlNonNull(AssetInputGqlType) },
    unlockable: { type: gqlNonNull(UnlockableInputGqlType) },
  },
  name: Typename.InsertUnlockableInput,
});

export default InsertUnlockableInputGqlType;
