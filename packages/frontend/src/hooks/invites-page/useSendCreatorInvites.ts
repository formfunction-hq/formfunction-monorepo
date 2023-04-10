import graphql from "babel-plugin-relay/macro";
import { useMutation, UseMutationConfig } from "react-relay";
import { useSendCreatorInvitesMutation } from "hooks/invites-page/__generated__/useSendCreatorInvitesMutation.graphql";
import { InvitesBodyQuery$variables } from "components/pages/invites/__generated__/InvitesBodyQuery.graphql";

const mutation = graphql`
  mutation useSendCreatorInvitesMutation($input: SendCreatorInvitesInput!) {
    sendCreatorInvites(input: $input) {
      convertedUserIds
      sentEmails
    }
  }
`;

export default function useSendCreatorInvites(
  numInvites: number,
  queryVariables: InvitesBodyQuery$variables
) {
  const [commit, requestInFlight] =
    useMutation<useSendCreatorInvitesMutation>(mutation);

  return {
    requestInFlight,
    sendCreatorInvites: (
      config: UseMutationConfig<useSendCreatorInvitesMutation>
    ) =>
      commit({
        ...config,
        updater: (store, data) => {
          const { convertedUserIds, sentEmails } = data.sendCreatorInvites;
          const numInvitesUsed = convertedUserIds.length + sentEmails.length;
          const root = store.getRoot();
          const aggregateQuery = root.getLinkedRecord(
            "CreatorInvite_aggregate",
            queryVariables
          );
          const aggregate = aggregateQuery!.getLinkedRecord("aggregate");
          aggregate!.setValue(numInvites - numInvitesUsed, "count");
        },
      }),
  };
}
