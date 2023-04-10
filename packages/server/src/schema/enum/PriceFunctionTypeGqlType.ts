import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

/**
 * IMPORTANT: keep values in sync with the PriceFunctionType DB table.
 */
const PriceFunctionTypeGqlType = new GraphQLEnumType({
  name: Typename.PriceFunctionType,
  values: {
    Constant: {},
    Linear: {},
    Minimum: {},
  },
});

export default PriceFunctionTypeGqlType;
