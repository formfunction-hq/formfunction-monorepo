import { GraphQLScalarType, Kind } from "graphql";
import Typename from "src/types/enums/Typename";

const UuidScalarGqlType = new GraphQLScalarType({
  name: Typename.Uuid,
  parseLiteral(ast) {
    // eslint-disable-next-line react/destructuring-assignment
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  },
  parseValue(value) {
    return value;
  },
  serialize(value) {
    return value;
  },
});

export default UuidScalarGqlType;
