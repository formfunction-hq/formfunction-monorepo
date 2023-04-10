import Typename from "src/types/enums/Typename";
import {
  ReactionCount,
  ReactionTypeExpress_Enum,
} from "src/__generated__/generated";

export default function convertReactionCount(
  count: number,
  reactionType: ReactionTypeExpress_Enum
): ReactionCount {
  return {
    __typename: Typename.ReactionCount,
    count,
    type: reactionType,
  };
}
