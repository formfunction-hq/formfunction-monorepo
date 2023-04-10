import ButtonWithText from "components/buttons/ButtonWithText";
import FlexBox from "components/layout/FlexBox";
import Body1 from "components/text/Body1";
import Header2 from "components/text/Header2";
import Imgix from "react-imgix";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import getImgixUrl from "utils/getImgixUrl";
import styles from "css/pages/campaign/edit/CampaignDraftGate.module.css";

type ButtonProps = {
  href: string;
  label: string;
};

type Props = {
  buttonProps: ButtonProps;
  heroUrl: string;
  subtitle: JSX.Element;
  title: string;
};

export default function CampaignDraftGate({
  buttonProps,
  heroUrl,
  subtitle,
  title,
}: Props) {
  const { label, href } = buttonProps;
  return (
    <FlexBox
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={16}
      className={styles.container}
    >
      <Header2 textAlign="center" colorClass={ColorClass.Primary}>
        {title}
      </Header2>
      <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
        {subtitle}
      </Body1>
      <Imgix src={getImgixUrl(heroUrl)} className={styles.heroImg} />
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        fontClass={FontClass.NavLink}
        type="link_internal"
        href={href}
      >
        {label}
      </ButtonWithText>
    </FlexBox>
  );
}
