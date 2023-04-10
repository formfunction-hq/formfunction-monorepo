import styles from "css/listing/ListNftForInstantSale.module.css";
import isValidPrice from "utils/price/isValidPrice";
import ListingPriceInput from "components/listing/ListingPriceInput";
import ListingTagsInput from "components/listing/ListingTagsInput";
import { notify } from "components/toast/notifications";
import graphql from "babel-plugin-relay/macro";
import { ListNftForInstantSale_MetadataAccount$key } from "components/listing/__generated__/ListNftForInstantSale_MetadataAccount.graphql";
import { useFragment } from "react-relay";
import useListNftForSale from "hooks/useListNftForSale";
import useListingContext from "hooks/useListingContext";
import ListingType from "types/enums/ListingType";
import ListingInputs from "components/listing/ListingInputs";
import ListButton from "components/listing/ListButton";
import ShowAdvancedButton from "components/buttons/ShowAdvancedButton";
import ListingUnlockableToggle from "components/listing/ListingUnlockableToggle";
import ListingCurrencyError from "components/listing/ListingCurrencyError";

const fragment = graphql`
  fragment ListNftForInstantSale_MetadataAccount on MetadataAccount {
    primarySaleHappened
    ...useListNftForSale_MetadataAccount
  }
`;

type Props = {
  isLoading: boolean;
  metadataAccount: ListNftForInstantSale_MetadataAccount$key;
  onHide: () => void;
  setIsLoading: (val: boolean) => void;
};

export default function ListNftForInstantSale({
  isLoading,
  metadataAccount,
  onHide,
  setIsLoading,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { listNftForSale } = useListNftForSale(metadataAccountData);

  const {
    canAddUnlockableOrPnft,
    currencyConfig,
    enableUnlockable,
    getNextListingStep,
    price,
    setPrice,
    setStep,
    setTags,
    tags,
  } = useListingContext();

  return (
    <div className={styles.body}>
      <ListingInputs>
        <ListingPriceInput
          label="Buy now price"
          primarySaleHappened={metadataAccountData.primarySaleHappened}
          subLabel="This is the price a collector can instantly buy your NFT at."
          price={price}
          setPrice={setPrice}
        />
        <ListingCurrencyError />
        <ListingTagsInput setTags={setTags} tags={tags} />
        {canAddUnlockableOrPnft && (
          <ShowAdvancedButton>
            <ListingUnlockableToggle />
          </ShowAdvancedButton>
        )}
      </ListingInputs>
      <ListButton
        disabled={!isValidPrice(price, currencyConfig.decimals)}
        isLoading={isLoading}
        onClick={async () => {
          if (enableUnlockable) {
            const nextStep = getNextListingStep();
            if (nextStep != null) {
              setStep(nextStep);
              return;
            }
          }

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
        {enableUnlockable ? "Continue" : "Finish listing"}
      </ListButton>
    </div>
  );
}
