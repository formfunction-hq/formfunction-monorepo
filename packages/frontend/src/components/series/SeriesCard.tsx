import graphql from "babel-plugin-relay/macro";
import styles from "css/series/SeriesCard.module.css";
import { SeriesCard_Series$key } from "components/series/__generated__/SeriesCard_Series.graphql";
import { useFragment } from "react-relay";
import { Link } from "react-router-dom";
import SeriesCount from "components/series/SeriesCount";
import ColorClass from "types/enums/ColorClass";
import GlobalClass from "types/enums/GlobalClass";
import ArtName from "components/text/ArtName";
import joinClasses from "utils/joinClasses";
import getSeriesLinkRelative from "formfn-shared/dist/utils/links/getSeriesLinkRelative";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import SeriesCardImageForUser from "components/series/SeriesCardImageForUser";

const fragment = graphql`
  fragment SeriesCard_Series on Series {
    # eslint-disable-next-line relay/unused-fields
    id
    slug
    name
    type

    AvatarPhoto {
      # eslint-disable-next-line relay/unused-fields
      id
      photoUrl
    }

    Creator {
      # eslint-disable-next-line relay/unused-fields
      id
      username

      ...SeriesCardImageForUser_User
    }

    Nfts_aggregate(where: { status: { _neq: Burned } }) {
      aggregate {
        count
      }
    }
  }
`;

type Props = {
  series: SeriesCard_Series$key;
};

export default function SeriesCard({ series }: Props): Maybe<JSX.Element> {
  const seriesData = useFragment(fragment, series);

  // TODO[@arcticmatt]: remove this after figuring out root cause
  if (seriesData?.Nfts_aggregate == null) {
    logError(
      AnalyticsEvent.RelayUnexpectedUndefined,
      "Unexpected undefined in SeriesCard",
      {
        seriesData,
      }
    );
    return null;
  }

  const {
    Nfts_aggregate: { aggregate },
    name,
    slug,
    Creator: creator,
    AvatarPhoto: { photoUrl: src },
  } = seriesData;
  const { count: nftCount } = aggregate || {};
  const image = <SeriesCardImageForUser src={src} user={creator} />;

  return (
    <Link
      className={styles.link}
      to={getSeriesLinkRelative(creator.username ?? "", slug, seriesData.type)}
    >
      <div className={joinClasses(styles.container, GlobalClass.CardAnimation)}>
        {image}
        <div className={styles.info}>
          <div className={styles.infoLeft}>
            <SeriesCount
              count={nftCount as number}
              colorClass={ColorClass.Secondary}
              seriesType={seriesData.type}
            />
            <ArtName className={styles.name} colorClass={ColorClass.Primary}>
              {name}
            </ArtName>
          </div>
        </div>
      </div>
    </Link>
  );
}
