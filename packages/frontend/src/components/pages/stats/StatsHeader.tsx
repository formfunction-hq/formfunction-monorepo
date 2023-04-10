import Body1 from "components/text/Body1";
import Header2 from "components/text/Header2";
import styles from "css/pages/stats/StatsHeader.module.css";
import ColorClass from "types/enums/ColorClass";

export default function StatsHeader() {
  return (
    <div className={styles.container}>
      <Header2 colorClass={ColorClass.Primary} textAlign="center">
        Top Stats
      </Header2>
      <Body1
        className={styles.description}
        colorClass={ColorClass.Secondary}
        textAlign="center"
      >
        See the top ranking creators and collectors on Formfunction.
      </Body1>
    </div>
  );
}
