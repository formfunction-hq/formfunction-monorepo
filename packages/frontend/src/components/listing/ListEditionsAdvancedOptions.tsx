import ShowAdvancedButton from "components/buttons/ShowAdvancedButton";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import TextInput from "components/input/TextInput";
import EditionsAllowlistInput from "components/listing/EditionsAllowlistInput";
import ListingBotProtectionToggle from "components/listing/ListingBotProtectionToggle";
import IMMUTABLE_SETTING from "constants/ImmutableSetting";
import MAX_EDITION_SUPPLY from "constants/MaxEditionSupply";
import useListEditionsContext from "hooks/useListEditionsContext";
import isPositiveInteger from "utils/isPositiveInteger";

const LIMIT_PER_ADDRESS_LABEL_ALLOWLIST_DISABLED = "Buy limit";
const LIMIT_PER_ADDRESS_SUB_LABEL_ALLOWLIST_DISABLED =
  "Set a limit on how many editions each wallet can buy " +
  '(e.g. if you put "1", each wallet will only be able to buy up to 1 edition). ' +
  `The default is unlimited. ${IMMUTABLE_SETTING}`;

const LIMIT_PER_ADDRESS_LABEL_ALLOWLIST_ENABLED = "Public sale buy limit";
const LIMIT_PER_ADDRESS_SUB_LABEL_ALLOWLIST_ENABLED =
  "Set a limit on how many editions each wallet can buy during the public sale " +
  '(e.g. if you put "1", each wallet will only be able to buy up to 1 edition during the public sale). ' +
  `The default is unlimited. ${IMMUTABLE_SETTING}`;

function EditionsLimitPerAddressInput({
  editionBuyLimitPerAddress,
  setEditionBuyLimitPerAddress,
}: {
  editionBuyLimitPerAddress: string;
  setEditionBuyLimitPerAddress: (limit: string) => void;
}) {
  const {
    advancedOptions: {
      allowlistEnabled,
      allowlistPhaseEnd: { allowlistPhaseEndEnabled },
    },
  } = useListEditionsContext();

  if (allowlistEnabled && !allowlistPhaseEndEnabled) {
    return null;
  }

  return (
    <InputWithLabel
      label={
        <InputLabel
          label={
            allowlistEnabled
              ? LIMIT_PER_ADDRESS_LABEL_ALLOWLIST_ENABLED
              : LIMIT_PER_ADDRESS_LABEL_ALLOWLIST_DISABLED
          }
          subLabel={
            allowlistEnabled
              ? LIMIT_PER_ADDRESS_SUB_LABEL_ALLOWLIST_ENABLED
              : LIMIT_PER_ADDRESS_SUB_LABEL_ALLOWLIST_DISABLED
          }
        />
      }
      input={
        <TextInput
          maxLength={MAX_EDITION_SUPPLY.toString().length}
          maxLengthIndicator={false}
          value={String(editionBuyLimitPerAddress)}
          onChange={(val: string) => {
            if (
              (val !== "" && !isPositiveInteger(val)) ||
              Number(val) > MAX_EDITION_SUPPLY
            ) {
              return;
            }
            setEditionBuyLimitPerAddress(val);
          }}
          placeholder="Unlimited"
        />
      }
    />
  );
}

type Props = {
  showAllowlistInput: boolean;
};

export default function ListEditionsAdvancedOptions({
  showAllowlistInput,
}: Props) {
  const {
    advancedOptions: {
      antiBotProtectionEnabled,
      editionBuyLimitPerAddress,
      setAntiBotProtectionEnabled,
      setEditionBuyLimitPerAddress,
    },
  } = useListEditionsContext();

  return (
    <ShowAdvancedButton>
      {showAllowlistInput && <EditionsAllowlistInput />}
      <ListingBotProtectionToggle
        enabled={antiBotProtectionEnabled}
        setEnabled={setAntiBotProtectionEnabled}
      />
      <EditionsLimitPerAddressInput
        editionBuyLimitPerAddress={editionBuyLimitPerAddress}
        setEditionBuyLimitPerAddress={setEditionBuyLimitPerAddress}
      />
    </ShowAdvancedButton>
  );
}
