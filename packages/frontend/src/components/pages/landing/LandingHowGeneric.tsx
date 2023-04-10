import CircleArrowButton from "components/buttons/CircleArrowButton";
import TextButton from "components/buttons/TextButton";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import Header2 from "components/text/Header2";
import Subheader from "components/text/Subheader";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/pages/landing/LandingHowGeneric.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";

type Props = {
  children: any;
  description: string;
  isHidden: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  title: string;
};

export default function LandingHowGeneric({
  children,
  description,
  isHidden,
  onNext,
  onPrev,
  title,
}: Props): JSX.Element {
  const { width } = useWindowDimensions();

  const nextButton =
    onNext == null ? null : width > 868 ? (
      <CircleArrowButton direction="right" onClick={onNext} />
    ) : (
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
        fontClass={FontClass.Body1Medium}
        icon={<ArrowRightIcon colorValue={ColorValue.BrightPurple} size={20} />}
        iconPosition="right"
        onClick={onNext}
      >
        Next
      </TextButton>
    );

  const prevButton =
    onPrev == null ? null : width > 868 ? (
      <CircleArrowButton direction="left" onClick={onPrev} />
    ) : (
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
        fontClass={FontClass.Body1Medium}
        icon={<ArrowLeftIcon colorValue={ColorValue.BrightPurple} size={20} />}
        iconPosition="left"
        onClick={onPrev}
      >
        Back
      </TextButton>
    );

  return (
    <ResponsiveContainer className={isHidden ? styles.hide : undefined}>
      <div className={styles.containerInner}>
        <TinyLabel
          className={styles.title}
          colorClass={ColorClass.Primary}
          textAlign="center"
          textTransform="uppercase"
        >
          How does Formfunction work
        </TinyLabel>
        <div className={styles.containerInnerAnim}>
          <Header2
            className={styles.header}
            colorClass={ColorClass.Primary}
            textAlign="center"
          >
            {title}
          </Header2>
          <Subheader
            className={styles.subheader}
            colorClass={ColorClass.Primary}
            textAlign="center"
          >
            {description}
          </Subheader>
          <div className={styles.body}>{children}</div>
        </div>
        <div className={styles.nextButton}>{nextButton}</div>
        <div className={styles.prevButton}>{prevButton}</div>
      </div>
    </ResponsiveContainer>
  );
}
