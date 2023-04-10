import Body2Medium from "components/text/Body2Medium";
import styles from "css/auction/ListingCardPill.module.css";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import GlobalClass from "types/enums/GlobalClass";
import joinClasses from "utils/joinClasses";

export type PillStyle = "standard" | "compressed";

export default function ListingCardPill({
  icon,
  pillStyle = "standard",
  text,
}: {
  icon: JSX.Element;
  pillStyle?: PillStyle;
  text?: MaybeUndef<string>;
}) {
  return (
    <div
      className={joinClasses(
        styles.pill,
        pillStyle === "compressed" ? styles.pillCompressed : null
      )}
    >
      {icon}
      {text && pillStyle === "standard" && (
        <Body2Medium colorClass={null} className={GlobalClass.GradientText}>
          {text}
        </Body2Medium>
      )}
    </div>
  );
}
