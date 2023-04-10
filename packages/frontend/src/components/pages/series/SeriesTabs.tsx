import styles from "css/pages/series/SeriesTabs.module.css";
import SeriesTabType from "types/enums/SeriesTabType";
import TabButton from "components/buttons/TabButton";

type Props = {
  numPieces: number;
  setTab: (val: SeriesTabType) => void;
  shouldShowAboutTab: boolean;
  tab: SeriesTabType;
};

export default function SeriesTabs({
  numPieces,
  tab,
  setTab,
  shouldShowAboutTab,
}: Props): JSX.Element {
  return (
    <div className={styles.left}>
      <TabButton
        isActive={tab === SeriesTabType.Pieces}
        label={String(numPieces)}
        name={SeriesTabType.Pieces}
        onClick={() => setTab(SeriesTabType.Pieces)}
      />
      {shouldShowAboutTab && (
        <TabButton
          isActive={tab === SeriesTabType.About}
          name={SeriesTabType.About}
          onClick={() => setTab(SeriesTabType.About)}
        />
      )}
    </div>
  );
}
