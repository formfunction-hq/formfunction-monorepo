import ConvertCommentType from "src/types/convert/ConvertCommentType";
import Typename from "src/types/enums/Typename";
import convertUser from "src/utils/convert/convertUser";
import { CommentExpress } from "src/__generated__/generated";

export default function convertComment(
  commentObj: ConvertCommentType
): CommentExpress {
  const { comment, Commenter, id, timeCreated } = commentObj;

  return {
    __typename: Typename.Comment,
    comment,
    commenter: convertUser(Commenter),
    id,
    timeCreated,
  };
}
