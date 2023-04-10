import MyContext from "src/types/MyContext";
import {
  CreateReactionForPostInput,
  CreateReactionForPostResponse,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";

export default async function createReactionForPostResolver(
  context: MyContext,
  input: CreateReactionForPostInput
): Promise<CreateReactionForPostResponse> {
  const verifiedPublicKey = assertUserSignedRequest(
    context,
    "Please sign in to react to this post"
  );
  const { postId, type } = input;

  await getPrisma().reaction.create({
    data: {
      FromUser: { connect: { id: verifiedPublicKey!.toString() } },
      Post: { connect: { id: postId } },
      ReactionType: { connect: { value: type } },
    },
  });

  return {
    __typename: Typename.CreateReactionForPostResponse,
    type,
  };
}
