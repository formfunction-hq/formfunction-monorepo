import graphql from "babel-plugin-relay/macro";
import styles from "css/pages/profile/ProfileSeries.module.css";
import { useFragment } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { ProfileSeriesSeries_Query$key } from "components/pages/profile/__generated__/ProfileSeriesSeries_Query.graphql";
import SeriesCard from "components/series/SeriesCard";
import SeriesGridFullWidth from "components/series/SeriesGridFullWidth";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import { ProfilePageModalContext } from "context/ProfilePageModalContext";
import { useContext } from "react";
import useUserContext from "hooks/useUserContext";
import { ProfileSeries_User$key } from "components/pages/profile/__generated__/ProfileSeries_User.graphql";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import getSortedSeriesBySeriesOrder from "utils/series/getSortedSeriesBySeriesOrder";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";

const userFragment = graphql`
  fragment ProfileSeries_User on User {
    id
    seriesOrder
  }
`;

export const seriesFragment = graphql`
  fragment ProfileSeriesSeries_Query on query_root {
    Series(where: $seriesWhere, order_by: $seriesOrderBy) {
      id
      # eslint-disable-next-line relay/unused-fields
      mint
      # eslint-disable-next-line relay/unused-fields
      name

      ...SeriesCard_Series
    }
  }
`;

type Props = {
  series: ProfileSeriesSeries_Query$key;
  user: ProfileSeries_User$key;
};

export default function ProfileSeries({
  series,
  user,
}: Props): Maybe<JSX.Element> {
  const { user: loggedInUser } = useUserContext();
  const { id: userId, seriesOrder } = useFragment(userFragment, user);
  const seriesData = useFragment(seriesFragment, series);

  // TODO[@arcticmatt]: remove this after figuring out root cause
  if (seriesOrder == null) {
    logError(
      AnalyticsEvent.RelayUnexpectedUndefined,
      "Unexpected undefined in ProfileSeries",
      {
        seriesOrder,
        userId,
      }
    );
  }

  const sortedSeries = getSortedSeriesBySeriesOrder(
    // TODO[@arcticmatt]: remove null coalescing after figuring out root cause
    seriesOrder ?? [],
    seriesData.Series
  );
  const { setIsCreateSeriesModalShown, setIsManageSeriesModalShown } =
    useContext(ProfilePageModalContext);
  const isOwnProfile = loggedInUser?.id === userId;

  if (seriesData.Series == null) {
    return null;
  }

  return (
    <>
      <SeriesGridFullWidth>
        {sortedSeries.map((seriesInner) => (
          <SeriesCard key={seriesInner.id} series={seriesInner} />
        ))}
      </SeriesGridFullWidth>
      {isOwnProfile && (
        <div
          className={styles.seriesButtonContainer}
          style={{ marginTop: sortedSeries.length === 0 ? 0 : undefined }}
        >
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            fontClass={FontClass.NavLink}
            onClick={() => setIsCreateSeriesModalShown(true)}
          >
            Create Series
          </ButtonWithText>
          {sortedSeries.length > 0 && (
            <TextButton
              buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
              fontClass={FontClass.NavLink}
              onClick={() => setIsManageSeriesModalShown(true)}
            >
              Manage Series
            </TextButton>
          )}
        </div>
      )}
    </>
  );
}
