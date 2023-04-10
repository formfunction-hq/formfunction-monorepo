import TinyLabel from "components/text/TinyLabel";
import ColorClass from "types/enums/ColorClass";
import pluralize from "formfn-shared/dist/utils/pluralize";
import styles from "css/series/SeriesCount.module.css";
import joinClasses from "utils/joinClasses";
import SeriesType_enum from "types/relay/SeriesType_enum";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

function getLabel(seriesType: SeriesType_enum) {
  switch (seriesType) {
    case "GenerativeMint":
      return "Generative Series";
    case "UserCurated":
    case RELAY_FUTURE_ADDED_VALUE:
      return "Series";
    default:
      return assertUnreachable(seriesType);
  }
}

type Props = {
  className?: string;
  colorClass: ColorClass;
  count: number;
  seriesType: SeriesType_enum;
};

export default function SeriesCount({
  className,
  count,
  colorClass,
  seriesType,
}: Props): JSX.Element {
  return (
    <TinyLabel
      className={joinClasses(styles.seriesCount, className)}
      textTransform="uppercase"
      colorClass={colorClass}
    >
      {getLabel(seriesType)} • {count} {pluralize("piece", count)}
    </TinyLabel>
  );
}
