import Body1 from "components/text/Body1";
import Header2 from "components/text/Header2";
import styles from "css/pages/landing/LandingSectionHeader.module.css";
import ColorClass from "types/enums/ColorClass";

type Props = {
  children: string;
  description?: string;
};

export default function LandingSectionHeader({
  children,
  description,
}: Props): JSX.Element {
  return (
    <div className={styles.header}>
      <Header2 colorClass={ColorClass.Primary} textAlign="center">
        {children}
      </Header2>
      {description != null && (
        <Body1
          className={styles.description}
          colorClass={ColorClass.Primary}
          textAlign="center"
        >
          {description}
        </Body1>
      )}
    </div>
  );
}
