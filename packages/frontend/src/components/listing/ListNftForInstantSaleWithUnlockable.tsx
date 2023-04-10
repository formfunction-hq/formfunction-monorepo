import styles from "css/listing/ListNftForInstantSaleWithUnlockable.module.css";
import graphql from "babel-plugin-relay/macro";
import TextButton from "components/buttons/TextButton";
import ListButton from "components/listing/ListButton";
import useCreateUnlockableContext from "hooks/useCreateUnlockableContext";
import useListingContext from "hooks/useListingContext";
import { useFragment } from "react-relay";
import FontClass from "types/enums/FontClass";
import ListingStep from "types/enums/ListingStep";
import TextButtonTheme from "types/enums/TextButtonTheme";
import AddUnlockableInputs from "components/listing/AddUnlockableInputs";
import { ListNftForInstantSaleWithUnlockable_MetadataAccount$key } from "components/listing/__generated__/ListNftForInstantSaleWithUnlockable_MetadataAccount.graphql";
import useListNftForSale from "hooks/useListNftForSale";
import { notify } from "components/toast/notifications";
import ListingType from "types/enums/ListingType";

const fragment = graphql`
  fragment ListNftForInstantSaleWithUnlockable_MetadataAccount on MetadataAccount {
    ...useListNftForSale_MetadataAccount
  }
`;

type Props = {
  isLoading: boolean;
  metadataAccount: ListNftForInstantSaleWithUnlockable_MetadataAccount$key;
  onHide: () => void;
  setIsLoading: (val: boolean) => void;
};

export default function ListNftForInstantSaleWithUnlockable({
  isLoading,
  metadataAccount,
  onHide,
  setIsLoading,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { listNftForSale } = useListNftForSale(metadataAccountData);
  const { setStep, setEnableUnlockable } = useListingContext();
  const { resetCreateUnlockableInputState, hasError } =
    useCreateUnlockableContext();

  return (
    <>
      <AddUnlockableInputs />
      <div className={styles.buttons}>
        <ListButton
          disabled={hasError}
          isLoading={isLoading}
          onClick={() => {
            setIsLoading(true);
            listNftForSale({
              listingType: ListingType.InstantSale,
              onCompleted: (txid: string) => {
                notify({ message: "Successfully listed!", txid });
                setIsLoading(false);
                onHide();
              },
              setIsLoading,
            });
          }}
        >
          List for instant sale
        </ListButton>
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
          disabled={isLoading}
          fontClass={FontClass.NavLink}
          onClick={() => {
            resetCreateUnlockableInputState();
            setEnableUnlockable(false);
            setStep(ListingStep.Setup);
          }}
        >
          Nevermind, go back
        </TextButton>
      </div>
    </>
  );
}
