import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { AcceptInviteBodyQuery } from "components/pages/invites/__generated__/AcceptInviteBodyQuery.graphql";
import AcceptInviteAccountSetupModal from "components/modal/AcceptInviteAccountSetupModal";
import getImgixUrl from "utils/getImgixUrl";
import GenericPageBodyWithGraphic from "components/misc/GenericPageBodyWithGraphic";
import dayjs from "utils/dates/dayjsex";
import { DEFAULT_INVITE_LINK_EXPIRY_DURATION } from "formfn-shared/dist/constants/InvitesConstants";
import DisconnectWalletButton from "components/buttons/DisconnectWalletButton";
import useUserContext from "hooks/useUserContext";
import Page404Content from "components/pages/errors/Page404Content";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";

const query = graphql`
  query AcceptInviteBodyQuery($where: CreatorInvite_bool_exp!) {
    CreatorInvite(where: $where) {
      inviteLinkExpirationTime
      timeAccepted
      receiverEmail
    }
  }
`;

type Props = {
  inviteLinkToken: string;
};

function LinkExpired() {
  const img = getImgixUrl(
    "illustrations/stressed-person-using-computer-at-desk.png"
  );
  return (
    <GenericPageBodyWithGraphic
      imgSrc={img}
      primaryText="Your creator invite expired :("
      secondaryText={`Invites expire ${DEFAULT_INVITE_LINK_EXPIRY_DURATION.asDays()} days after they are sent.`}
    />
  );
}

function AlreadyAccepted() {
  const img = getImgixUrl("illustrations/website-empty-pages.png");
  return (
    <GenericPageBodyWithGraphic
      imgSrc={img}
      primaryText="This invite has already been accepted!"
    />
  );
}

function UserAlreadyConnectedToAccount() {
  const img = getImgixUrl("illustrations/people-celebrating-online.png");
  return (
    <GenericPageBodyWithGraphic
      imgSrc={img}
      primaryText={
        "To accept your creator invite, please sign in with a" +
        " wallet that is not connected to an existing Formfunction account!"
      }
      button={<DisconnectWalletButton buttonStyle="ButtonWithText" />}
    />
  );
}

export default function AcceptInviteBody({ inviteLinkToken }: Props) {
  const { user } = useUserContext();
  const invitesQueryData = useLazyLoadQuery<AcceptInviteBodyQuery>(query, {
    where: {
      inviteLinkToken: { _eq: inviteLinkToken },
    },
  });
  const currentTime = dayjs();
  if (invitesQueryData.CreatorInvite[0] == null) {
    return <Page404Content />;
  }

  const { inviteLinkExpirationTime, receiverEmail, timeAccepted } =
    invitesQueryData.CreatorInvite[0];

  if (timeAccepted != null) {
    return <AlreadyAccepted />;
  }

  if (dayjs(inviteLinkExpirationTime).isBefore(currentTime)) {
    return <LinkExpired />;
  }

  // Wallet loaded but user not loaded yet, show spinner
  if (user === undefined) {
    return <LoadingSpinner colorValue={ColorValue.BrightPurple} />;
  }

  if (user != null) {
    return <UserAlreadyConnectedToAccount />;
  }

  return (
    <AcceptInviteAccountSetupModal
      inviteLinkToken={inviteLinkToken}
      receiverEmail={receiverEmail!}
    />
  );
}
