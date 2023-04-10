import ToggleButtonWithLabel from "components/buttons/ToggleButtonWithLabel";
import useListingContext from "hooks/useListingContext";

export default function ListingPnftToggle() {
  const { enablePnft, setEnablePnft } = useListingContext();

  return (
    <ToggleButtonWithLabel
      label="Participation NFT"
      subLabel="Participation NFTs let you reward all bidders for this auction, regardless of who wins the auction. If you turn on this feature, you'll be able to specify the details after you list for auction."
      toggleLabel="Add a participation NFT"
      enabled={enablePnft}
      setEnabled={setEnablePnft}
    />
  );
}
