import { PublicKey } from "@solana/web3.js";
import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import TextButton from "components/buttons/TextButton";
import GenericModal from "components/modal/GenericModal";
import { TransferModalMutation } from "components/modal/__generated__/TransferModalMutation.graphql";
import { TransferModal_MetadataAccount$key } from "components/modal/__generated__/TransferModal_MetadataAccount.graphql";
import { notify } from "components/toast/notifications";
import styles from "css/modal/TransferModal.module.css";
import useSolanaContext from "hooks/useSolanaContext";
import { useState } from "react";
import { useFragment, useMutation } from "react-relay";
import invariant from "tiny-invariant";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import logIfNotProd from "utils/logIfNotProd";
import TextInput from "components/input/TextInput";
import useTransferNft from "hooks/useTransferNft";
import isPublicKey from "formfn-shared/dist/utils/solana/isPublicKey";
import ErrorMessage from "components/text/ErrorMessage";
import usePreventRefresh from "hooks/usePreventRefresh";
import PrimaryAndSecondaryButtonContainerForModal from "components/buttons/PrimaryAndSecondaryButtonContainerForModal";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useViewerId from "hooks/useViewerId";

const mutation = graphql`
  mutation TransferModalMutation(
    $insertNftTransactionInput: InsertNftTransactionInput!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    insertNftTransaction(input: $insertNftTransactionInput) {
      updatedMetadataAccount {
        ...NftPageContent_MetadataAccount
      }
    }
  }
`;

const fragment = graphql`
  fragment TransferModal_MetadataAccount on MetadataAccount {
    mint
    nft {
      creatorId
      ownerId
    }
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: TransferModal_MetadataAccount$key;
  onHide: () => void;
};

export default function TransferModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const viewerId = useViewerId();
  const [commit] = useMutation<TransferModalMutation>(mutation);
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const { anchorWallet } = useSolanaContext();
  const [destination, setDestination] = useState("");
  const transferNft = useTransferNft();
  const onHideInner = () => {
    setDestination("");
    onHide();
  };
  usePreventRefresh(isShown && isLoading);
  const hasError = !isPublicKey(destination);

  return (
    <GenericModal
      description="Transfer this NFT to another wallet."
      isShown={isShown}
      onHide={onHideInner}
      title="Transfer"
    >
      <div className={styles.body}>
        <div className={styles.destinationInput}>
          <TextInput
            hasError={showErrors && hasError}
            value={destination}
            onChange={setDestination}
            placeholder="Enter Solana wallet address"
          />
        </div>
        {showErrors && hasError && (
          <ErrorMessage fontClass={FontClass.Body1}>
            Please enter a valid Solana address.
          </ErrorMessage>
        )}
        <PrimaryAndSecondaryButtonContainerForModal>
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            className={styles.burnButton}
            disabled={destination === ""}
            fontClass={FontClass.NavLink}
            onClick={async () => {
              invariant(anchorWallet != null);

              if (!isPublicKey(destination)) {
                setShowErrors(true);
                return;
              }

              setIsLoading(true);

              const { createdAta, txid } = await transferNft(
                metadataAccountData.mint,
                new PublicKey(destination)
              );

              if (txid == null) {
                setIsLoading(false);
                return;
              }

              const mintKey = new PublicKey(metadataAccountData.mint);
              commit({
                onCompleted: () => {
                  notify({
                    message: "Successfully transferred!",
                    txid,
                  });
                  setIsLoading(false);
                  onHideInner();
                },
                onError: (e) => {
                  logIfNotProd("error transferring (graphql)", e);
                  notifyUnexpectedError();
                },
                variables: {
                  insertNftTransactionInput: {
                    creatorId: metadataAccountData.nft.creatorId,
                    fromUserId: metadataAccountData.nft.ownerId,
                    ixIndex: createdAta ? 1 : 0,
                    mint: mintKey.toString(),
                    toUserId: destination,
                    txid,
                    type: "Transferred",
                  },
                  unlockableWinnerUserEmailInput: {
                    viewerId,
                  },
                },
              });
            }}
            isLoading={isLoading}
          >
            Transfer NFT
          </ButtonWithText>
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
            disabled={isLoading}
            fontClass={FontClass.NavLink}
            onClick={onHideInner}
          >
            Nevermind
          </TextButton>
        </PrimaryAndSecondaryButtonContainerForModal>
      </div>
    </GenericModal>
  );
}
