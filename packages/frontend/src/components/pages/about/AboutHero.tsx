import { useState } from "react";

import styles from "css/pages/about/AboutHero.module.css";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import ColorClass from "types/enums/ColorClass";
import LandingSection from "components/pages/landing/LandingSection";
import Header2 from "components/text/Header2";
import Body1 from "components/text/Body1";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import getImgixUrl from "utils/getImgixUrl";

const HERO_IMAGES = [
  getImgixUrl("about/header-1.png"),
  getImgixUrl("about/header-2.png"),
  getImgixUrl("about/header-3.png"),
];

export default function AboutHero(): JSX.Element {
  const [height, setHeight] = useState(0);
  const halfHeight = height / 2;

  return (
    <div>
      <LandingSection
        className={BackgroundColorClass.LightPurpleGradient}
        disableBottomPadding
      >
        <ResponsiveContainer>
          <Header2
            className={styles.header}
            colorClass={ColorClass.DarkPurple}
            textAlign="center"
          >
            Formfunction is on a mission to help independent creators make a
            living by selling their art.
          </Header2>
          <Body1
            className={styles.description}
            colorClass={ColorClass.DarkPurple}
            textAlign="center"
          >
            Create and collect amazing digital art, without the negative
            environmental impact.
          </Body1>
        </ResponsiveContainer>
        <div
          className={styles.heroPlaceholder}
          style={{ height: `${halfHeight}px` }}
        />
      </LandingSection>
      <LandingSection disableTopPadding>
        <div
          ref={(ref) => {
            setHeight(ref?.getBoundingClientRect().height || 0);
          }}
          style={{
            bottom: `${halfHeight}px`,
            marginBottom: `-${halfHeight}px`,
          }}
          className={styles.heroesContainer}
        >
          {HERO_IMAGES.map((heroUrl) => (
            <img className={styles.hero} src={heroUrl} />
          ))}
        </div>
      </LandingSection>
    </div>
  );
}
