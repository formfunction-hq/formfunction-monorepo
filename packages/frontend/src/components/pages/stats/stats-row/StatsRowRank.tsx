import ArtName from "components/text/ArtName";
import Body1Medium from "components/text/Body1Medium";
import useBreakpoint from "hooks/useBreakpoint";
import ColorClass from "types/enums/ColorClass";
import styles from "css/pages/stats/stats-row/StatsRowRank.module.css";

type Props = {
  rank: number;
};

export default function StatsRowRank({ rank }: Props): JSX.Element {
  const { isMobileBreakpoint } = useBreakpoint();

  return !isMobileBreakpoint ? (
    <ArtName className={styles.rank} colorClass={ColorClass.Secondary}>
      #{rank}
    </ArtName>
  ) : (
    <Body1Medium className={styles.rank} colorClass={ColorClass.Secondary}>
      #{rank}
    </Body1Medium>
  );
}
