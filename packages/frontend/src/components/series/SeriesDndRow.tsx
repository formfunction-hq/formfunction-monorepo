import graphql from "babel-plugin-relay/macro";
import styles from "css/series/SeriesDndRow.module.css";
import VerticalEllipsisIcon from "components/icons/VerticalEllipsisIcon";
import ColorValue from "types/enums/ColorValue";
import { useFragment } from "react-relay";
import joinClasses from "utils/joinClasses";
import { SeriesDndRow_Series$key } from "components/series/__generated__/SeriesDndRow_Series.graphql";
import SeriesRow from "components/series/SeriesRow";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import FontClass from "types/enums/FontClass";
import { Popover } from "antd";
import HIGHER_THAN_MODAL_Z_INDEX from "constants/HigherThanModalZIndex";
import { useState } from "react";
import Body1 from "components/text/Body1";
import GenericConfirmationModal from "components/modal/GenericConfirmationModal";
import useBurnNft from "hooks/useBurnNft";
import { notify } from "components/toast/notifications";
import logIfNotProd from "utils/logIfNotProd";
import useDeleteSeries from "hooks/useDeleteSeries";
import ColorClass from "types/enums/ColorClass";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

const fragment = graphql`
  fragment SeriesDndRow_Series on Series {
    id
    name
    mint

    Nfts_aggregate(where: { status: { _neq: Burned } }) {
      aggregate {
        count
      }
    }

    ...SeriesRow_Series
  }
`;

type Props = {
  onBurnCompleted: (deletedSeriesMint: string) => void;
  series: SeriesDndRow_Series$key;
};

export default function SeriesDndRow({ onBurnCompleted, series }: Props) {
  const data = useFragment(fragment, series);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBurnModal, setShowBurnModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteSeries } = useDeleteSeries();
  const burnNft = useBurnNft();

  const onBurnConfirmClick = async () => {
    setIsLoading(true);
    const txid = await burnNft(data.mint);

    if (txid == null) {
      setIsLoading(false);
      return;
    }

    deleteSeries({
      onCompleted: () => {
        notify({
          message: "Series burned successfully!",
          txid,
        });
        setIsLoading(false);
        onBurnCompleted(data.mint);
      },
      onError: (e) => {
        logIfNotProd("error burning (graphql)", e);
        notifyUnexpectedError();
      },
      seriesId: data.id,
    });
  };

  return (
    <>
      <GenericConfirmationModal
        isShown={showBurnModal}
        isLoading={isLoading}
        title={`Burn ${data.name}?`}
        bodyText={
          "This will permanently remove the series from Formfunction and the underlying NFT will be burned." +
          " You will need to approve this action with your connected wallet."
        }
        buttonText="Burn"
        cancelButtonText="Nevermind"
        onHide={() => setShowBurnModal(false)}
        onConfirmClick={onBurnConfirmClick}
      />
      <div className={joinClasses(styles.rowContainer)}>
        <div className={styles.rowInnerContainer}>
          <VerticalEllipsisIcon colorValue={ColorValue.Ghost} />
          <SeriesRow className={styles.rowContent} series={data} />
          <Popover
            zIndex={HIGHER_THAN_MODAL_Z_INDEX}
            visible={showTooltip}
            content={
              <div className={styles.deletePopover}>
                <Body1 colorClass={ColorClass.Primary} textAlign="center">
                  All pieces in the series must be removed before you can burn
                  the series.
                </Body1>
              </div>
            }
          >
            <TextButton
              textDecoration="none"
              className={styles.deleteButton}
              buttonThemeOrColorClass={TextButtonTheme.Error}
              fontClass={FontClass.Body1}
              onClick={() => {
                if ((data.Nfts_aggregate?.aggregate?.count ?? 0) > 0) {
                  setShowTooltip(true);
                  setTimeout(() => setShowTooltip(false), 2000);
                  return;
                }

                setShowBurnModal(true);
              }}
            >
              Burn
            </TextButton>
          </Popover>
        </div>
      </div>
    </>
  );
}
