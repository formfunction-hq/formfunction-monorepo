import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import UserGqlType from "src/schema/object/UserGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CommentGqlType = new GraphQLObjectType({
  fields: {
    comment: { type: gqlNonNull(GraphQLString) },
    commenter: { type: gqlNonNull(UserGqlType) },
    id: { type: gqlNonNull(GraphQLID) },
    timeCreated: { type: gqlNonNull(TimestamptzScalarGqlType) },
  },
  name: Typename.Comment,
});

export default CommentGqlType;
