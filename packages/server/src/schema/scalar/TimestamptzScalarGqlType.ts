import { GraphQLScalarType, Kind } from "graphql";
import Typename from "src/types/enums/Typename";
import dayjs from "src/utils/dates/dayjsex";

const TimestamptzScalarGqlType = new GraphQLScalarType({
  name: Typename.Timestamptz,
  parseLiteral(ast) {
    // eslint-disable-next-line react/destructuring-assignment
    if (ast.kind === Kind.STRING) {
      return dayjs(ast.value).toDate();
    }
    return null;
  },
  parseValue(value) {
    return dayjs(value as any).toDate();
  },
  serialize(value) {
    return dayjs(value as any)
      .utc()
      .format()
      .toString();
  },
});

export default TimestamptzScalarGqlType;
