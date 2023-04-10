import graphql from "babel-plugin-relay/macro";
import useSolanaContext from "hooks/useSolanaContext";
import { useMutation } from "react-relay";
import { NewAccountSetupModalUserMutation } from "components/modal/__generated__/NewAccountSetupModalUserMutation.graphql";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import GenericAccountSetupModal from "components/modal/GenericAccountSetupModal";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import trackMixpanelEvent from "utils/mixpanel/trackMixpanelEvent";
import MixpanelEvent from "types/enums/MixpanelEvent";

const mutation = graphql`
  mutation NewAccountSetupModalUserMutation(
    $object: User_insert_input!
    $on_conflict: User_on_conflict!
  ) {
    insert_User_one(object: $object, on_conflict: $on_conflict) {
      email
      hasCompletedSignup
      id
      username
    }
  }
`;

type Props = {
  isShown: boolean;
  onHide: () => void;
};

export default function NewAccountSetupModal({
  isShown,
  onHide,
}: Props): JSX.Element {
  const { anchorWallet } = useSolanaContext();
  const [commit] = useMutation<NewAccountSetupModalUserMutation>(mutation);

  const onCreateAccount = async (
    setIsLoading: (isLoading: boolean) => void,
    setErrorMessage: (errorMessage: Maybe<ErrorMessageMsg>) => void,
    email: string,
    username: string
  ) => {
    commit({
      onCompleted: () => {
        setIsLoading(false);
        trackMixpanelEvent(MixpanelEvent.SignUp, {
          source: "New account setup modal",
        });
      },
      onError: (e) => {
        setIsLoading(false);
        if (e.message.includes("User_username_key")) {
          setErrorMessage(ErrorMessageMsg.UsernameTaken);
        } else if (e.message.includes("User_email_key")) {
          setErrorMessage(ErrorMessageMsg.EmailTaken);
        } else {
          setErrorMessage(ErrorMessageMsg.UnexpectedError);
        }
      },
      updater: (store) => {
        const publicKey = anchorWallet!.publicKey.toString();
        const record = store.get(publicKey);
        const root = store.getRoot();
        if (record != null) {
          root.setLinkedRecord(record, "User_by_pk", {
            id: publicKey,
          });
        }
      },
      variables: {
        object: {
          email,
          hasCompletedSignup: true,
          id: anchorWallet!.publicKey.toString(),
          username,
        },
        on_conflict: {
          constraint: "User_pkey",
          update_columns: ["email", "username", "hasCompletedSignup"],
        },
      },
    });
  };

  return (
    <GenericAccountSetupModal
      isShown={isShown}
      onHide={onHide}
      onCreateAccount={onCreateAccount}
    />
  );
}
