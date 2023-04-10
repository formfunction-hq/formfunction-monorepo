import styles from "css/spotlights/ActiveSpotlightHero.module.css";
import ArtistPillButton from "components/buttons/ArtistPillButton";
import SpotlightHeroBasic from "components/spotlights/SpotlightHeroBasic";
import SpotlightHeroSquareImage from "components/spotlights/SpotlightHeroSquareImage";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import useFlagsTyped from "hooks/useFlagsTyped";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import {
  SpotlightExpressHeroUnitLayout_enum,
  ActiveSpotlightHero_SpotlightExpress$key,
} from "components/spotlights/__generated__/ActiveSpotlightHero_SpotlightExpress.graphql";
import SpotlightOverlay from "components/spotlights/SpotlightOverlay";
import dayjs from "formfn-shared/dist/utils/dates/dayjsex";
import SpotlightGoToUrlOrShowDetailsModal from "components/spotlights/SpotlightGoToUrlOrShowDetailsModal";
import SpotlightArtistPills from "components/spotlights/SpotlightArtistPills";
import AutoLink from "components/misc/AutoLink";
import joinClasses from "utils/joinClasses";

const fragment = graphql`
  fragment ActiveSpotlightHero_SpotlightExpress on SpotlightExpress {
    startTime
    endTime
    heroUnitLayout
    spotlightInfo {
      description
      label
      asset {
        # eslint-disable-next-line relay/unused-fields
        contentType
        downloadUrl
      }
      title
    }
    ...SpotlightArtistPills_SpotlightExpress
    ...SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress
  }
`;

type SpotlightHeroProps = {
  artistPills: Array<JSX.Element>;
  assetSrc: string;
  description: string;
  label: string;
  layout: SpotlightExpressHeroUnitLayout_enum;
  title: string;
};

function SpotlightHeroForLayout({
  artistPills,
  assetSrc,
  description,
  label,
  layout,
  title,
}: SpotlightHeroProps) {
  switch (layout) {
    case "Standard":
      return (
        <SpotlightHeroBasic
          artistPills={artistPills}
          assetSrc={assetSrc}
          description={description}
          label={label}
          title={title}
        />
      );
    case "TwoColumnSquareImage":
      return (
        <SpotlightHeroSquareImage
          artistPills={artistPills}
          assetSrc={assetSrc}
          description={description}
          label={label}
          title={title}
        />
      );
    case "%future added value":
      return null;
    default:
      return assertUnreachable(layout);
  }
}

function Body({
  spotlight,
}: {
  spotlight: Maybe<ActiveSpotlightHero_SpotlightExpress$key>;
}) {
  const { featuredSpotlightConfig } = useFlagsTyped();
  const data = useFragment(fragment, spotlight);

  // For now we only support one at a time
  const featuredSpotlightData = featuredSpotlightConfig[0];
  if (featuredSpotlightData != null) {
    const {
      assetSrc,
      title,
      description,
      label,
      link,
      artistPill: { name: artistPillName, src: artistPillSrc },
    } = featuredSpotlightData;
    return (
      <AutoLink url={link}>
        <SpotlightHeroForLayout
          // TODO: make LD override to support multiple artist pills
          artistPills={[
            <ArtistPillButton
              key={0}
              name={artistPillName}
              src={artistPillSrc}
              type="shadow"
            />,
          ]}
          assetSrc={assetSrc}
          description={description}
          label={label}
          layout={featuredSpotlightData.layout}
          title={title}
        />
      </AutoLink>
    );
  }

  if (data == null) {
    return null;
  }

  const {
    heroUnitLayout: layout,
    spotlightInfo: {
      asset: { downloadUrl: assetSrc },
      title,
      description,
      label,
    },
  } = data;

  return (
    <SpotlightGoToUrlOrShowDetailsModal spotlight={data}>
      <SpotlightHeroForLayout
        artistPills={[
          <SpotlightArtistPills key={0} spotlight={data} type="shadow" />,
        ]}
        assetSrc={assetSrc}
        description={description}
        label={label}
        layout={layout}
        title={title}
      />
    </SpotlightGoToUrlOrShowDetailsModal>
  );
}

type Props = {
  className?: string;
  showOverlay?: boolean;
  spotlight: Maybe<ActiveSpotlightHero_SpotlightExpress$key>;
};

export default function ActiveSpotlightHero({
  className,
  showOverlay = false,
  spotlight,
}: Props) {
  const data = useFragment(fragment, spotlight);
  const { featuredSpotlightConfig } = useFlagsTyped();
  const ldOverridePresent = featuredSpotlightConfig[0] != null;
  if (!ldOverridePresent && data == null) {
    return null;
  }

  return (
    <div className={joinClasses(styles.body, className)}>
      <Body spotlight={spotlight} />
      {showOverlay && (
        // In cases where we override using LD, it should always say
        // "Happening now" so we override the start and end time accordingly
        <SpotlightOverlay
          override={ldOverridePresent ? "Happening now" : undefined}
          startTime={ldOverridePresent ? undefined : dayjs(data?.startTime)}
          endTime={ldOverridePresent ? undefined : dayjs(data?.endTime)}
        />
      )}
    </div>
  );
}
