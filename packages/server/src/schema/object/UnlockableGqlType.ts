import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import UnlockableCategoryGqlType from "src/schema/enum/UnlockableCategoryGqlType";
import AssetGqlType from "src/schema/object/AssetGqlType";
import PriceGqlType from "src/schema/object/PriceGqlType";
import UnlockableWinnerGqlType from "src/schema/object/UnlockableWinnerGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UnlockableGqlType = new GraphQLObjectType({
  fields: {
    activationPrice: { type: PriceGqlType },
    activationPriceInLamports: { type: BigintScalarGqlType },
    asset: { type: gqlNonNull(AssetGqlType) },
    category: { type: gqlNonNull(UnlockableCategoryGqlType) },
    description: { type: GraphQLString },
    id: { type: gqlNonNull(GraphQLID) },
    name: { type: gqlNonNull(GraphQLString) },
    timeCreated: { type: gqlNonNull(TimestamptzScalarGqlType) },
    unlockableWinners: { type: gqlListOfNonNull(UnlockableWinnerGqlType) },
  },
  name: Typename.Unlockable,
});

export default UnlockableGqlType;
