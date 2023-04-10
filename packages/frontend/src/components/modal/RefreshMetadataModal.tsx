import graphql from "babel-plugin-relay/macro";
import GenericConfirmationModal from "components/modal/GenericConfirmationModal";
import { RefreshMetadataModalMutation } from "components/modal/__generated__/RefreshMetadataModalMutation.graphql";
import { RefreshMetadataModal_MetadataAccount$key } from "components/modal/__generated__/RefreshMetadataModal_MetadataAccount.graphql";
import Body1 from "components/text/Body1";
import NoWrap from "components/text/NoWrap";
import { notify } from "components/toast/notifications";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import { useFragment, useMutation } from "react-relay";
import ColorClass from "types/enums/ColorClass";

const mutation = graphql`
  mutation RefreshMetadataModalMutation($input: RefreshMetadataInput!) {
    refreshMetadata(input: $input) {
      id
    }
  }
`;

const fragment = graphql`
  fragment RefreshMetadataModal_MetadataAccount on MetadataAccount {
    mint
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: RefreshMetadataModal_MetadataAccount$key;
  onHide: () => void;
};

export default function RefreshMetadataModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const [commit, inFlight] =
    useMutation<RefreshMetadataModalMutation>(mutation);

  const bodyText = (
    <Body1 colorClass={ColorClass.Secondary} textAlign="center">
      Sync transactions and metadata to ensure your view of this NFT is{" "}
      <NoWrap>up-to-date</NoWrap>. This may take a while.
    </Body1>
  );

  return (
    <GenericConfirmationModal
      bodyText={bodyText}
      buttonText="Sync"
      isShown={isShown}
      isLoading={inFlight}
      onConfirmClick={() => {
        commit({
          onCompleted: () => {
            notify({
              description: "Reloading the page...",
              message: "Succeeded!",
              type: "info",
            });
            setTimeout(() => {
              window.location.reload();
            }, 500);
          },
          onError: () => {
            notifyUnexpectedError();
          },
          variables: {
            input: {
              mint: metadataAccountData.mint,
            },
          },
        });
      }}
      onHide={onHide}
      title="Sync NFT"
    />
  );
}
