import { GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import UnlockableCategoryGqlType from "src/schema/enum/UnlockableCategoryGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UnlockableInputGqlType = new GraphQLInputObjectType({
  fields: {
    activationPriceInLamports: { type: BigintScalarGqlType },
    category: { type: gqlNonNull(UnlockableCategoryGqlType) },
    description: { type: GraphQLString },
    id: { type: gqlNonNull(GraphQLID) },
    name: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.UnlockableInput,
});

export default UnlockableInputGqlType;
