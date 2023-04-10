import MyContext from "src/types/MyContext";
import {
  DeleteCommentForPostInput,
  DeleteCommentForPostResponse,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import CONVERT_COMMENT_INCLUDE from "src/constants/include/ConvertCommentInclude";
import convertComment from "src/utils/convert/convertComment";

export default async function deleteCommentForPostResolver(
  context: MyContext,
  input: DeleteCommentForPostInput
): Promise<DeleteCommentForPostResponse> {
  const verifiedPublicKey = assertUserSignedRequest(context);
  const { commentId } = input;
  const prisma = getPrisma();
  const comment = await prisma.comment.findFirst({
    where: { Commenter: { id: verifiedPublicKey.toString() }, id: commentId },
  });
  if (comment == null) {
    throw new Error(
      "The logged in user does not have permissions to delete this comment"
    );
  }

  const deletedComment = await getPrisma().comment.delete({
    include: CONVERT_COMMENT_INCLUDE,
    where: { id: commentId },
  });

  return {
    __typename: Typename.DeleteCommentForPostResponse,
    comment: convertComment(deletedComment),
  };
}
