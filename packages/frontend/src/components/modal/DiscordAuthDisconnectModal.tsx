import graphql from "babel-plugin-relay/macro";
import styles from "css/modal/DiscordAuthModal.module.css";
import GenericModal from "components/modal/GenericModal";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import Body1 from "components/text/Body1";
import { useFragment, useMutation } from "react-relay";
import { DiscordAuthDisconnectModalDisconnectMutation } from "components/modal/__generated__/DiscordAuthDisconnectModalDisconnectMutation.graphql";
import { DiscordAuthDisconnectModal_User$key } from "components/modal/__generated__/DiscordAuthDisconnectModal_User.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useState } from "react";
import useDiscordAuthContext from "hooks/useDiscordAuthContext";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

const disconnectSocialNetworkMutation = graphql`
  mutation DiscordAuthDisconnectModalDisconnectMutation(
    $input: DisconnectSocialNetworkInput!
  ) {
    disconnectSocialNetwork(input: $input) {
      authLink
    }
  }
`;

const fragment = graphql`
  fragment DiscordAuthDisconnectModal_User on User {
    id
  }
`;

type Props = {
  user: DiscordAuthDisconnectModal_User$key;
};

export default function DiscordAuthDisconnectModal({
  user,
}: Props): Maybe<JSX.Element> {
  const {
    isDiscordAuthDisconnectModalShown,
    setIsDiscordAuthDisconnectModalShown,
  } = useDiscordAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const userData = useFragment(fragment, user);
  const [disconnectSocialNetwork] =
    useMutation<DiscordAuthDisconnectModalDisconnectMutation>(
      disconnectSocialNetworkMutation
    );

  return (
    <GenericModal
      className={styles.modal}
      isShown={isDiscordAuthDisconnectModalShown}
      onHide={() => {
        setIsDiscordAuthDisconnectModalShown(false);
      }}
      title="Disconnect Discord?"
    >
      <Body1 className={styles.subtext} colorClass={ColorClass.Secondary}>
        You can do this if you want to link a new Discord account to your
        profile.
      </Body1>
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        className={styles.button}
        fontClass={FontClass.NavLink}
        isLoading={isLoading}
        onClick={() => {
          setIsLoading(true);
          disconnectSocialNetwork({
            onCompleted: () => window.location.reload(),
            onError: () => {
              notifyUnexpectedError();
              setIsLoading(false);
            },
            variables: {
              input: {
                socialNetworkType: "Discord",
                userId: userData.id,
              },
            },
          });
        }}
      >
        Confirm
      </ButtonWithText>
    </GenericModal>
  );
}
