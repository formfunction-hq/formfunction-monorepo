import graphql from "babel-plugin-relay/macro";
import GenericConfirmationModal from "components/modal/GenericConfirmationModal";
import { StopMintingModal_MetadataAccount$key } from "components/modal/__generated__/StopMintingModal_MetadataAccount.graphql";
import { notify } from "components/toast/notifications";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useStopMintingForEditions from "hooks/useStopMintingForEditions";
import { useState } from "react";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment StopMintingModal_MetadataAccount on MetadataAccount {
    ...useStopMintingForEditions_MetadataAccount
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: StopMintingModal_MetadataAccount$key;
  onHide: () => void;
};

export default function StopMintingModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { stopMintingForEditions } =
    useStopMintingForEditions(metadataAccountData);
  const [isLoading, setIsLoading] = useState(false);

  const onConfirmClick = () => {
    stopMintingForEditions({
      onCompleted: (txid: string) => {
        notify({
          message: "You have stopped minting for these editions",
          txid,
        });
        setIsLoading(false);
        onHide();
      },
      onError: () => {
        notifyUnexpectedError();
      },
      setIsLoading,
    });
  };

  return (
    <GenericConfirmationModal
      bodyText={
        "If you have extra editions that are not selling, you can reduce the " +
        "supply for your holders by stopping the mint. The total number of editions " +
        "will be the number currently minted. You cannot resume minting after it has been stopped."
      }
      buttonText="Stop minting"
      cancelButtonText="Nevermind"
      isLoading={isLoading}
      isShown={isShown}
      onHide={onHide}
      onConfirmClick={onConfirmClick}
      title="Stop minting"
    />
  );
}
