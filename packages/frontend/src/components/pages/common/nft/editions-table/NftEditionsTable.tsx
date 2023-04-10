import graphql from "babel-plugin-relay/macro";
import { EditionsForMasterEditionMintPaginationQuery } from "components/pages/common/nft/editions-table/__generated__/EditionsForMasterEditionMintPaginationQuery.graphql";
import { NftEditionsTableEditionsForMasterEditionMint_Query$key } from "components/pages/common/nft/editions-table/__generated__/NftEditionsTableEditionsForMasterEditionMint_Query.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import {
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import NftEditionsTableRow from "components/pages/common/nft/editions-table/NftEditionsTableRow";
import NftEditionsTableHeader from "components/pages/common/nft/editions-table/NftEditionsTableHeader";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import { useNftPageEditionsQuery } from "hooks/nft-page/__generated__/useNftPageEditionsQuery.graphql";
import { editionsQuery } from "hooks/nft-page/useNftPageEditions";
import { useEffect, useState } from "react";
import { EDITIONS_PAGE_SIZE } from "constants/PageSizes";
import PaginationControls, {
  PAGINATION_INITIAL_PAGE,
} from "components/nav/PaginationControls";
import EDITIONS_SORT_BY_STATUS_ORDER from "constants/EditionsSortByStatusOrder";
import getPaginationStartAndEnd from "utils/pagination/getPaginationStartAndEnd";

const editionsFragment = graphql`
  fragment NftEditionsTableEditionsForMasterEditionMint_Query on query_root
  @refetchable(queryName: "EditionsForMasterEditionMintPaginationQuery") {
    editionsForMasterEditionMint {
      editions(after: $after, first: $first, input: $input)
        @connection(key: "EditionsForMasterEditionMint_Query_editions") {
        __id

        totalCount

        edges {
          node {
            nft {
              mint
              price
              status
            }

            ...NftEditionsTableRow_MetadataAccount
          }
        }
      }
    }
  }
`;

type Props = {
  editionsQueryRef: PreloadedQuery<EditionsForMasterEditionMintPaginationQuery>;
};

export default function NftEditionsTable({
  editionsQueryRef,
}: Props): Maybe<JSX.Element> {
  const [currentPage, setCurrentPage] = useState(PAGINATION_INITIAL_PAGE);
  const queryData = usePreloadedQuery<useNftPageEditionsQuery>(
    editionsQuery,
    editionsQueryRef
  );
  const {
    EditionsForMasterEditionMint: { setConnectionId },
  } = useRelayConnectionIdsContext();

  const { data } = usePaginationFragment<
    EditionsForMasterEditionMintPaginationQuery,
    NftEditionsTableEditionsForMasterEditionMint_Query$key
  >(editionsFragment, queryData);

  const connectionId = data.editionsForMasterEditionMint.editions.__id;
  useEffect(() => {
    setConnectionId(connectionId);
  }, [connectionId, setConnectionId]);

  const { edges, totalCount } = data.editionsForMasterEditionMint.editions;
  const sortedEditions = [...edges].sort((a, b) => {
    const aNft = a.node.nft;
    const bNft = b.node.nft;
    const statusOrder =
      EDITIONS_SORT_BY_STATUS_ORDER[aNft.status] -
      EDITIONS_SORT_BY_STATUS_ORDER[bNft.status];
    if (statusOrder !== 0) {
      return statusOrder;
    }

    if (aNft.status === "Owned") {
      // If both NFTs are owned, ignore the price (since it doesn't currently get
      // zeroed out when an NFT is sold)
      return 0;
    }

    return (aNft.price ?? 0) - (bNft.price ?? 0);
  });

  const { end, start } = getPaginationStartAndEnd(
    currentPage,
    EDITIONS_PAGE_SIZE
  );
  const editions = sortedEditions.slice(start, end).map((edge) => edge.node);

  if (editions.length === 0) {
    return null;
  }

  return (
    <div>
      <NftEditionsTableHeader />
      {editions.map((edition) => (
        <NftEditionsTableRow key={edition.nft.mint} metadataAccount={edition} />
      ))}
      <PaginationControls
        currentPage={currentPage}
        pageSize={EDITIONS_PAGE_SIZE}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
      />
    </div>
  );
}
