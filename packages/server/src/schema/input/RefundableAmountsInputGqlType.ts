import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";

const RefundableAmountsInputGqlType = new GraphQLInputObjectType({
  fields: {
    userId: { type: GraphQLString },
  },
  name: Typename.RefundableAmountsInput,
});

export default RefundableAmountsInputGqlType;
