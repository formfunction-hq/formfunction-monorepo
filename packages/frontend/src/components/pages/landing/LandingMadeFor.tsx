import BigToggleButton from "components/buttons/BigToggleButton";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import LandingMadeForArtists from "components/pages/landing/LandingMadeForArtists";
import LandingMadeForCollectors from "components/pages/landing/LandingMadeForCollectors";
import Header2 from "components/text/Header2";
import styles from "css/pages/landing/LandingMadeFor.module.css";
import { useState } from "react";
import ColorClass from "types/enums/ColorClass";
import joinClasses from "utils/joinClasses";

export default function LandingMadeFor(): JSX.Element {
  const [bigTogglePosition, setBigTogglePosition] = useState(0);

  return (
    <div className={styles.containerOuter}>
      <ResponsiveContainer>
        <div className={styles.containerInner}>
          <Header2 colorClass={ColorClass.Primary} textAlign="center">
            Made for creatives and collectors
          </Header2>
          <div className={styles.toggle}>
            <BigToggleButton
              labels={["Artists", "Collectors"]}
              onToggle={setBigTogglePosition}
              position={bigTogglePosition}
            />
          </div>
          <div
            className={joinClasses(
              styles.body1,
              bigTogglePosition !== 0 ? styles.hide : null
            )}
          >
            <LandingMadeForArtists />
          </div>
          <div
            className={joinClasses(
              styles.body2,
              bigTogglePosition === 0 ? styles.hide : null
            )}
          >
            <LandingMadeForCollectors />
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
