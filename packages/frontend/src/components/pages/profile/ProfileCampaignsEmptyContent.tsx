import styles from "css/pages/profile/ProfileCampaignsEmptyContent.module.css";
import ButtonWithText from "components/buttons/ButtonWithText";
import FlexBox from "components/layout/FlexBox";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import Body1 from "components/text/Body1";

type Props = {
  buttonHref: string;
  buttonText: string;
  description: string;
  imageSrc: string;
};

export default function ProfileCampaignsEmptyContent({
  buttonHref,
  buttonText,
  description,
  imageSrc,
}: Props) {
  return (
    <FlexBox flexDirection="column" alignItems="center">
      <img className={styles.image} src={imageSrc} />
      <Body1
        className={styles.emptyDescription}
        colorClass={ColorClass.Primary}
        textAlign="center"
      >
        {description}
      </Body1>
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        className={styles.emptyButton}
        fontClass={FontClass.NavLink}
        href={buttonHref}
        type="link_internal"
      >
        {buttonText}
      </ButtonWithText>
    </FlexBox>
  );
}
