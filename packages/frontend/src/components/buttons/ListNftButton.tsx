import styles from "css/buttons/ListNftButton.module.css";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import { useState } from "react";
import ListNftModal from "components/modal/ListNftModal";
import graphql from "babel-plugin-relay/macro";
import { ListNftButton_MetadataAccount$key } from "components/buttons/__generated__/ListNftButton_MetadataAccount.graphql";
import { useFragment } from "react-relay";
import ListNftContextProvider from "context/ListNftContextProvider";
import useListingContext from "hooks/useListingContext";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import useCreateUnlockableContext from "hooks/useCreateUnlockableContext";

const fragment = graphql`
  fragment ListNftButton_MetadataAccount on MetadataAccount {
    ...ListNftModal_MetadataAccount
    ...ListNftContextProvider_MetadataAccount
  }
`;

type Props = {
  metadataAccount: ListNftButton_MetadataAccount$key;
};

function Inner({ metadataAccount }: Props): JSX.Element {
  const [isShown, setIsShown] = useState(false);
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { resetListingInputState } = useListingContext();
  const { resetCreateNftDetailsInputState } = useCreateNftDetailsContext();
  const { resetCreateUnlockableInputState } = useCreateUnlockableContext();
  return (
    <>
      <ListNftModal
        isShown={isShown}
        metadataAccount={metadataAccountData}
        onHide={() => {
          resetListingInputState();
          resetCreateNftDetailsInputState();
          resetCreateUnlockableInputState();
          setIsShown(false);
        }}
      />
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        className={styles.button}
        fontClass={FontClass.NavLink}
        onClick={() => setIsShown(true)}
      >
        List this NFT
      </ButtonWithText>
    </>
  );
}

export default function ListNftButton({ metadataAccount }: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  return (
    <ListNftContextProvider metadataAccount={metadataAccountData}>
      <Inner metadataAccount={metadataAccount} />
    </ListNftContextProvider>
  );
}
