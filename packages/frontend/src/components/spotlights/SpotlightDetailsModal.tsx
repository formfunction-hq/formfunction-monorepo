import styles from "css/spotlights/SpotlightDetailsModal.module.css";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import TinyLabel from "components/text/TinyLabel";
import ColorClass from "types/enums/ColorClass";
import GenericModal from "components/modal/GenericModal";
import Header2 from "components/text/Header2";
import Body1 from "components/text/Body1";
import { SpotlightDetailsModal_SpotlightExpress$key } from "components/spotlights/__generated__/SpotlightDetailsModal_SpotlightExpress.graphql";
import SpotlightAssetWithOverlay from "components/spotlights/SpotlightAssetWithOverlay";
import SpotlightArtistPills from "components/spotlights/SpotlightArtistPills";

const fragment = graphql`
  fragment SpotlightDetailsModal_SpotlightExpress on SpotlightExpress {
    spotlightInfo {
      label
      title
      description
    }
    ...SpotlightAssetWithOverlay_SpotlightExpress
    ...SpotlightArtistPills_SpotlightExpress
  }
`;

type Props = {
  isShown: boolean;
  onHide: () => void;
  spotlight: SpotlightDetailsModal_SpotlightExpress$key;
};

export default function SpotlightDetailsModal({
  isShown,
  onHide,
  spotlight,
}: Props) {
  const data = useFragment(fragment, spotlight);

  const {
    spotlightInfo: { title, description, label },
  } = data;

  return (
    <GenericModal isShown={isShown} onHide={onHide}>
      <div className={styles.content}>
        <TinyLabel textTransform="uppercase" colorClass={ColorClass.Secondary}>
          {label}
        </TinyLabel>
        <Header2 colorClass={ColorClass.Primary}>{title}</Header2>
        <Body1 className={styles.description} colorClass={ColorClass.Secondary}>
          {description}
        </Body1>
        <SpotlightArtistPills className={styles.artistPills} spotlight={data} />
        <SpotlightAssetWithOverlay spotlight={data} />
      </div>
    </GenericModal>
  );
}
