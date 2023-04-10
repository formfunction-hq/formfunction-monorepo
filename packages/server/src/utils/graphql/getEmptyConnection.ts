import Typename from "src/types/enums/Typename";
import getEmptyPageInfo from "src/utils/graphql/getEmptyPageInfo";

export default function getEmptyConnection<T extends Typename>(typename: T) {
  return {
    __typename: typename,
    edges: [],
    pageInfo: getEmptyPageInfo(),
    totalCount: 0,
  };
}
