import styles from "css/pages/about/AboutStory.module.css";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import FontClass from "types/enums/FontClass";
import ArtName from "components/text/ArtName";
import TinyLabel from "components/text/TinyLabel";
import getImgixUrl from "utils/getImgixUrl";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import AspectRatioContainer from "components/containers/AspectRatioContainer";
import AboutTitleAndContent from "components/pages/about/AboutTitleAndContent";
import LandingSection from "components/pages/landing/LandingSection";

type StorySegmentProps = {
  description: JSX.Element;
  img: string;
  isCenter?: boolean;
  timelineText: string;
  title: string;
};

const STORY_SEGMENTS: Array<StorySegmentProps> = [
  {
    description: (
      <>
        Formfunction launched on February 3, 2022 with an amazing group of 24
        genesis artists. We spent the next few months building the foundational
        marketplace and creating an amazing experience for buying and selling
        digital art.
      </>
    ),
    img: getImgixUrl("about/launch.png"),
    timelineText: "Feb 2022",
    title: "We launched our art marketplace with 24 artists",
  },
  {
    description: (
      <>
        Our mission is to help creators make a living through their art, so no
        metric matters more than what our artists earn. Just two months after
        launching, we reached our first major milestone—paying out over $1
        million to our artists.
      </>
    ),
    img: getImgixUrl("about/one-million.jpg"),
    timelineText: "Apr 2022",
    title: "We paid our artists more than $1 million since launch",
  },
  {
    description: (
      <>
        After building a full-featured marketplace, we’re now exploring how
        creators can fund their creative dream projects by selling art. The
        first project to be community-funded on Formfunction was{" "}
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
          display="inline"
          fontClass={FontClass.Body1}
          href="https://formfunction.xyz/@shilstone_arts/campaigns/off-leash"
          textDecoration="underline"
          type="link_external"
        >
          Off Leash
        </TextButton>
        , a hand-drawn animated short film.
      </>
    ),
    img: getImgixUrl("about/community-funded.png"),
    timelineText: "Today",
    title: "We’re kicking off our first community-funded projects",
  },
];

function StorySegment({
  description,
  timelineText,
  title,
  isCenter,
  img,
}: StorySegmentProps): JSX.Element {
  return (
    <div className={styles.segmentContainer}>
      <AspectRatioContainer width={73} height={50}>
        <img className={styles.segmentImg} src={img} />
      </AspectRatioContainer>

      <div className={styles.timelineTextOuterContainer}>
        {isCenter && <div className={styles.solidLine} />}
        <TinyLabel
          className={styles.timelineTextContainer}
          colorClass={ColorClass.BrightPurple}
        >
          {timelineText}
        </TinyLabel>
      </div>
      <ArtName colorClass={ColorClass.Primary}>{title}</ArtName>
      <Body1
        className={styles.description}
        colorClass={ColorClass.Secondary}
        textAlign="center"
      >
        {description}
      </Body1>
    </div>
  );
}

export default function AboutStory(): JSX.Element {
  const content = (
    <div className={styles.segmentsOuterContainer}>
      <div className={styles.segmentsContainer}>
        {STORY_SEGMENTS.map((props, index) => (
          <StorySegment
            {...props}
            isCenter={index !== 0 && index !== STORY_SEGMENTS.length - 1}
          />
        ))}
      </div>
    </div>
  );

  return (
    <LandingSection>
      <ResponsiveContainer className={styles.container}>
        <AboutTitleAndContent content={content} title="Our Story" />
      </ResponsiveContainer>
    </LandingSection>
  );
}
