import graphql from "babel-plugin-relay/macro";
import styles from "css/series/SeriesRow.module.css";
import { useFragment } from "react-relay";
import Body1 from "components/text/Body1";
import joinClasses from "utils/joinClasses";
import SeriesPreviewPhoto from "components/pages/series/SeriesPreviewPhoto";
import { SeriesRow_Series$key } from "components/series/__generated__/SeriesRow_Series.graphql";
import ColorClass from "types/enums/ColorClass";

const fragment = graphql`
  fragment SeriesRow_Series on Series {
    id
    name

    AvatarPhoto {
      photoUrl
    }
  }
`;

export default function SeriesRow({
  className,
  series,
}: {
  className?: string;
  series: SeriesRow_Series$key;
}) {
  const seriesData = useFragment(fragment, series);
  return (
    <div
      key={seriesData.id}
      className={joinClasses(styles.container, className)}
    >
      <SeriesPreviewPhoto previewPhotoUrl={seriesData.AvatarPhoto.photoUrl} />
      <Body1 colorClass={ColorClass.Primary} textAlign="left">
        {seriesData.name}
      </Body1>
    </div>
  );
}
