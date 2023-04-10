import Typename from "src/types/enums/Typename";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { PageInfo } from "src/__generated__/generated";

export default function createOffsetPaginationConnection<
  T,
  EdgeT extends Typename,
  ConnectionT extends Typename
>(
  nodes: Array<T>,
  edgeTypename: EdgeT,
  connectionTypename: ConnectionT,
  after: Maybe<string>,
  first: number,
  totalCount: number
) {
  const afterNumber = after == null ? 0 : Number(after);
  const edges = nodes.map((node, index) => ({
    __typename: edgeTypename,
    cursor: (afterNumber + index + 1).toString(),
    node,
  }));

  const pageInfo: PageInfo = {
    __typename: Typename.PageInfo,
    endCursor:
      edges.length > 0
        ? edges[edges.length - 1].cursor
        : afterNumber.toString(),
    hasNextPage: totalCount > afterNumber + first,
    hasPreviousPage: afterNumber > 0 && totalCount > 0,
    startCursor: edges.length > 0 ? edges[0].cursor : afterNumber.toString(),
  };

  return {
    __typename: connectionTypename,
    edges,
    pageInfo,
    totalCount,
  };
}
