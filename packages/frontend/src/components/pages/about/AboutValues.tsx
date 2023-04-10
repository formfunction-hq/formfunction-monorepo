import styles from "css/pages/about/AboutValues.module.css";
import ColorClass from "types/enums/ColorClass";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import HeartIcon from "components/icons/HeartIcon";
import UsersIcon from "components/icons/UsersIcon";
import RefreshIcon from "components/icons/RefreshIcon";
import SmileyFaceIcon from "components/icons/SmileyFaceIcon";
import ChargingBatteryIcon from "components/icons/ChargingBatteryIcon";
import ColorValue from "types/enums/ColorValue";
import ArtName from "components/text/ArtName";
import Body1 from "components/text/Body1";
import LandingSection from "components/pages/landing/LandingSection";
import AboutTitleAndContent from "components/pages/about/AboutTitleAndContent";
import SvgSquareIconProps from "types/SvgSquareIconProps";

type ValuesDisplayProps = {
  Icon: ({ colorValue, size }: SvgSquareIconProps) => JSX.Element;
  description: string;
  title: string;
};

const values: Array<ValuesDisplayProps> = [
  {
    Icon: HeartIcon,
    description:
      "Creators are at the heart of our product and mission. Everything we do is meant to help creators succeed.",
    title: "Creator-obsessed",
  },
  {
    Icon: UsersIcon,
    description:
      "Since the beginning, we’ve given power to our artists and collectors through our community voting process, so they can decide how our community grows.",
    title: "Community driven",
  },
  {
    Icon: RefreshIcon,
    description:
      "We’re building a virtuous cycle where everyone wins—creators, supporters, and our team.",
    title: "Aligned incentives",
  },
];

const values2: Array<ValuesDisplayProps> = [
  {
    Icon: SmileyFaceIcon,
    description:
      "We’re making products that are intuitive and delightful to use. Design is part of our core DNA, and every experience is thoughtfully crafted.",
    title: "Focus on design & delight",
  },
  {
    Icon: ChargingBatteryIcon,
    description:
      "Our goal is to build a creator ecosystem driven by creativity and community instead of speculation and hype. We care about sustainability for the environment, for our creators, and for our team.",
    title: "Sustainability",
  },
];
const ValuesDisplay = ({
  Icon,
  description,
  title,
}: ValuesDisplayProps): JSX.Element => (
  <div className={styles.values}>
    <Icon colorValue={ColorValue.BrightPurple} size={32} />
    <ArtName textAlign="center" colorClass={ColorClass.Primary}>
      {title}
    </ArtName>
    <Body1 colorClass={ColorClass.Secondary} textAlign="center">
      {description}
    </Body1>
  </div>
);

export default function AboutValues(): JSX.Element {
  const content = (
    <div className={styles.valuesContainerOuter}>
      <div className={styles.valuesContainer}>
        {values.map((value) => (
          <ValuesDisplay key={value.title} {...value} />
        ))}
      </div>
      <div className={styles.valuesContainer}>
        {values2.map((value) => (
          <ValuesDisplay key={value.title} {...value} />
        ))}
      </div>
    </div>
  );

  return (
    <LandingSection className={styles.container}>
      <ResponsiveContainer>
        <AboutTitleAndContent content={content} title="Our Values" />
      </ResponsiveContainer>
    </LandingSection>
  );
}
