import Body1 from "components/text/Body1";
import styles from "css/pages/activity/ActivitySectionEmptyContent.module.css";
import ColorClass from "types/enums/ColorClass";

type Props = {
  cta?: JSX.Element;
  imageSrc: string;
  title: string;
};

export default function ActivitySectionEmptyContent({
  cta,
  imageSrc,
  title,
}: Props) {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageSrc} />
      <Body1
        className={styles.text}
        colorClass={ColorClass.Primary}
        textAlign="center"
      >
        {title}
      </Body1>
      {cta != null && <div className={styles.cta}>{cta}</div>}
    </div>
  );
}
