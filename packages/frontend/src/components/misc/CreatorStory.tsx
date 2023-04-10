import ArtName from "components/text/ArtName";
import Header1 from "components/text/Header1";
import Header3 from "components/text/Header3";
import Subheader from "components/text/Subheader";
import styles from "css/misc/CreatorStory.module.css";
import ColorScheme from "types/ColorScheme";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import formatUsername from "utils/formatUsername";
import joinClasses from "utils/joinClasses";
import GrayProfilePhotoCircle from "components/images/GrayProfilePhotoCircle";

function TitleAndDescription({
  children,
  colorScheme,
  title,
}: {
  children: string;
  colorScheme: ColorScheme;
  title: string;
}): Maybe<JSX.Element> {
  if (children.length === 0) {
    return null;
  }

  return (
    <div className={styles.titleAndDescription}>
      <Header3 colorClass={colorScheme.foreground.colorClass}>{title}</Header3>
      <Subheader colorClass={colorScheme.textColor.colorClass}>
        {children}
      </Subheader>
    </div>
  );
}

function TopSection({
  colorScheme,
  headline,
  profilePhotoSrc,
  username,
}: {
  colorScheme: ColorScheme;
  headline: string;
  profilePhotoSrc: Maybe<string>;
  username: string;
}): JSX.Element {
  return (
    <div className={styles.topSection}>
      <GrayProfilePhotoCircle
        className={styles.profilePhoto}
        profilePhotoSrc={profilePhotoSrc}
      />
      <div className={styles.topSectionText}>
        <ArtName colorClass={colorScheme.foreground.colorClass}>
          {formatUsername(username)!}
        </ArtName>
        <Header1 colorClass={colorScheme.foreground.colorClass}>
          {headline}
        </Header1>
      </div>
    </div>
  );
}

type Props = {
  colorScheme: ColorScheme;
  displayName?: MaybeUndef<string>;
  goals: string;
  headline: string;
  inspiration: string;
  process: string;
  profilePhotoSrc: Maybe<string>;
  username: string;
};

export default function CreatorStory({
  colorScheme,
  displayName,
  goals,
  headline,
  inspiration,
  process,
  profilePhotoSrc,
  username,
}: Props): JSX.Element {
  return (
    <div
      className={joinClasses(
        styles.container,
        colorScheme.background.backgroundColorClass
      )}
    >
      <TopSection
        colorScheme={colorScheme}
        headline={headline}
        profilePhotoSrc={profilePhotoSrc}
        username={!isEmptyString(displayName) ? displayName! : username}
      />
      <TitleAndDescription
        colorScheme={colorScheme}
        title="What's your process like?"
      >
        {process}
      </TitleAndDescription>
      <TitleAndDescription colorScheme={colorScheme} title="What inspires you?">
        {inspiration}
      </TitleAndDescription>
      <TitleAndDescription
        colorScheme={colorScheme}
        title="What are your long term goals as a creator?"
      >
        {goals}
      </TitleAndDescription>
    </div>
  );
}
