import InputWithLabel from "components/input/InputWithLabel";
import InputLabel from "components/input/InputLabel";
import ColorSchemeButton from "components/buttons/ColorSchemeButton";
import styles from "css/pages/campaign/basic-info/ColorSchemeInput.module.css";
import CampaignColorSchemeExpress_enum from "types/relay/CampaignColorSchemeExpress_enum";
import CAMPAIGN_COLOR_SCHEMES, {
  CAMPAIGN_COLOR_SCHEMES_TO_COLORS,
} from "constants/CampaignColorSchemes";

type Props = {
  onClickColorScheme: (colorScheme: CampaignColorSchemeExpress_enum) => void;
  selectedColorScheme: CampaignColorSchemeExpress_enum;
  subLabel: string;
};

export default function ColorSchemeInput({
  onClickColorScheme,
  selectedColorScheme,
  subLabel,
}: Props): JSX.Element {
  return (
    <InputWithLabel
      input={
        <div className={styles.colorSchemes}>
          {CAMPAIGN_COLOR_SCHEMES.map((colorScheme) => (
            <ColorSchemeButton
              key={colorScheme}
              colorScheme={CAMPAIGN_COLOR_SCHEMES_TO_COLORS[colorScheme]}
              isActive={selectedColorScheme === colorScheme}
              onClick={() => onClickColorScheme(colorScheme)}
            />
          ))}
        </div>
      }
      label={<InputLabel label="Color scheme" subLabel={subLabel} />}
    />
  );
}
