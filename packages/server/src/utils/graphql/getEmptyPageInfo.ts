import Typename from "src/types/enums/Typename";
import { PageInfo } from "src/__generated__/generated";

export default function getEmptyPageInfo(): PageInfo {
  return {
    __typename: Typename.PageInfo,
    endCursor: "",
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
  };
}
