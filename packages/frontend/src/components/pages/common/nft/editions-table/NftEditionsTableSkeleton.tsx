import PaginationControls from "components/nav/PaginationControls";
import NftEditionsTableHeader from "components/pages/common/nft/editions-table/NftEditionsTableHeader";
import NftEditionsTableRowSkeleton from "components/pages/common/nft/editions-table/NftEditionsTableRowSkeleton";
import { EDITIONS_PAGE_SIZE } from "constants/PageSizes";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { range } from "formfn-shared/dist/utils/range";

export default function NftEditionsTableSkeleton() {
  return (
    <div>
      <NftEditionsTableHeader />
      {range(EDITIONS_PAGE_SIZE).map((i) => (
        <NftEditionsTableRowSkeleton key={i} />
      ))}
      <PaginationControls
        currentPage={1}
        pageSize={EDITIONS_PAGE_SIZE}
        setCurrentPage={emptyFunction}
        totalCount={EDITIONS_PAGE_SIZE + 1}
      />
    </div>
  );
}
