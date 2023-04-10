import TinyLabel from "components/text/TinyLabel";
import styles from "css/pages/common/nft/NftLabelAndContent.module.css";
import ColorClass from "types/enums/ColorClass";

type Props = {
  children: any;
  className?: string;
  icon?: JSX.Element;
  label: string | JSX.Element;
  labelColorClass?: ColorClass;
};

export default function NftLabelAndContent({
  children,
  className,
  icon,
  label,
  labelColorClass = ColorClass.Secondary,
}: Props): JSX.Element {
  return (
    <div className={className}>
      <div className={styles.inline}>
        <TinyLabel colorClass={labelColorClass} textTransform="uppercase">
          {label}
        </TinyLabel>
        {icon}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
