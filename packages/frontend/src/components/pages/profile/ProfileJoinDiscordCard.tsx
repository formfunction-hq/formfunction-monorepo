import graphql from "babel-plugin-relay/macro";
import styles from "css/pages/profile/ProfileJoinDiscordCard.module.css";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import Price from "components/text/Price";
import { useFragment } from "react-relay";
import Body1 from "components/text/Body1";
import ButtonWithText from "components/buttons/ButtonWithText";
import TextButton from "components/buttons/TextButton";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import { ProfileJoinDiscordCard_User$key } from "components/pages/profile/__generated__/ProfileJoinDiscordCard_User.graphql";
import useUpdateUserByPk from "hooks/useUpdateUserByPk";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import useDiscordAuthContext from "hooks/useDiscordAuthContext";
import ColorClass from "types/enums/ColorClass";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

const fragment = graphql`
  fragment ProfileJoinDiscordCard_User on User {
    id
    # eslint-disable-next-line relay/unused-fields
    shouldSeeDiscordOnboardingPrompt
  }
`;

type Props = {
  user: ProfileJoinDiscordCard_User$key;
};

export default function ProfileJoinDiscordCard({
  user,
}: Props): Maybe<JSX.Element> {
  const { displayDiscordAuthConnectModal } = useDiscordAuthContext();
  const { updateUserByPk } = useUpdateUserByPk();
  const userData = useFragment(fragment, user);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Price colorClass={ColorClass.Primary}>
          Join our private verified artist channels
        </Price>
        <Body1 colorClass={ColorClass.Primary}>
          Congratulations on becoming a verified artist! Claim your new verified
          artist role in our Discord server to get access to our artist-only
          channels for announcements, opportunities, and more 🎉
        </Body1>
      </div>
      <div className={styles.buttons}>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          onClick={() =>
            displayDiscordAuthConnectModal({ redirectLocation: "Profile" })
          }
        >
          Join
        </ButtonWithText>
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
          className={styles.textButton}
          fontClass={FontClass.Body1}
          onClick={() => {
            updateUserByPk({
              onCompleted: emptyFunction,
              onError: () => {
                notifyUnexpectedError();
              },
              set: { shouldSeeDiscordOnboardingPrompt: false },
              userId: userData.id,
            });
          }}
        >
          Don&apos;t show again
        </TextButton>
      </div>
    </div>
  );
}
