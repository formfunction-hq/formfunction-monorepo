import { GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const LinkGqlType = new GraphQLObjectType({
  fields: {
    href: { type: gqlNonNull(GraphQLString) },
    text: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.Link,
});

export default LinkGqlType;
