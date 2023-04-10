import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const PhotoGqlType = new GraphQLObjectType({
  fields: {
    description: { type: GraphQLString },
    id: { type: gqlNonNull(GraphQLID) },
    photoUrl: { type: gqlNonNull(GraphQLString) },
    timeCreated: { type: gqlNonNull(TimestamptzScalarGqlType) },
    title: { type: GraphQLString },
    userId: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.Photo,
});

export default PhotoGqlType;
