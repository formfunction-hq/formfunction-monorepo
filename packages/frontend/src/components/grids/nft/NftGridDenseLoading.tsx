import { range } from "formfn-shared/dist/utils/range";
import { nanoid } from "nanoid";
import ListingCardLoadingSkeleton from "components/auction/ListingCardLoadingSkeleton";
import NftGridDense from "components/grids/nft/NftGridDense";

export default function NftGridDenseLoading({
  count,
}: {
  count: number;
}): JSX.Element {
  return (
    <NftGridDense>
      {range(count).map(() => (
        <ListingCardLoadingSkeleton key={nanoid()} />
      ))}
    </NftGridDense>
  );
}
