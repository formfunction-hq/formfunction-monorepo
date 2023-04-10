import TextButton from "components/buttons/TextButton";
import ToggleButtonWithLabel from "components/buttons/ToggleButtonWithLabel";
import IMMUTABLE_SETTING from "constants/ImmutableSetting";
import TextButtonTheme from "types/enums/TextButtonTheme";

export default function ListingBotProtectionToggle({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}) {
  return (
    <ToggleButtonWithLabel
      enabled={enabled}
      label="Bot protection"
      setEnabled={setEnabled}
      subLabel={
        <>
          Bot protection makes it harder for bots to buy editions. This feature
          adds an additional step in the transaction flow, which slows down bots
          but does not impact real users. {IMMUTABLE_SETTING}{" "}
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
            display="inline"
            href="https://help.formfunction.xyz/en/articles/6462459-how-bot-protection-works"
            type="link_external"
          >
            Learn more.
          </TextButton>{" "}
        </>
      }
      toggleLabel="Turn on bot protection"
    />
  );
}
