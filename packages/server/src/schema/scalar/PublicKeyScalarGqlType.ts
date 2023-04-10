import { GraphQLScalarType, Kind } from "graphql";
import Typename from "src/types/enums/Typename";

const PublicKeyScalarGqlType = new GraphQLScalarType({
  name: Typename.PublicKey,
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

export default PublicKeyScalarGqlType;
