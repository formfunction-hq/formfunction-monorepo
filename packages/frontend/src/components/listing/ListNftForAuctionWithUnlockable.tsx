import styles from "css/listing/ListNftForAuctionWithUnlockable.module.css";
import graphql from "babel-plugin-relay/macro";
import TextButton from "components/buttons/TextButton";
import ListButton from "components/listing/ListButton";
import { ListNftForAuctionWithUnlockable_MetadataAccount$key } from "components/listing/__generated__/ListNftForAuctionWithUnlockable_MetadataAccount.graphql";
import useCreateUnlockableContext from "hooks/useCreateUnlockableContext";
import useListingContext from "hooks/useListingContext";
import { useFragment } from "react-relay";
import FontClass from "types/enums/FontClass";
import ListingStep from "types/enums/ListingStep";
import TextButtonTheme from "types/enums/TextButtonTheme";
import AddUnlockableInputs from "components/listing/AddUnlockableInputs";
import useListNftForSale from "hooks/useListNftForSale";
import ListingType from "types/enums/ListingType";
import { notify } from "components/toast/notifications";

const fragment = graphql`
  fragment ListNftForAuctionWithUnlockable_MetadataAccount on MetadataAccount {
    ...useListNftForSale_MetadataAccount
  }
`;

type Props = {
  isLoading: boolean;
  metadataAccount: ListNftForAuctionWithUnlockable_MetadataAccount$key;
  onHide: () => void;
  setIsLoading: (val: boolean) => void;
};

export default function ListNftForAuctionWithUnlockable({
  isLoading,
  metadataAccount,
  onHide,
  setIsLoading,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { listNftForSale } = useListNftForSale(metadataAccountData);
  const { hasError, resetCreateUnlockableInputState } =
    useCreateUnlockableContext();
  const { enablePnft, getNextListingStep, setEnableUnlockable, setStep } =
    useListingContext();

  return (
    <>
      <AddUnlockableInputs includeActivationPrice />
      <div className={styles.buttons}>
        <ListButton
          disabled={hasError}
          isLoading={isLoading}
          onClick={() => {
            const nextStep = getNextListingStep();
            if (nextStep != null) {
              setStep(nextStep);
              return;
            }

            setIsLoading(true);
            listNftForSale({
              listingType: ListingType.Auction,
              onCompleted: (txid: string) => {
                notify({ message: "Successfully listed!", txid });
                setIsLoading(false);
                onHide();
              },
              setIsLoading,
            });
          }}
        >
          {enablePnft ? "Next" : "List for auction"}
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
