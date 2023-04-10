import StatsRowSkeleton from "components/pages/stats/stats-row/StatsRowSkeleton";
import StatsRowHeader from "components/pages/stats/StatsRowHeader";
import StatsRows from "components/pages/stats/StatsRows";
import { range } from "formfn-shared/dist/utils/range";
import StatsDisplayType from "types/enums/StatsDisplayType";
import StatsRowHeaderType from "types/enums/StatsRowHeaderType";

type Props = {
  displayType: StatsDisplayType;
  headerType?: StatsRowHeaderType;
};

export default function StatsBodySkeleton({
  displayType,
  headerType,
}: Props): JSX.Element {
  return (
    <StatsRows displayType={displayType}>
      {headerType != null && <StatsRowHeader headerType={headerType} />}
      {range(0, 6).map((i) => (
        <StatsRowSkeleton displayType={displayType} key={i} rank={i + 1} />
      ))}
    </StatsRows>
  );
}
