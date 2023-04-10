import GenericModal from "components/modal/GenericModal";
import AudienceSelectInput from "components/input/AudienceSelectInput";
import useListEditionsContext from "hooks/useListEditionsContext";
import { ListEditionsContextProvider } from "context/ListEditionsContext";
import { UserSearchContextProvider } from "context/UserSearchContext";
import graphql from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { AddToAllowlistModalMutation } from "components/modal/__generated__/AddToAllowlistModalMutation.graphql";
import FlexBox from "components/layout/FlexBox";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import { AddToAllowlistModal_MetadataAccount$key } from "components/modal/__generated__/AddToAllowlistModal_MetadataAccount.graphql";
import { notify } from "components/toast/notifications";
import notifyErrorMessageFromError from "components/toast/notifyErrorMessageFromError";

const fragment = graphql`
  fragment AddToAllowlistModal_MetadataAccount on MetadataAccount {
    mint
  }
`;

const mutation = graphql`
  mutation AddToAllowlistModalMutation($input: AddAllowlistAddressesInput!) {
    EditionsMutations {
      addAllowlistAddresses(input: $input) {
        addedAddresses
      }
    }
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: AddToAllowlistModal_MetadataAccount$key;
  onHide: () => void;
};

function Inner({
  metadataAccount,
  onHide,
}: {
  metadataAccount: AddToAllowlistModal_MetadataAccount$key;
  onHide: () => void;
}) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const [commit, inFlight] = useMutation<AddToAllowlistModalMutation>(mutation);

  const {
    advancedOptions: {
      allowlistAddresses,
      activeAudienceInputOption,
      allowlistAddressesFreeform,
      setActiveAudienceInputOption,
      setAllowlistAddressesFreeform,
    },
    errors,
    showErrors,
  } = useListEditionsContext();

  return (
    <FlexBox flexDirection="column" gap={32} alignItems="center">
      <AudienceSelectInput
        activeAudienceInputOption={activeAudienceInputOption}
        hasError={showErrors && errors.allowlistAddresses != null}
        setActiveAudienceInputOption={setActiveAudienceInputOption}
        freeformAddresses={allowlistAddressesFreeform}
        setFreeformAddresses={setAllowlistAddressesFreeform}
      />
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        fontClass={FontClass.NavLink}
        isLoading={inFlight}
        onClick={() => {
          commit({
            onCompleted: () => {
              notify({ message: "Addresses added!", type: "info" });
              onHide();
            },
            onError: notifyErrorMessageFromError,
            variables: {
              input: {
                addresses: allowlistAddresses,
                masterEditionMint: metadataAccountData.mint,
              },
            },
          });
        }}
      >
        Submit
      </ButtonWithText>
    </FlexBox>
  );
}

export default function AddToAllowlistModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  return (
    <GenericModal
      maxWidth={900}
      isShown={isShown}
      onHide={onHide}
      title="Add to allowlist"
      description={
        "You can add more wallets to the allowlist while the allowlist phase is ongoing " +
        "or not started. You can't remove any wallets that have already been added to the allowlist."
      }
    >
      <UserSearchContextProvider>
        <ListEditionsContextProvider>
          <Inner metadataAccount={metadataAccount} onHide={onHide} />
        </ListEditionsContextProvider>
      </UserSearchContextProvider>
    </GenericModal>
  );
}
