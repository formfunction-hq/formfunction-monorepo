import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import PhotoGqlType from "src/schema/object/PhotoGqlType";
import UserGqlType from "src/schema/object/UserGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import SeriesTypeGqlType from "src/schema/enum/SeriesTypeGqlType";

const SeriesGqlType = new GraphQLObjectType({
  fields: {
    AvatarPhoto: { type: gqlNonNull(PhotoGqlType) },
    CoverPhoto: { type: PhotoGqlType },
    Creator: { type: gqlNonNull(UserGqlType) },
    description: { type: GraphQLString },
    id: { type: gqlNonNull(GraphQLID) },
    mint: { type: gqlNonNull(GraphQLString) },
    name: { type: gqlNonNull(GraphQLString) },
    nftOrder: { type: gqlListOfNonNull(GraphQLString) },
    slug: { type: gqlNonNull(GraphQLString) },
    timeCreated: { type: gqlNonNull(TimestamptzScalarGqlType) },
    type: { type: gqlNonNull(SeriesTypeGqlType) },
  },
  name: Typename.Series,
});

export default SeriesGqlType;
