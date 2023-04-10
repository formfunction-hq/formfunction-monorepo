import styles from "css/spotlights/SpotlightCard.module.css";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import TinyLabel from "components/text/TinyLabel";
import ColorClass from "types/enums/ColorClass";
import ArtName from "components/text/ArtName";
import {
  SpotlightCard_SpotlightExpress$key,
  SpotlightExpressStatus_enum,
} from "components/spotlights/__generated__/SpotlightCard_SpotlightExpress.graphql";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import SpotlightAssetWithOverlay from "components/spotlights/SpotlightAssetWithOverlay";
import SpotlightArtistPills from "components/spotlights/SpotlightArtistPills";
import SpotlightGoToUrlOrShowDetailsModal from "components/spotlights/SpotlightGoToUrlOrShowDetailsModal";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import SPOTLIGHT_STATUS_HUMAN_READABLE from "constants/SpotlightStatusHumanReadable";

const fragment = graphql`
  fragment SpotlightCard_SpotlightExpress on SpotlightExpress {
    spotlightInfo {
      label
      title
      status
      statusOverride
    }
    ...SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress
    ...SpotlightAssetWithOverlay_SpotlightExpress
    ...SpotlightArtistPills_SpotlightExpress
  }
`;

function SpotlightStatus({
  status,
  statusOverride,
}: {
  status: SpotlightExpressStatus_enum;
  statusOverride: Maybe<string>;
}) {
  switch (status) {
    case "Available":
    case "Ended":
      return (
        <>
          <TinyLabel colorClass={ColorClass.Secondary}>•</TinyLabel>
          <TinyLabel
            textTransform="uppercase"
            colorClass={ColorClass.Secondary}
          >
            {SPOTLIGHT_STATUS_HUMAN_READABLE[status]}
          </TinyLabel>
        </>
      );
    case "Sold":
    case "SoldOut":
      return (
        <>
          <TinyLabel colorClass={ColorClass.Secondary}>•</TinyLabel>
          <TinyLabel
            textTransform="uppercase"
            colorClass={ColorClass.BrightPurple}
          >
            {SPOTLIGHT_STATUS_HUMAN_READABLE[status]}
          </TinyLabel>
        </>
      );
    case "Override":
      return statusOverride != null && statusOverride !== "" ? (
        <>
          <TinyLabel colorClass={ColorClass.Secondary}>•</TinyLabel>
          <TinyLabel
            textTransform="uppercase"
            colorClass={
              statusOverride.includes("Sold")
                ? ColorClass.BrightPurple
                : ColorClass.Secondary
            }
          >
            {statusOverride}
          </TinyLabel>
        </>
      ) : null;
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(status);
  }
}

type Props = {
  spotlight: SpotlightCard_SpotlightExpress$key;
};

export default function SpotlightCard({ spotlight }: Props) {
  const data = useFragment(fragment, spotlight);

  const {
    spotlightInfo: { title, label },
  } = data;

  const content = (
    <div className={styles.content}>
      <SpotlightAssetWithOverlay spotlight={data} />
      <div className={styles.spotlightInfo}>
        <div className={styles.labelAndStatus}>
          <TinyLabel
            textTransform="uppercase"
            colorClass={ColorClass.Secondary}
          >
            {label}
          </TinyLabel>
          <SpotlightStatus
            status={data.spotlightInfo.status}
            statusOverride={data.spotlightInfo.statusOverride}
          />
        </div>
        <ArtName textAlign="left" colorClass={ColorClass.Primary}>
          {title}
        </ArtName>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <SpotlightGoToUrlOrShowDetailsModal spotlight={data}>
        {content}
      </SpotlightGoToUrlOrShowDetailsModal>
      <SpotlightArtistPills spotlight={data} />
    </div>
  );
}
