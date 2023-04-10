import TextButton from "components/buttons/TextButton";
import ChevronRightIcon from "components/icons/ChevronRightIcon";
import NftAsset from "components/images/NftAsset";
import SpotlightHeroBasic from "components/spotlights/SpotlightHeroBasic";
import Body1 from "components/text/Body1";
import SpotlightTitle from "components/text/SpotlightTitle";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/spotlights/SpotlightHeroSquareImage.module.css";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import useBreakpoint from "hooks/useBreakpoint";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import NftAssetSize from "types/enums/NftAssetSize";
import TextButtonTheme from "types/enums/TextButtonTheme";
import joinClasses from "utils/joinClasses";
import getSpotlightBackgroundImageStyle from "utils/spotlights/getSpotlightBackgroundImageStyle";

function Left({ assetSrc }: { assetSrc: string }) {
  const { isDesktopWideBreakpoint, isMonitorWideBreakpoint } = useBreakpoint();
  const breakpointToNftAssetSize = () => {
    if (isDesktopWideBreakpoint) {
      return NftAssetSize.Size320;
    }

    if (isMonitorWideBreakpoint) {
      return NftAssetSize.Size480;
    }

    return NftAssetSize.Size588;
  };

  return (
    <NftAsset
      assetSrc={assetSrc}
      // TODO(@bryancho): replace with production values
      contentType="image/jpeg"
      showBorder
      size={breakpointToNftAssetSize()}
    />
  );
}

function Right({
  artistPills,
  description,
  label,
  title,
}: {
  artistPills: Array<JSX.Element>;
  description: string;
  label: string;
  title: string;
}) {
  return (
    <div className={styles.body}>
      <TinyLabel textTransform="uppercase" colorClass={ColorClass.White}>
        {label}
      </TinyLabel>
      <SpotlightTitle
        className={styles.title}
        colorClass={ColorClass.White}
        truncateLines={2}
      >
        {title}
      </SpotlightTitle>
      <Body1
        className={styles.description}
        colorClass={ColorClass.White}
        truncateLines={6}
      >
        {description}
      </Body1>
      <div className={styles.artistPillContainer}>{artistPills}</div>
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.White}
        fontClass={FontClass.NavLink}
        icon={<ChevronRightIcon colorValue={ColorValue.White} />}
        iconPosition="right"
        onClick={emptyFunction}
      >
        See the spotlight
      </TextButton>
    </div>
  );
}

type Props = {
  artistPills: Array<JSX.Element>;
  assetSrc: string;
  description: string;
  label: string;
  title: string;
};

export default function SpotlightHeroSquareImage(props: Props): JSX.Element {
  const { artistPills, assetSrc, description, label, title } = props;
  const { isTabletWideBreakpoint } = useBreakpoint();
  if (isTabletWideBreakpoint) {
    return <SpotlightHeroBasic {...props} />;
  }

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.image}
          style={{
            background: getSpotlightBackgroundImageStyle(assetSrc, {
              auto: "format",
              q: 70,
              w: 1000,
            }),
          }}
        />
      </div>
      <div className={joinClasses(styles.container, styles.content)}>
        <Left assetSrc={assetSrc} />
        <Right
          artistPills={artistPills}
          description={description}
          label={label}
          title={title}
        />
      </div>
    </>
  );
}
