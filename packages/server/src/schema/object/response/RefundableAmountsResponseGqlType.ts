import { GraphQLObjectType } from "graphql";
import RefundableAmountGqlType from "src/schema/object/RefundableAmountGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const RefundableAmountsResponseGqlType = new GraphQLObjectType({
  fields: {
    amounts: { type: gqlNonNullListOfNonNull(RefundableAmountGqlType) },
  },
  name: Typename.RefundableAmountsResponse,
});

export default RefundableAmountsResponseGqlType;
