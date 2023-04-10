import styles from "css/listing/ListNftForAuction.module.css";
import { notify } from "components/toast/notifications";
import { useFragment } from "react-relay";
import AuctionTimeSection from "components/modal/AuctionTimeSection";
import ShowAdvancedButton from "components/buttons/ShowAdvancedButton";
import isValidPrice from "utils/price/isValidPrice";
import ListingTagsInput from "components/listing/ListingTagsInput";
import ListingPriceInput from "components/listing/ListingPriceInput";
import useListingContext from "hooks/useListingContext";
import ListingPnftToggle from "components/listing/ListingPnftToggle";
import useListNftForSale from "hooks/useListNftForSale";
import ListingScheduledAuction from "components/listing/ListingScheduledAuction";
import ListingType from "types/enums/ListingType";
import graphql from "babel-plugin-relay/macro";
import { ListNftForAuction_MetadataAccount$key } from "components/listing/__generated__/ListNftForAuction_MetadataAccount.graphql";
import ListingInputs from "components/listing/ListingInputs";
import ListButton from "components/listing/ListButton";
import ListingTickSizeInput from "components/listing/ListingTickSizeInput";
import ListingUnlockableToggle from "components/listing/ListingUnlockableToggle";
import ListingCurrencyError from "components/listing/ListingCurrencyError";
import ErrorMessage from "components/text/ErrorMessage";
import FontClass from "types/enums/FontClass";

const fragment = graphql`
  fragment ListNftForAuction_MetadataAccount on MetadataAccount {
    primarySaleHappened
    ...useListNftForSale_MetadataAccount
  }
`;

type Props = {
  isLoading: boolean;
  metadataAccount: ListNftForAuction_MetadataAccount$key;
  onHide: () => void;
  setIsLoading: (val: boolean) => void;
};

export default function ListNftForAuction({
  isLoading,
  setIsLoading,
  onHide,
  metadataAccount,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { listNftForSale } = useListNftForSale(metadataAccountData);

  const {
    auctionTime,
    canAddUnlockableOrPnft,
    currencyConfig,
    enablePnft,
    enableUnlockable,
    endTime,
    getNextListingStep,
    hasError,
    price,
    setAuctionTime,
    setEndTime,
    setPrice,
    setShowErrors,
    setStep,
    setTags,
    setTickSizeConstantInSol,
    setTickSizeType,
    showErrors,
    tags,
    tickSizeConstantInSol,
    tickSizeType,
  } = useListingContext();

  return (
    <div className={styles.body}>
      <ListingInputs>
        <ListingPriceInput
          label="Reserve price"
          primarySaleHappened={metadataAccountData.primarySaleHappened}
          subLabel="This is the minimum bid price for this piece. Once someone bids at least this amount, the auction will start."
          price={price}
          setPrice={setPrice}
        />
        <ListingCurrencyError />
        <ListingTickSizeInput
          setTickSizeConstantInSol={setTickSizeConstantInSol}
          setTickSizeType={setTickSizeType}
          showErrors={showErrors}
          tickSizeConstantInSol={tickSizeConstantInSol}
          tickSizeType={tickSizeType}
        />
        <ListingTagsInput setTags={setTags} tags={tags} />
        <ShowAdvancedButton>
          <AuctionTimeSection
            auctionTime={auctionTime}
            endTime={endTime}
            setAuctionTime={setAuctionTime}
            setEndTime={setEndTime}
          />
          <ListingScheduledAuction />
          {canAddUnlockableOrPnft && <ListingPnftToggle />}
          {canAddUnlockableOrPnft && <ListingUnlockableToggle />}
        </ShowAdvancedButton>
      </ListingInputs>
      <ListButton
        disabled={!isValidPrice(price, currencyConfig.decimals)}
        isLoading={isLoading}
        onClick={async () => {
          if (hasError) {
            setShowErrors(true);
            return;
          }

          const nextStep = getNextListingStep();
          if (nextStep != null) {
            setStep(nextStep);
            return;
          }

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
        {enablePnft || enableUnlockable ? "Continue" : "List for auction"}
      </ListButton>
      {hasError && showErrors && (
        <ErrorMessage fontClass={FontClass.Body1}>
          Please make sure all inputs are valid.
        </ErrorMessage>
      )}
    </div>
  );
}
