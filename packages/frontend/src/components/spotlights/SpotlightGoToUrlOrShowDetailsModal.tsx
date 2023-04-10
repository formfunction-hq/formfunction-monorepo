import graphql from "babel-plugin-relay/macro";
import PlainButton from "components/buttons/PlainButton";
import AutoLink from "components/misc/AutoLink";
import SpotlightDetailsModal from "components/spotlights/SpotlightDetailsModal";
import { SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress$key } from "components/spotlights/__generated__/SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress.graphql";
import { useState } from "react";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress on SpotlightExpress {
    spotlightInfo {
      url
    }
    ...SpotlightDetailsModal_SpotlightExpress
  }
`;

type Props = {
  children: any;
  spotlight: SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress$key;
};

export default function SpotlightGoToUrlOrShowDetailsModal({
  children,
  spotlight,
}: Props) {
  const data = useFragment(fragment, spotlight);
  const [isDetailsModalShown, setIsDetailsModalShown] = useState(false);
  const {
    spotlightInfo: { url },
  } = data;

  return (
    <>
      <SpotlightDetailsModal
        isShown={isDetailsModalShown}
        onHide={() => setIsDetailsModalShown(false)}
        spotlight={data}
      />
      {url != null ? (
        <AutoLink url={url}>{children}</AutoLink>
      ) : (
        <PlainButton onClick={() => setIsDetailsModalShown(true)}>
          {children}
        </PlainButton>
      )}
    </>
  );
}
