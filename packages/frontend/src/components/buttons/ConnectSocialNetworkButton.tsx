import ButtonWithText from "components/buttons/ButtonWithText";
import CheckmarkIcon from "components/icons/CheckmarkIcon";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import styles from "css/buttons/ConnectSocialNetworkButton.module.css";
import graphql from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import {
  ConnectSocialNetworkButtonConnectMutation,
  RedirectLocation_enum,
  SocialNetworkType_enum,
} from "components/buttons/__generated__/ConnectSocialNetworkButtonConnectMutation.graphql";
import { ConnectSocialNetworkButtonDisconnectMutation } from "components/buttons/__generated__/ConnectSocialNetworkButtonDisconnectMutation.graphql";
import { useState } from "react";
import GenericConfirmationModal from "components/modal/GenericConfirmationModal";
import { ConnectSocialNetworkButton_User$key } from "components/buttons/__generated__/ConnectSocialNetworkButton_User.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import useDiscordAuthContext from "hooks/useDiscordAuthContext";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

const fragment = graphql`
  fragment ConnectSocialNetworkButton_User on User {
    id

    DiscordAuth {
      hasConnectedDiscordAccount
    }
  }
`;

const connectSocialNetworkMutation = graphql`
  mutation ConnectSocialNetworkButtonConnectMutation(
    $input: ConnectSocialNetworkInput!
  ) {
    connectSocialNetwork(input: $input) {
      authLink
    }
  }
`;

const disconnectSocialNetworkMutation = graphql`
  mutation ConnectSocialNetworkButtonDisconnectMutation(
    $input: DisconnectSocialNetworkInput!
  ) {
    disconnectSocialNetwork(input: $input) {
      authLink
    }
  }
`;

type SocialAccountButtonProps = {
  isLinked: boolean;
  onClick: () => void;
  username: Maybe<string>;
};

const SocialAccountButton = ({
  onClick,
  isLinked,
  username,
}: SocialAccountButtonProps) => (
  <ButtonWithText
    buttonTheme={ButtonTheme.BrightPurpleOutline}
    fontClass={FontClass.NavLink}
    className={styles.connectButton}
    onClick={onClick}
    icon={
      isLinked ? (
        <CheckmarkIcon colorValue={ColorValue.BrightPurple} />
      ) : undefined
    }
    iconPosition="left"
  >
    {isLinked ? `${username}` : "Connect"}
  </ButtonWithText>
);

type Props = {
  confirmationMessage?: string;
  redirectLocation: RedirectLocation_enum;
  socialNetworkType: SocialNetworkType_enum;
  user: ConnectSocialNetworkButton_User$key;
  username: Maybe<string>;
};

export default function ConnectSocialNetworkButton({
  redirectLocation,
  socialNetworkType,
  confirmationMessage = `Make sure all your changes on this page have been saved before connecting your ${socialNetworkType}.`,
  user,
  username,
}: Props): Maybe<JSX.Element> {
  const {
    displayDiscordAuthConnectModal,
    setIsDiscordAuthDisconnectModalShown,
  } = useDiscordAuthContext();
  const userData = useFragment(fragment, user);
  const [connectSocialNetwork, isConnectMutationInFlight] =
    useMutation<ConnectSocialNetworkButtonConnectMutation>(
      connectSocialNetworkMutation
    );
  const [disconnectSocialNetwork, isDisconnectMutationInFlight] =
    useMutation<ConnectSocialNetworkButtonDisconnectMutation>(
      disconnectSocialNetworkMutation
    );

  const [isConnectConfirmationModalShown, setIsConnectConfirmationModalShown] =
    useState(false);
  const [
    isDisconnectConfirmationModalShown,
    setIsDisconnectConfirmationModalShown,
  ] = useState(false);

  const onClickConnect = () => {
    connectSocialNetwork({
      onCompleted: (response) => {
        window.location.replace(response.connectSocialNetwork.authLink);
      },
      onError: () => notifyUnexpectedError(),
      variables: {
        input: {
          redirectLocation,
          socialNetworkType,
          userId: userData.id,
        },
      },
    });
  };
  const onClickDisconnect = async () => {
    disconnectSocialNetwork({
      onCompleted: () => window.location.reload(),
      onError: () => notifyUnexpectedError(),
      variables: {
        input: {
          socialNetworkType,
          userId: userData.id,
        },
      },
    });
  };

  const isLinked = username != null && username !== "";

  switch (socialNetworkType) {
    case "Twitter":
    case "Instagram":
      return (
        <>
          <GenericConfirmationModal
            bodyText={confirmationMessage}
            buttonText="Connect"
            isLoading={isConnectMutationInFlight}
            isShown={isConnectConfirmationModalShown}
            onConfirmClick={onClickConnect}
            onHide={() => setIsConnectConfirmationModalShown(false)}
            title={`Connect ${socialNetworkType} account?`}
          />
          <GenericConfirmationModal
            bodyText={`Are you sure you want to disconnect your ${socialNetworkType} account?`}
            isLoading={isDisconnectMutationInFlight}
            isShown={isDisconnectConfirmationModalShown}
            onConfirmClick={onClickDisconnect}
            onHide={() => setIsDisconnectConfirmationModalShown(false)}
            title={`Disconnect ${socialNetworkType}?`}
          />
          <SocialAccountButton
            isLinked={isLinked}
            onClick={() =>
              isLinked
                ? setIsDisconnectConfirmationModalShown(true)
                : setIsConnectConfirmationModalShown(true)
            }
            username={username}
          />
        </>
      );
    case "Discord": {
      const hasLinkedDiscord =
        userData.DiscordAuth != null &&
        userData.DiscordAuth.hasConnectedDiscordAccount;
      // Note: The DiscordAuth modals are rendered in the EditProfileForm,
      // because the connect modal can also be opened from directly within that
      // component.
      return (
        <SocialAccountButton
          isLinked={hasLinkedDiscord}
          onClick={() =>
            hasLinkedDiscord
              ? setIsDiscordAuthDisconnectModalShown(true)
              : displayDiscordAuthConnectModal({ redirectLocation })
          }
          username={username}
        />
      );
    }
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(socialNetworkType);
  }
}
