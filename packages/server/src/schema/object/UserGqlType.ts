import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import PhotoGqlType from "src/schema/object/PhotoGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import UuidScalarGqlType from "src/schema/scalar/UuidScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UserGqlType = new GraphQLObjectType({
  fields: {
    CoverPhoto: { type: PhotoGqlType },
    ProfilePhoto: { type: PhotoGqlType },
    bio: { type: GraphQLString },
    coverPhotoId: { type: UuidScalarGqlType },
    discordHandle: { type: GraphQLString },
    displayName: { type: GraphQLString },
    email: { type: GraphQLString },
    hasCompletedSignup: { type: gqlNonNull(GraphQLBoolean) },
    hasTakenCollectorSurvey2023: { type: GraphQLBoolean },
    hasTakenCreatorSurvey2023: { type: GraphQLBoolean },
    id: { type: gqlNonNull(GraphQLID) },
    instagramName: { type: GraphQLString },
    isCollector: { type: gqlNonNull(GraphQLBoolean) },
    isWhitelisted: { type: gqlNonNull(GraphQLBoolean) },
    profilePhotoId: { type: UuidScalarGqlType },
    shouldBlurNsfwContent: { type: gqlNonNull(GraphQLBoolean) },
    timeCreated: { type: gqlNonNull(TimestamptzScalarGqlType) },
    twitterName: { type: GraphQLString },
    username: { type: gqlNonNull(GraphQLString) },
    websiteUrl: { type: GraphQLString },
  },
  name: Typename.User,
});

export default UserGqlType;
