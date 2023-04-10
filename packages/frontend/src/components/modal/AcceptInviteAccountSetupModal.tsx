import graphql from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import GenericAccountSetupModal from "components/modal/GenericAccountSetupModal";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { AcceptInviteAccountSetupModalMutation } from "components/modal/__generated__/AcceptInviteAccountSetupModalMutation.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import { notify } from "components/toast/notifications";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import NotifyErrorDescription from "types/enums/NotifyErrorDescription";

const mutation = graphql`
  mutation AcceptInviteAccountSetupModalMutation(
    $input: AcceptCreatorInviteInput!
  ) {
    acceptCreatorInvite(input: $input) {
      username
    }
  }
`;

type Props = {
  inviteLinkToken: string;
  receiverEmail: string;
};

export default function AcceptInviteAccountSetupModal({
  inviteLinkToken,
  receiverEmail,
}: Props) {
  const [commit] = useMutation<AcceptInviteAccountSetupModalMutation>(mutation);

  const onCreateAccount = async (
    setIsLoading: (isLoading: boolean) => void,
    _setErrorMessage: (errorMessage: Maybe<ErrorMessageMsg>) => void,
    _email: string,
    username: string
  ) => {
    commit({
      onCompleted: () => {
        notify({
          message: "Invite accepted! Heading to Explore...",
        });
        setTimeout(() => {
          window.location.href = "/explore";
        }, 1000);
      },
      onError: () => {
        setIsLoading(false);
        notifyUnexpectedError(
          NotifyErrorDescription.UnexpectedErrorTryAgainLater
        );
      },
      variables: {
        input: {
          inviteLinkToken,
          username,
        },
      },
    });
  };

  return (
    <GenericAccountSetupModal
      isShown
      onHide={emptyFunction}
      onCreateAccount={onCreateAccount}
      emailPreset={receiverEmail}
    />
  );
}
