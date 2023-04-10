import { GraphQLType, GraphQLList } from "graphql";

function gqlList<T extends GraphQLType>(graphqlType: T): GraphQLList<T> {
  return new GraphQLList(graphqlType);
}

export default gqlList;
