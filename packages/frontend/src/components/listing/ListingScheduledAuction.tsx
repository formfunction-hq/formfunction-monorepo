import ToggleButtonWithLabel from "components/buttons/ToggleButtonWithLabel";
import ListingScheduledAuctionInputs from "components/listing/ListingScheduledAuctionInputs";
import useListingContext from "hooks/useListingContext";
import styles from "css/listing/ListingScheduledAuction.module.css";
import SCHEDULED_AUCTION_DESCRIPTION from "constants/ScheduledAuctionDescription";

function Inputs() {
  const {
    scheduledAuctionDate,
    scheduledAuctionTime,
    setScheduledAuctionDate,
    setScheduledAuctionTime,
    setTzCode,
    showErrors,
    tzCode,
  } = useListingContext();

  return (
    <div className={styles.inputs}>
      <ListingScheduledAuctionInputs
        scheduledAuctionDate={scheduledAuctionDate}
        scheduledAuctionTime={scheduledAuctionTime}
        setScheduledAuctionDate={setScheduledAuctionDate}
        setScheduledAuctionTime={setScheduledAuctionTime}
        setTzCode={setTzCode}
        showErrors={showErrors}
        tzCode={tzCode}
      />
    </div>
  );
}

export default function ListingScheduledAuction() {
  const { enableScheduledAuctions, setEnableScheduledAuctions } =
    useListingContext();

  return (
    <div>
      <ToggleButtonWithLabel
        label="Schedule auction"
        subLabel={SCHEDULED_AUCTION_DESCRIPTION}
        toggleLabel="Enable"
        enabled={enableScheduledAuctions}
        setEnabled={setEnableScheduledAuctions}
      />
      {enableScheduledAuctions && <Inputs />}
    </div>
  );
}
