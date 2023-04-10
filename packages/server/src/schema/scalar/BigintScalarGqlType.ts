import { GraphQLScalarType } from "graphql";
import Typename from "src/types/enums/Typename";

const BigintScalarGqlType = new GraphQLScalarType({
  name: Typename.Bigint,
  parseLiteral(ast) {
    // @ts-ignore
    return Number(ast.value);
  },
  parseValue(value) {
    return Number(value);
  },
  serialize(value) {
    return Number(value);
  },
});

export default BigintScalarGqlType;
