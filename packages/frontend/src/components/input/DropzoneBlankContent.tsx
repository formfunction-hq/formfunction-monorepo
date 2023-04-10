import Body1SemiBold from "components/text/Body1SemiBold";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import styles from "css/input/DropzoneBlankContent.module.css";

type Props = {
  colorClass?: ColorClass;
  icon: JSX.Element;
};

export default function DropzoneBlankContent({
  colorClass,
  icon,
}: Props): JSX.Element {
  return (
    <div className={styles.content}>
      {icon}
      <Body1SemiBold className={styles.title} colorClass={colorClass ?? null}>
        Drag and drop an image
      </Body1SemiBold>
      <Body2 className={styles.description} colorClass={colorClass ?? null}>
        or click to choose a file
      </Body2>
      <Body2 className={styles.acceptedFiles} colorClass={colorClass ?? null}>
        PNG, JPG
      </Body2>
    </div>
  );
}
