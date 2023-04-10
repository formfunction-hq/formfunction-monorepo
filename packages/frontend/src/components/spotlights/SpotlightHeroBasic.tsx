import ShadowButton from "components/buttons/ShadowButton";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import Body1 from "components/text/Body1";
import SpotlightTitle from "components/text/SpotlightTitle";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/spotlights/SpotlightHeroBasic.module.css";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import getSpotlightBackgroundImageStyle from "utils/spotlights/getSpotlightBackgroundImageStyle";

type Props = {
  artistPills: Array<JSX.Element>;
  assetSrc: string;
  description: string;
  label: string;
  title: string;
};

export default function SpotlightHeroBasic({
  artistPills,
  assetSrc,
  description,
  label,
  title,
}: Props): JSX.Element {
  return (
    <div
      className={styles.container}
      style={{
        background: getSpotlightBackgroundImageStyle(assetSrc, {
          auto: "format",
          q: 70,
          w: 1500,
        }),
      }}
    >
      <div className={styles.body}>
        <TinyLabel
          textAlign="center"
          textTransform="uppercase"
          colorClass={ColorClass.White}
        >
          {label}
        </TinyLabel>
        <SpotlightTitle
          className={styles.title}
          colorClass={ColorClass.White}
          textAlign="center"
          truncateLines={3}
        >
          {title}
        </SpotlightTitle>
        <Body1
          textAlign="center"
          className={styles.description}
          colorClass={ColorClass.White}
          truncateLines={5}
        >
          {description}
        </Body1>
        <div className={styles.artistPillContainer}>{artistPills}</div>
        <ShadowButton className={styles.button}>
          <ArrowRightIcon colorValue={ColorValue.BrightPurple} size={24} />
        </ShadowButton>
      </div>
    </div>
  );
}
