import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { RedirectLocation_enum } from "components/buttons/__generated__/ConnectSocialNetworkButtonConnectMutation.graphql";
import ConnectSocialNetworkButton from "components/buttons/ConnectSocialNetworkButton";
import { ConnectInstagramButton_User$key } from "components/buttons/__generated__/ConnectInstagramButton_User.graphql";

const fragment = graphql`
  fragment ConnectInstagramButton_User on User {
    # eslint-disable-next-line relay/unused-fields
    id
    instagramName

    ...ConnectSocialNetworkButton_User
  }
`;

type Props = {
  confirmationMessage?: string;
  redirectLocation: RedirectLocation_enum;
  user: ConnectInstagramButton_User$key;
};

export default function ConnectInstagramButton({
  confirmationMessage,
  redirectLocation,
  user,
}: Props): JSX.Element {
  const userData = useFragment(fragment, user);
  return (
    <ConnectSocialNetworkButton
      confirmationMessage={confirmationMessage}
      redirectLocation={redirectLocation}
      socialNetworkType="Instagram"
      user={userData}
      username={userData.instagramName}
    />
  );
}
