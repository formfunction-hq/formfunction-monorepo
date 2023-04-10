import ArtName from "components/text/ArtName";
import Body2 from "components/text/Body2";
import styles from "css/pages/common/nft-filters/NftFilterSection.module.css";
import ColorClass from "types/enums/ColorClass";

export default function NftFilterSection({
  children,
  subtitle,
  title,
}: {
  children: any;
  subtitle?: string;
  title: string;
}): JSX.Element {
  return (
    <div>
      <ArtName colorClass={ColorClass.Primary}>{title}</ArtName>
      {subtitle != null && (
        <Body2 className={styles.subtitle} colorClass={ColorClass.Primary}>
          {subtitle}
        </Body2>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
