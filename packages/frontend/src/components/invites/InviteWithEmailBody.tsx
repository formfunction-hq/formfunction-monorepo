import graphql from "babel-plugin-relay/macro";
import { InvitesBodyQuery$variables } from "components/pages/invites/__generated__/InvitesBodyQuery.graphql";
import { useFragment } from "react-relay";
import useSendCreatorInvites from "hooks/invites-page/useSendCreatorInvites";
import { notify } from "components/toast/notifications";
import { InviteWithEmailBody_CreatorInvite_aggregate$key } from "components/invites/__generated__/InviteWithEmailBody_CreatorInvite_aggregate.graphql";
import GenericInviteBody from "components/invites/GenericInviteBody";
import isValidEmail from "formfn-shared/dist/utils/validation/isValidEmail";
import notifyErrorMessageFromError from "components/toast/notifyErrorMessageFromError";

const fragment = graphql`
  fragment InviteWithEmailBody_CreatorInvite_aggregate on CreatorInvite_aggregate {
    aggregate {
      count
    }
  }
`;

type Props = {
  CreatorInvite_aggregate: InviteWithEmailBody_CreatorInvite_aggregate$key;
  backButton: JSX.Element;
  queryVariables: InvitesBodyQuery$variables;
};

export default function InviteWithEmailBody({
  CreatorInvite_aggregate,
  backButton,
  queryVariables,
}: Props) {
  const creatorInviteAggregateData = useFragment(
    fragment,
    CreatorInvite_aggregate
  );
  const numInvites = creatorInviteAggregateData?.aggregate?.count ?? 0;
  const { sendCreatorInvites, requestInFlight } = useSendCreatorInvites(
    numInvites,
    queryVariables
  );

  const onClickInvite = async (email: string, clearText: () => void) => {
    if (!isValidEmail(email)) {
      notify({
        message: `Please enter a valid email`,
        type: "error",
      });
      return;
    }

    sendCreatorInvites({
      onCompleted: (response) => {
        notify({
          message: `Invite to ${response.sendCreatorInvites.sentEmails[0]} sent successfully!`,
        });
        clearText();
      },
      onError: notifyErrorMessageFromError,
      variables: {
        input: {
          emails: [email],
          userIdsOrUsernames: [],
        },
      },
    });
  };

  return (
    <GenericInviteBody
      backButton={backButton}
      buttonDisabled={numInvites === 0}
      title="Enter their email:"
      description={
        "We'll send them an email invite to join Formfunction as a" +
        " creator. If you don't have their email, please ask them to" +
        " register an account on Formfunction first. Then refresh this page and" +
        " choose “Yes” in the first step. "
      }
      inputPlaceholder="name@email.com"
      onClickInvite={onClickInvite}
      isLoading={requestInFlight}
    />
  );
}
