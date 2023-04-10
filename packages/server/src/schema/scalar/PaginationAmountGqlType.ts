import Typename from "src/types/enums/Typename";
// @ts-ignore
import { GraphQLInputInt } from "graphql-input-number";

const PaginationAmountGqlType = GraphQLInputInt({
  description: "Enforces a maximum number of items that can be queried for",
  max: 750,
  min: 0,
  name: Typename.PaginationAmount,
});

export default PaginationAmountGqlType;
