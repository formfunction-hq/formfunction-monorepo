import PlainButton from "components/buttons/PlainButton";
import ArtName from "components/text/ArtName";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import styles from "css/listing/ListingOption.module.css";

type Props = {
  description: string;
  icon: JSX.Element;
  name: string;
  onClick: () => void;
};

export default function ListingOption({
  description,
  icon,
  name,
  onClick,
}: Props) {
  return (
    <PlainButton onClick={onClick}>
      <div className={styles.listingOption}>
        <div className={styles.icon}>{icon}</div>
        <div>
          <ArtName colorClass={ColorClass.Primary}>{name}</ArtName>
          <Body2 colorClass={ColorClass.Secondary}>{description}</Body2>
        </div>
      </div>
    </PlainButton>
  );
}
