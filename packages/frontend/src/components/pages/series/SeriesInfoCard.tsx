import getSeriesLinkRelative from "formfn-shared/dist/utils/links/getSeriesLinkRelative";
import SeriesType_enum from "types/relay/SeriesType_enum";
import NftInfoCard from "components/pages/common/nft/NftInfoCard";

type Props = {
  name: string;
  previewPhotoUrl: string;
  slug: string;
  type: SeriesType_enum;
  username: string;
};

export default function SeriesInfoCard({
  name,
  previewPhotoUrl,
  slug,
  username,
  type,
}: Props) {
  const href = getSeriesLinkRelative(username, slug, type);

  return (
    <NftInfoCard
      href={href}
      label="From this series"
      name={name}
      previewPhotoUrl={previewPhotoUrl}
    />
  );
}
