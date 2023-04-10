import graphql from "babel-plugin-relay/macro";
import { notify } from "components/toast/notifications";
import { useFragment } from "react-relay";
import useSendCreatorInvites from "hooks/invites-page/useSendCreatorInvites";
import { InviteExistingUserAsCreatorBody_CreatorInvite_aggregate$key } from "components/invites/__generated__/InviteExistingUserAsCreatorBody_CreatorInvite_aggregate.graphql";
import dayjs from "utils/dates/dayjsex";
import useUserContext from "hooks/useUserContext";
import getCreatorInvitesAggregateQueryVariables from "utils/invites/getCreatorInvitesAggregateQueryVariables";
import GenericInviteBody from "components/invites/GenericInviteBody";
import isValidUsername from "formfn-shared/dist/utils/validation/isValidUsername";
import isPublicKey from "formfn-shared/dist/utils/solana/isPublicKey";
import notifyErrorMessageFromError from "components/toast/notifyErrorMessageFromError";

const fragment = graphql`
  fragment InviteExistingUserAsCreatorBody_CreatorInvite_aggregate on CreatorInvite_aggregate {
    aggregate {
      count
    }
  }
`;

type Props = {
  CreatorInvite_aggregate: InviteExistingUserAsCreatorBody_CreatorInvite_aggregate$key;
  backButton: JSX.Element;
  currentTime: dayjs.Dayjs;
};

export default function InviteExistingUserAsCreatorBody({
  CreatorInvite_aggregate,
  backButton,
  currentTime,
}: Props): JSX.Element {
  const { user } = useUserContext();
  const creatorInviteAggregateData = useFragment(
    fragment,
    CreatorInvite_aggregate
  );
  const numInvites = creatorInviteAggregateData?.aggregate?.count ?? 0;
  const queryVariables = getCreatorInvitesAggregateQueryVariables(
    currentTime,
    user!.id
  );
  const { sendCreatorInvites, requestInFlight } = useSendCreatorInvites(
    numInvites,
    queryVariables
  );

  const onClickInvite = async (
    userIdOrUsername: string,
    clearText: () => void
  ) => {
    if (!isPublicKey(userIdOrUsername) && !isValidUsername(userIdOrUsername)) {
      notify({
        message: `Please enter a valid username/address`,
        type: "error",
      });
      return;
    }

    sendCreatorInvites({
      onCompleted: (response) => {
        notify({
          message: `Invite to ${response.sendCreatorInvites.convertedUserIds[0]} sent successfully!`,
        });
        clearText();
      },
      onError: notifyErrorMessageFromError,
      variables: {
        input: {
          emails: [],
          userIdsOrUsernames: [userIdOrUsername],
        },
      },
    });
  };

  return (
    <GenericInviteBody
      backButton={backButton}
      buttonDisabled={numInvites === 0}
      title="Enter their Formfunction username or wallet address:"
      description="Make sure this is the username or wallet address that they want to use"
      inputPlaceholder="Enter their username or wallet address"
      onClickInvite={onClickInvite}
      isLoading={requestInFlight}
    />
  );
}
