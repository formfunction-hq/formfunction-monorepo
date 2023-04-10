import ToggleButton from "components/buttons/ToggleButton";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";

export default function ToggleButtonWithLabel({
  enabled,
  label,
  setEnabled,
  subLabel,
  toggleLabel,
}: {
  enabled: boolean;
  label: string;
  setEnabled: (enabled: boolean) => void;
  subLabel: string | JSX.Element;
  toggleLabel: string;
}) {
  return (
    <InputWithLabel
      label={<InputLabel label={label} subLabel={subLabel} />}
      input={
        <ToggleButton
          label={toggleLabel}
          enabled={enabled}
          onChange={setEnabled}
        />
      }
    />
  );
}
