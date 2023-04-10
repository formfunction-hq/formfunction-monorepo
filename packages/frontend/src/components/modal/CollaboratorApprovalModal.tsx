import { PublicKey } from "@solana/web3.js";
import graphql from "babel-plugin-relay/macro";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import ButtonWithText from "components/buttons/ButtonWithText";
import TextButton from "components/buttons/TextButton";
import LoadingSpinner from "components/loading/LoadingSpinner";
import GenericModal from "components/modal/GenericModal";
import { CollaboratorApprovalModalUpdateMutation } from "components/modal/__generated__/CollaboratorApprovalModalUpdateMutation.graphql";
import { CollaboratorApprovalModal_MetadataAccount$key } from "components/modal/__generated__/CollaboratorApprovalModal_MetadataAccount.graphql";
import Body1 from "components/text/Body1";
import { notify } from "components/toast/notifications";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import styles from "css/modal/CollaboratorApprovalModal.module.css";
import usePreventRefresh from "hooks/usePreventRefresh";
import useSolanaContext from "hooks/useSolanaContext";
import useUserContext from "hooks/useUserContext";
import { useState } from "react";
import { useFragment, useMutation } from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import formatUsername from "utils/formatUsername";
import signMetadata from "utils/solana/metaplex/signMetadata";

const fragment = graphql`
  fragment CollaboratorApprovalModal_MetadataAccount on MetadataAccount {
    id
    mint

    data {
      creators {
        address
        requestId
      }
      name
    }

    nft {
      id
      creatorId

      Creator {
        id
        username
      }
    }

    ...ListingCardForMetadata_MetadataAccount
  }
`;
const updateMutation = graphql`
  mutation CollaboratorApprovalModalUpdateMutation(
    $_set: Request_set_input!
    $pk_columns: Request_pk_columns_input!
  ) {
    update_Request_by_pk(_set: $_set, pk_columns: $pk_columns) {
      id
    }
  }
`;

function getCreatorRecordId(metadataId: string, creatorsIndex: number) {
  return `client:${metadataId}:data:creators:${creatorsIndex}`;
}

type Props = {
  isShown: boolean;
  metadataAccount: CollaboratorApprovalModal_MetadataAccount$key;
  onHide: () => void;
};

export default function CollaboratorApprovalModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const { user } = useUserContext();
  const [commitUpdate, updateInFlight] =
    useMutation<CollaboratorApprovalModalUpdateMutation>(updateMutation);
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { anchorWallet, connection } = useSolanaContext();
  const {
    nft,
    data: { creators },
  } = metadataAccountData;
  const [isLoading, setIsLoading] = useState(false);
  const creatorsIndex = creators!.findIndex(
    (creator) => creator.address === user!.id
  );
  const creator = creators![creatorsIndex];
  usePreventRefresh(isShown);
  const [showDeclineConfirmation, setShowDeclineConfirmation] = useState(false);
  const onHideAndReset = () => {
    setShowDeclineConfirmation(false);
    onHide();
  };

  const onClickApprove = async () => {
    setIsLoading(true);
    const txid = await signMetadata(
      connection,
      anchorWallet!,
      new PublicKey(metadataAccountData.mint)
    );

    if (txid == null) {
      setIsLoading(false);
      return;
    }

    commitUpdate({
      onCompleted: () => {
        notify({
          description: "You will now be listed as a collaborator for this NFT!",
          message: "You have approved this request",
        });
        setIsLoading(false);
        onHideAndReset();
      },
      onError: () => {
        notifyUnexpectedError();
        setIsLoading(false);
      },
      updater: (store) => {
        const creatorRecord = store.get(
          getCreatorRecordId(metadataAccountData.id, creatorsIndex)
        );
        creatorRecord?.setValue("Approved", "status");
      },
      variables: {
        _set: {
          status: "Approved",
        },
        pk_columns: {
          id: creator.requestId!,
        },
      },
    });
  };

  const onClickDecline = () =>
    commitUpdate({
      onCompleted: () => {
        notify({
          description: "You will not be listed as a collaborator for this NFT",
          message: "You have declined this request",
        });
        onHideAndReset();
      },
      onError: () => {
        notifyUnexpectedError();
      },
      updater: (store) => {
        const creatorRecord = store.get(
          getCreatorRecordId(metadataAccountData.id, creatorsIndex)
        );
        creatorRecord?.setValue("Rejected", "status");
      },
      variables: {
        _set: {
          status: "Rejected",
        },
        pk_columns: {
          id: creator.requestId!,
        },
      },
    });

  const normalContent = (
    <>
      <Body1 colorClass={ColorClass.Secondary} textAlign="center">
        @{formatUsername(nft.Creator?.username ?? nft.creatorId)} added you as a
        collaborator on{" "}
        <span className={FontClass.Body1SemiBold}>
          {metadataAccountData.data.name}
        </span>
        . If you accept, this NFT will also be shown on your profile and you
        will be listed as a collaborator on the NFT page.
      </Body1>
      <ListingCardForMetadata
        collaboratorsToShowWithoutApproval={[user!.id]}
        enableMaxWidth
        hideOtherInfo
        metadataAccount={metadataAccountData}
      />
      <div className={styles.buttons}>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.button}
          disabled={updateInFlight}
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          onClick={onClickApprove}
        >
          Accept
        </ButtonWithText>
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
          disabled={updateInFlight}
          fontClass={FontClass.NavLink}
          onClick={() => setShowDeclineConfirmation(true)}
        >
          {updateInFlight ? (
            <LoadingSpinner
              colorValue={ColorValue.BrightPurple}
              fontClass={FontClass.NavLink}
            />
          ) : (
            "Decline"
          )}
        </TextButton>
      </div>
    </>
  );

  const declineConfirmationContent = (
    <>
      <Body1 colorClass={ColorClass.Secondary} textAlign="center">
        If you decline, this NFT will NOT be shown on your profile and you will
        NOT be listed as a collaborator on the NFT page.
      </Body1>
      <div className={styles.declineButtons}>
        <ButtonWithText
          buttonTheme={ButtonTheme.SecondaryOutline}
          className={styles.button}
          disabled={updateInFlight}
          fontClass={FontClass.NavLink}
          onClick={() => setShowDeclineConfirmation(false)}
        >
          Cancel
        </ButtonWithText>
        <ButtonWithText
          buttonTheme={ButtonTheme.Red}
          className={styles.button}
          disabled={updateInFlight}
          fontClass={FontClass.NavLink}
          isLoading={updateInFlight}
          onClick={onClickDecline}
        >
          Decline
        </ButtonWithText>
      </div>
    </>
  );

  return (
    <GenericModal
      isShown={isShown}
      onHide={() => {
        if (isLoading || updateInFlight) {
          notify({
            duration: 2,
            message: "Please wait...",
            type: "info",
          });
          return;
        }

        onHideAndReset();
      }}
      title={
        !showDeclineConfirmation
          ? "You were added as a collaborator"
          : "Decline this request?"
      }
    >
      <div className={styles.body}>
        {!showDeclineConfirmation ? normalContent : declineConfirmationContent}
      </div>
    </GenericModal>
  );
}
