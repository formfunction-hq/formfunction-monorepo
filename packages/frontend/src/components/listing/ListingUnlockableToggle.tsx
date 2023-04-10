import ToggleButtonWithLabel from "components/buttons/ToggleButtonWithLabel";
import useListingContext from "hooks/useListingContext";

export default function ListingUnlockableToggle() {
  const { enableUnlockable, setEnableUnlockable } = useListingContext();

  const subLabel =
    "If you're also planning to send a physical piece or " +
    "extra item to the buyer, add it as an unlockable. " +
    "If you turn on this feature, you'll be able to specify the details in the next steps.";

  return (
    <ToggleButtonWithLabel
      label="Unlockables"
      subLabel={subLabel}
      toggleLabel="Add unlockable item"
      enabled={enableUnlockable}
      setEnabled={setEnableUnlockable}
    />
  );
}
