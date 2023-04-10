import ButtonWithText from "components/buttons/ButtonWithText";
import TextInput from "components/input/TextInput";
import styles from "css/invites/GenericInviteBody.module.css";
import { useState } from "react";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import ArtName from "components/text/ArtName";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";

type Props = {
  backButton: JSX.Element;
  buttonDisabled: boolean;
  description: string;
  inputPlaceholder: string;
  isLoading: boolean;
  onClickInvite: (text: string, clearText: () => void) => void;
  title: string;
};

export default function GenericInviteBody({
  backButton,
  buttonDisabled,
  description,
  inputPlaceholder,
  isLoading,
  onClickInvite,
  title,
}: Props) {
  const [textInput, setTextInput] = useState("");

  return (
    <div className={styles.body}>
      <div className={styles.bodyText}>
        <div className={styles.title}>
          <div className={styles.backButton}>{backButton}</div>
          <ArtName textAlign="center" colorClass={ColorClass.Primary}>
            {title}
          </ArtName>
        </div>
        <Body2
          className={styles.description}
          textAlign="center"
          colorClass={ColorClass.Secondary}
        >
          {description}
        </Body2>
      </div>
      <TextInput
        className={styles.input}
        value={textInput}
        onChange={setTextInput}
        placeholder={inputPlaceholder}
      />
      <ButtonWithText
        className={styles.inviteButton}
        fontClass={FontClass.NavLink}
        buttonTheme={ButtonTheme.PurpleGradient}
        isLoading={isLoading}
        disabled={buttonDisabled}
        onClick={() => onClickInvite(textInput, () => setTextInput(""))}
      >
        Invite to be an artist
      </ButtonWithText>
    </div>
  );
}
