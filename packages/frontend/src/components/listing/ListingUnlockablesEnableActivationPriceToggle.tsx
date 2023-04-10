import ToggleButtonWithLabel from "components/buttons/ToggleButtonWithLabel";
import useCreateUnlockableContext from "hooks/useCreateUnlockableContext";

export default function ListingUnlockablesEnableActivationPriceToggle() {
  const { enableActivationPrice, setEnableActivationPrice } =
    useCreateUnlockableContext();

  const subLabel =
    "If the auction does not reach this price, the unlockable will not activate—" +
    "you won't have to fulfill it, and Formfunction will not collect any " +
    "information from the buyer.";

  return (
    <ToggleButtonWithLabel
      label="Activation price"
      subLabel={subLabel}
      toggleLabel="Enable"
      enabled={enableActivationPrice}
      setEnabled={setEnableActivationPrice}
    />
  );
}
