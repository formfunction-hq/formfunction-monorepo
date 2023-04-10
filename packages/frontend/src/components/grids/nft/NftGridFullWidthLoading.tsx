import { range } from "formfn-shared/dist/utils/range";
import { nanoid } from "nanoid";
import ListingCardLoadingSkeleton from "components/auction/ListingCardLoadingSkeleton";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import useNftGridFullWidthColumnCount from "hooks/grids/useNftGridFullWidthColumnCount";

export default function NftGridFullWidthLoading({
  count,
  multiple,
}: {
  count?: number;
  multiple?: number;
}): JSX.Element {
  const skeletonCount = useNftGridFullWidthColumnCount(multiple);
  return (
    <NftGridFullWidth>
      {range(count ?? skeletonCount).map(() => (
        <ListingCardLoadingSkeleton key={nanoid()} />
      ))}
    </NftGridFullWidth>
  );
}
