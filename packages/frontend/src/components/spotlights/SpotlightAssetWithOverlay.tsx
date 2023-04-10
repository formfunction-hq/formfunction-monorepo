import styles from "css/spotlights/SpotlightAssetWithOverlay.module.css";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import SpotlightOverlay from "components/spotlights/SpotlightOverlay";
import dayjs from "formfn-shared/dist/utils/dates/dayjsex";
import { SpotlightAssetWithOverlay_SpotlightExpress$key } from "components/spotlights/__generated__/SpotlightAssetWithOverlay_SpotlightExpress.graphql";
import AssetForAssetExpress from "components/assets/AssetForAssetExpress";

const fragment = graphql`
  fragment SpotlightAssetWithOverlay_SpotlightExpress on SpotlightExpress {
    startTime
    endTime
    spotlightInfo {
      asset {
        ...AssetForAssetExpress_AssetExpress
      }
    }
  }
`;

type Props = {
  spotlight: SpotlightAssetWithOverlay_SpotlightExpress$key;
};

export default function SpotlightAssetWithOverlay({ spotlight }: Props) {
  const data = useFragment(fragment, spotlight);

  return (
    <div className={styles.asset}>
      <AssetForAssetExpress
        asset={data.spotlightInfo.asset}
        height={320}
        imgixWidth={800}
        width="100%"
        borderRadius={12}
        objectFit="cover"
      />
      <SpotlightOverlay
        startTime={dayjs(data.startTime)}
        endTime={dayjs(data.endTime)}
      />
    </div>
  );
}
