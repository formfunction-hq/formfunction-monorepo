import MyContext from "src/types/MyContext";
import {
  DeleteReactionForPostInput,
  DeleteReactionForPostResponse,
  ReactionTypeExpress_Enum,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";

export default async function deleteReactionForPostResolver(
  context: MyContext,
  input: DeleteReactionForPostInput
): Promise<DeleteReactionForPostResponse> {
  const verifiedPublicKey = assertUserSignedRequest(
    context,
    "Please sign in to react to this post"
  );
  const { postId } = input;

  const deletedReaction = await getPrisma().reaction.delete({
    where: {
      fromUserId_postId: {
        fromUserId: verifiedPublicKey!.toString(),
        postId,
      },
    },
  });

  return {
    __typename: Typename.DeleteReactionForPostResponse,
    type: deletedReaction.type as ReactionTypeExpress_Enum,
  };
}
