import {
  GraphQLID,
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import PostVisibilityGqlType from "src/schema/enum/PostVisibilityGqlType";
import CommentGqlType from "src/schema/object/CommentGqlType";
import LinkGqlType from "src/schema/object/LinkGqlType";
import ReactionsGqlType from "src/schema/object/reactions/ReactionsGqlType";
import UserGqlType from "src/schema/object/UserGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import CampaignFundingTierGqlType from "src/schema/union/CampaignFundingTierGqlType";
import Typename from "src/types/enums/Typename";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const PostCommentsGqlType = new GraphQLObjectType({
  fields: {
    previewComments: { type: gqlNonNullListOfNonNull(CommentGqlType) },
    totalCount: { type: gqlNonNull(GraphQLInt) },
  },
  name: Typename.PostComments,
});

export const IPOST_FIELDS = {
  body: { type: GraphQLString },
  comments: { type: gqlNonNull(PostCommentsGqlType) },
  creator: { type: gqlNonNull(UserGqlType) },
  id: { type: gqlNonNull(GraphQLID) },
  link: { type: LinkGqlType },
  reactions: { type: gqlNonNull(ReactionsGqlType) },
  timeCreated: { type: gqlNonNull(TimestamptzScalarGqlType) },
  title: { type: gqlNonNull(GraphQLString) },
  visibility: { type: gqlNonNull(PostVisibilityGqlType) },
  visibilityFundingTiers: {
    type: gqlListOfNonNull(CampaignFundingTierGqlType),
  },
};

const IPostGqlType = new GraphQLInterfaceType({
  fields: IPOST_FIELDS,
  name: Typename.IPost,
});

export default IPostGqlType;
