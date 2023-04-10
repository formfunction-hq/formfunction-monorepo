import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import DiscordAuthConnectModal from "components/modal/DiscordAuthConnectModal";
import DiscordAuthDisconnectModal from "components/modal/DiscordAuthDisconnectModal";
import { DiscordAuthModals_User$key } from "components/modal/__generated__/DiscordAuthModals_User.graphql";

const fragment = graphql`
  fragment DiscordAuthModals_User on User {
    ...DiscordAuthConnectModal_User
    ...DiscordAuthDisconnectModal_User
  }
`;

type Props = {
  renderDisconnectModal?: boolean;
  user: DiscordAuthModals_User$key;
};

export default function DiscordAuthModals({
  user,
  renderDisconnectModal = true,
}: Props) {
  const userData = useFragment(fragment, user);
  return (
    <>
      <DiscordAuthConnectModal user={userData} />
      {renderDisconnectModal && <DiscordAuthDisconnectModal user={userData} />}
    </>
  );
}
