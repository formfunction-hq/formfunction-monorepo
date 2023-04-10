import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { RedirectLocation_enum } from "components/buttons/__generated__/ConnectSocialNetworkButtonConnectMutation.graphql";
import ConnectSocialNetworkButton from "components/buttons/ConnectSocialNetworkButton";
import { ConnectDiscordButton_User$key } from "components/buttons/__generated__/ConnectDiscordButton_User.graphql";

const fragment = graphql`
  fragment ConnectDiscordButton_User on User {
    # eslint-disable-next-line relay/unused-fields
    id

    DiscordAuth {
      discordHandle
    }

    ...ConnectSocialNetworkButton_User
  }
`;

type Props = {
  confirmationMessage?: string;
  redirectLocation: RedirectLocation_enum;
  user: ConnectDiscordButton_User$key;
};

export default function ConnectDiscordButton({
  confirmationMessage,
  redirectLocation,
  user,
}: Props): JSX.Element {
  const userData = useFragment(fragment, user);
  return (
    <ConnectSocialNetworkButton
      confirmationMessage={confirmationMessage}
      redirectLocation={redirectLocation}
      socialNetworkType="Discord"
      user={userData}
      username={userData.DiscordAuth?.discordHandle ?? null}
    />
  );
}
