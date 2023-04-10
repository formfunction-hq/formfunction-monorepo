import styles from "css/modal/ManageSeriesModal.module.css";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import GenericModal from "components/modal/GenericModal";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import { useState } from "react";
import SeriesSelectDnd, { Item } from "components/series/SeriesSelectDnd";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { ManageSeriesModal_Series$key } from "components/modal/__generated__/ManageSeriesModal_Series.graphql";
import { notify } from "components/toast/notifications";
import useUserContext from "hooks/useUserContext";
import logIfNotProd from "utils/logIfNotProd";
import { ManageSeriesModal_User$key } from "components/modal/__generated__/ManageSeriesModal_User.graphql";
import getSortedSeriesBySeriesOrder from "utils/series/getSortedSeriesBySeriesOrder";
import useUpdateUserByPk from "hooks/useUpdateUserByPk";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

type Props = {
  isShown: boolean;
  onHide: () => void;
  series: ManageSeriesModal_Series$key;
  user: ManageSeriesModal_User$key;
};

const userFragment = graphql`
  fragment ManageSeriesModal_User on User {
    seriesOrder
  }
`;

const seriesFragment = graphql`
  fragment ManageSeriesModal_Series on Series @relay(plural: true) {
    # eslint-disable-next-line relay/unused-fields
    name
    mint

    ...SeriesDndRow_Series
  }
`;

export default function ManageSeriesModal({
  isShown,
  onHide,
  series,
  user,
}: Props): JSX.Element {
  const { userId } = useUserContext();
  const { seriesOrder } = useFragment(userFragment, user);
  const seriesData = useFragment(seriesFragment, series);

  // TODO[@arcticmatt]: remove this after figuring out root cause
  if (seriesOrder == null) {
    logError(
      AnalyticsEvent.RelayUnexpectedUndefined,
      "Unexpected undefined in ManageSeriesModal",
      {
        seriesOrder,
      }
    );
  }

  const sortedSeries = getSortedSeriesBySeriesOrder(
    // TODO[@arcticmatt]: remove null coalescing after figuring out root cause
    seriesOrder ?? [],
    seriesData
  );
  const itemsInitial = sortedSeries.map((s, i) => ({
    id: `${i}`,
    series: s,
    seriesMint: s.mint,
  }));
  const [items, setItems] = useState<Array<Item>>(itemsInitial);
  const { updateUserByPk, requestInFlight } = useUpdateUserByPk();

  return (
    <GenericModal title="Manage Series" isShown={isShown} onHide={onHide}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
            Remove or reorder your series to change how they show up on your
            profile. These changes will also be reflected on your Created tab.
          </Body1>
        </div>
        <SeriesSelectDnd
          onBurnCompleted={(deletedSeriesMint: string) => {
            setItems(items.filter((i) => i.seriesMint !== deletedSeriesMint));
            onHide();
          }}
          items={items}
          setItems={setItems}
        />
        <ButtonWithText
          isLoading={requestInFlight}
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          onClick={() => {
            updateUserByPk({
              onCompleted: () => {
                notify({ message: "Series updated!" });
                onHide();
              },
              onError: (e) => {
                logIfNotProd("error deleting Series (graphql)", e);
                notifyUnexpectedError();
              },
              set: {
                seriesOrder: items.map((i) => i.seriesMint),
              },
              userId: userId!,
            });
          }}
        >
          Save
        </ButtonWithText>
      </div>
    </GenericModal>
  );
}
