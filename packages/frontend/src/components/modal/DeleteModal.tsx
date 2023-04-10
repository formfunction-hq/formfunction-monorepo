import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import TextButton from "components/buttons/TextButton";
import GenericModal from "components/modal/GenericModal";
import { DeleteModalMutation } from "components/modal/__generated__/DeleteModalMutation.graphql";
import { DeleteModal_MetadataAccount$key } from "components/modal/__generated__/DeleteModal_MetadataAccount.graphql";
import Body1 from "components/text/Body1";
import { notify } from "components/toast/notifications";
import styles from "css/modal/DeleteModal.module.css";
import { useFragment, useMutation } from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import logIfNotProd from "utils/logIfNotProd";
import useUserContext from "hooks/useUserContext";
import PrimaryAndSecondaryButtonContainerForModal from "components/buttons/PrimaryAndSecondaryButtonContainerForModal";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useNftKind from "hooks/useNftKind";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import NotifyErrorDescription from "types/enums/NotifyErrorDescription";

const mutation = graphql`
  mutation DeleteModalMutation($input: DeleteNftInput!) {
    deleteNft(input: $input) {
      id
    }
  }
`;

const fragment = graphql`
  fragment DeleteModal_MetadataAccount on MetadataAccount {
    mint

    nft {
      numberOfStandardEditionsMinted
    }

    ...useNftKind_MetadataAccount
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: DeleteModal_MetadataAccount$key;
  onHide: () => void;
};

export default function DeleteModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const [commit, inFlight] = useMutation<DeleteModalMutation>(mutation);
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftKind = useNftKind(metadataAccountData);
  const { profileHref } = useUserContext();

  const optionalText =
    [
      NftKind.MasterEditionWithNonzeroSupply,
      NftKind.MasterEditionWithUnlimitedSupply,
    ].includes(nftKind) &&
    (metadataAccountData.nft.numberOfStandardEditionsMinted ?? 0) > 0
      ? "This NFT has standard editions minted. Deleting this NFT will also delete the standard editions. " +
        "Please be patient, this operation may take a while."
      : null;

  return (
    <GenericModal isShown={isShown} onHide={onHide} title="Delete this NFT?">
      <div className={styles.body}>
        <Body1 colorClass={ColorClass.Secondary} textAlign="center">
          Are you sure you want to delete this NFT?. After deleting it, this NFT
          will no longer be displayed on our website. This action cannot be
          undone.
          {optionalText == null ? null : (
            <>
              <br />
              <br />
              {optionalText}
            </>
          )}
        </Body1>
        <PrimaryAndSecondaryButtonContainerForModal>
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            fontClass={FontClass.NavLink}
            onClick={async () => {
              commit({
                onCompleted: () => {
                  notify({
                    message: "Successfully removed! Reloading profile...",
                  });
                  onHide();
                  setTimeout(() => {
                    // Go back to profile page so deleted NFT doesn't show anywhere
                    window.location.href = profileHref;
                  }, 1000);
                },
                onError: (e) => {
                  logIfNotProd("error deleting (graphql)", e);
                  notifyUnexpectedError(
                    NotifyErrorDescription.UnexpectedErrorContactHelpCenter
                  );
                },
                variables: {
                  input: {
                    mint: metadataAccountData.mint,
                  },
                },
              });
            }}
            isLoading={inFlight}
          >
            Remove from Formfunction
          </ButtonWithText>
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
            fontClass={FontClass.NavLink}
            onClick={onHide}
          >
            Nevermind
          </TextButton>
        </PrimaryAndSecondaryButtonContainerForModal>
      </div>
    </GenericModal>
  );
}
