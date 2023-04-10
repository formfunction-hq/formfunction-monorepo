import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { GraphQLObjectType } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import createPostBaseForCampaignResolver from "src/resolvers/mutation/posts/createPostBaseForCampaignResolver";
import createPostWithPollForCampaignResolver from "src/resolvers/mutation/posts/createPostWithPollForCampaignResolver";
import respondToPollResolver from "src/resolvers/mutation/posts/respondToPollResolver";
import CreatePostBaseForCampaignInputGqlType from "src/schema/input/posts/CreatePostBaseForCampaignInputGqlType";
import CreatePostWithPollForCampaignInputGqlType from "src/schema/input/posts/CreatePostWithPollForCampaignInputGqlType";
import RespondToPollInputGqlType from "src/schema/input/posts/RespondToPollInputGqlType";
import CreatePostBaseForCampaignResponseGqlType from "src/schema/object/response/posts/CreatePostBaseForCampaignResponseGqlType";
import CreatePostWithPollForCampaignResponseGqlType from "src/schema/object/response/posts/CreatePostWithPollForCampaignResponseGqlType";
import RespondToPollResponseGqlType from "src/schema/object/response/posts/RespondToPollResponseGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CreatePostBaseForCampaignInput,
  CreatePostBaseForCampaignResponse,
  CreatePostWithPollForCampaignInput,
  CreatePostWithPollForCampaignResponse,
  RespondToPollInput,
  RespondToPollResponse,
} from "src/__generated__/generated";

const PostsNamespaceMutationResponseGqlType = new GraphQLObjectType({
  fields: {
    createPostBaseForCampaign: {
      args: {
        input: { type: gqlNonNull(CreatePostBaseForCampaignInputGqlType) },
      },
      async resolve(
        _source,
        {
          input,
        }: {
          input: CreatePostBaseForCampaignInput;
        },
        context: MyContext
      ): Promise<Maybe<CreatePostBaseForCampaignResponse>> {
        return logErrorsForResolver(context.req, () =>
          createPostBaseForCampaignResolver(context, input)
        );
      },
      type: CreatePostBaseForCampaignResponseGqlType,
    },
    createPostWithPollForCampaign: {
      args: {
        input: {
          type: gqlNonNull(CreatePostWithPollForCampaignInputGqlType),
        },
      },
      async resolve(
        _source,
        {
          input,
        }: {
          input: CreatePostWithPollForCampaignInput;
        },
        context: MyContext
      ): Promise<Maybe<CreatePostWithPollForCampaignResponse>> {
        return logErrorsForResolver(context.req, () =>
          createPostWithPollForCampaignResolver(context, input)
        );
      },
      type: CreatePostWithPollForCampaignResponseGqlType,
    },
    respondToPoll: {
      args: {
        input: {
          type: gqlNonNull(RespondToPollInputGqlType),
        },
      },
      async resolve(
        _source,
        {
          input,
        }: {
          input: RespondToPollInput;
        },
        context: MyContext
      ): Promise<Maybe<RespondToPollResponse>> {
        return logErrorsForResolver(context.req, () =>
          respondToPollResolver(context, input)
        );
      },
      type: RespondToPollResponseGqlType,
    },
  },
  name: Typename.PostsNamespaceMutationResponse,
});

export default PostsNamespaceMutationResponseGqlType;
