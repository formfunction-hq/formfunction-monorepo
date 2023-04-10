import NftOtherInfoWithSeparator from "components/auction/NftOtherInfoWithSeparator";
import NftLabelAndContent from "components/pages/common/nft/NftLabelAndContent";
import NavLink from "components/text/NavLink";
import Skeleton from "react-loading-skeleton";

export default function NftOtherInfoSkeleton(): JSX.Element {
  return (
    <NftOtherInfoWithSeparator>
      <NftLabelAndContent label={<Skeleton width={50} />}>
        <NavLink colorClass={null}>
          <Skeleton width={100} />
        </NavLink>
      </NftLabelAndContent>
    </NftOtherInfoWithSeparator>
  );
}
