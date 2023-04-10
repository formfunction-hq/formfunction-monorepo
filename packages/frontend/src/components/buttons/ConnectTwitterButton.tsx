import graphql from "babel-plugin-relay/macro";
import { ConnectTwitterButton_User$key } from "components/buttons/__generated__/ConnectTwitterButton_User.graphql";
import { useFragment } from "react-relay";
import { RedirectLocation_enum } from "components/buttons/__generated__/ConnectSocialNetworkButtonConnectMutation.graphql";
import ConnectSocialNetworkButton from "components/buttons/ConnectSocialNetworkButton";

const fragment = graphql`
  fragment ConnectTwitterButton_User on User {
    # eslint-disable-next-line relay/unused-fields
    id
    twitterName

    ...ConnectSocialNetworkButton_User
  }
`;

type Props = {
  confirmationMessage?: string;
  redirectLocation: RedirectLocation_enum;
  user: ConnectTwitterButton_User$key;
};

export default function ConnectTwitterButton({
  confirmationMessage,
  redirectLocation,
  user,
}: Props): JSX.Element {
  const userData = useFragment(fragment, user);

  return (
    <ConnectSocialNetworkButton
      confirmationMessage={confirmationMessage}
      redirectLocation={redirectLocation}
      socialNetworkType="Twitter"
      user={userData}
      username={userData.twitterName}
    />
  );
}
