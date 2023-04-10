import styles from "css/pages/campaign/campaign-v1/sections/generative-mint/CandyMachineSaleDate.module.css";
import Inline from "components/misc/Inline";
import Body1 from "components/text/Body1";
import Body1Bold from "components/text/Body1Bold";
import InfoIconTooltip from "components/tooltips/InfoIconTooltip";
import { Dayjs } from "dayjs";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

type Props = {
  date: Dayjs;
  label: string;
  tooltip?: MaybeUndef<string>;
};

export default function CandyMachineSaleDate({ date, label, tooltip }: Props) {
  return (
    <Inline columnGap={8}>
      <Body1Bold className={styles.label} colorClass={ColorClass.Primary}>
        {label}:
      </Body1Bold>
      <Body1 colorClass={ColorClass.Primary}>
        {date.format("MMM D, YYYY [at] h:mma z")}
      </Body1>
      {tooltip != null && (
        <InfoIconTooltip
          infoIconColorValue={ColorValue.Secondary}
          tooltipText={tooltip}
        />
      )}
    </Inline>
  );
}
