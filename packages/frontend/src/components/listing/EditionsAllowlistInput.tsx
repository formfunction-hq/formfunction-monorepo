/* eslint-disable @typescript-eslint/no-unused-vars */
import useListEditionsContext from "hooks/useListEditionsContext";
import Toggle from "components/buttons/Toggle";
import ToggleButtonWithLabel from "components/buttons/ToggleButtonWithLabel";
import FlexBox from "components/layout/FlexBox";
import Body2 from "components/text/Body2";
import NavLink from "components/text/NavLink";
import styles from "css/listing/EditionsAllowlistInput.module.css";
import ColorClass from "types/enums/ColorClass";
import DateAndTimePicker from "components/time/DateAndTimePicker";
import IMMUTABLE_SETTING from "constants/ImmutableSetting";
import AudienceSelectInput from "components/input/AudienceSelectInput";
import useListingContext from "hooks/useListingContext";
import PriceInput from "components/input/PriceInput";
import ErrorMessage from "components/text/ErrorMessage";
import FontClass from "types/enums/FontClass";
import TextInput from "components/input/TextInput";
import isPositiveInteger from "utils/isPositiveInteger";

function PhaseEndInput() {
  const {
    advancedOptions: {
      allowlistPhaseEnd: {
        allowlistPhaseEndDate,
        allowlistPhaseEndTime,
        allowlistPhaseEndEnabled,
        setAllowlistPhaseEndEnabled,
        allowlistPhaseEndTzCode,
        setAllowlistPhaseEndTzCode,
        setAllowlistPhaseEndDate,
        setAllowlistPhaseEndTime,
      },
    },
    errors,
    showErrors,
  } = useListEditionsContext();

  return (
    <FlexBox gap={12}>
      <div className={styles.toggle}>
        <Toggle
          enabled={allowlistPhaseEndEnabled}
          onChange={() =>
            setAllowlistPhaseEndEnabled(!allowlistPhaseEndEnabled)
          }
        />
      </div>
      <FlexBox flexDirection="column" gap={8}>
        <NavLink colorClass={ColorClass.Primary}>
          Set allowlist phase end
        </NavLink>
        {allowlistPhaseEndEnabled && (
          <FlexBox flexDirection="column" gap={16}>
            <Body2 colorClass={ColorClass.Primary}>
              Set a time for the allowlist to end, after which anyone will be
              able to mint. If you don&apos;t turn this on, this edition will be
              allowlist-only.
            </Body2>
            <DateAndTimePicker
              date={allowlistPhaseEndDate}
              maxDaysAhead={14}
              time={allowlistPhaseEndTime}
              setDate={setAllowlistPhaseEndDate}
              setTime={setAllowlistPhaseEndTime}
              showErrors={showErrors}
              tzCode={allowlistPhaseEndTzCode}
              setTzCode={setAllowlistPhaseEndTzCode}
            />
            {showErrors && errors.allowlistPhaseEndDateAndTime != null && (
              <ErrorMessage
                fontClass={FontClass.Body2}
                marginTop={0}
                textAlign="left"
              >
                {errors.allowlistPhaseEndDateAndTime}
              </ErrorMessage>
            )}
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
}

function PhaseStartInput() {
  const {
    advancedOptions: {
      allowlistPhaseStart: {
        allowlistPhaseStartDate,
        allowlistPhaseStartTime,
        allowlistPhaseStartEnabled,
        setAllowlistPhaseStartEnabled,
        allowlistPhaseStartTzCode,
        setAllowlistPhaseStartTzCode,
        setAllowlistPhaseStartDate,
        setAllowlistPhaseStartTime,
      },
    },
    showErrors,
  } = useListEditionsContext();

  return (
    <FlexBox gap={12}>
      <div className={styles.toggle}>
        <Toggle
          enabled={allowlistPhaseStartEnabled}
          onChange={() =>
            setAllowlistPhaseStartEnabled(!allowlistPhaseStartEnabled)
          }
        />
      </div>
      <FlexBox flexDirection="column" gap={8}>
        <NavLink colorClass={ColorClass.Primary}>
          Set allowlist phase start
        </NavLink>
        {allowlistPhaseStartEnabled && (
          <FlexBox flexDirection="column" gap={16}>
            <Body2 colorClass={ColorClass.Primary}>
              Set a time for the allowlist to start. If you don&apos;t turn this
              on, people on the allowlist will be able to mint immediately after
              listing.
            </Body2>
            <DateAndTimePicker
              date={allowlistPhaseStartDate}
              maxDaysAhead={14}
              time={allowlistPhaseStartTime}
              setDate={setAllowlistPhaseStartDate}
              setTime={setAllowlistPhaseStartTime}
              showErrors={showErrors}
              tzCode={allowlistPhaseStartTzCode}
              setTzCode={setAllowlistPhaseStartTzCode}
            />
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
}

function AllowlistPriceInput() {
  const {
    advancedOptions: {
      allowlistPrice: {
        allowlistPrice,
        allowlistPriceEnabled,
        setAllowlistPrice,
        setAllowlistPriceEnabled,
      },
    },
    errors,
    showErrors,
  } = useListEditionsContext();
  const { currencyConfig } = useListingContext();

  return (
    <FlexBox gap={12}>
      <div className={styles.toggle}>
        <Toggle
          enabled={allowlistPriceEnabled}
          onChange={() => setAllowlistPriceEnabled(!allowlistPriceEnabled)}
        />
      </div>
      <FlexBox flexDirection="column" gap={8}>
        <NavLink colorClass={ColorClass.Primary}>Set allowlist price</NavLink>
        {allowlistPriceEnabled && (
          <FlexBox flexDirection="column" gap={16}>
            <Body2 colorClass={ColorClass.Primary}>
              Choose a separate price for the allowlist phase. If you don&apos;t
              turn this on, people on the allowlist will pay the same price as
              everyone else. The currency for this price will be the same as the
              currency chosen above.
            </Body2>
            <PriceInput
              currencyConfig={currencyConfig}
              hasError={showErrors && errors.allowlistPrice != null}
              placeholder="Enter allowlist price"
              price={allowlistPrice}
              setPrice={setAllowlistPrice}
              showCurrencySymbol
            />
            {showErrors && errors.allowlistPriceNotRequired != null && (
              <ErrorMessage
                fontClass={FontClass.Body2}
                marginTop={0}
                textAlign="left"
              >
                {errors.allowlistPriceNotRequired}
              </ErrorMessage>
            )}
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
}

function AmountAllowedInput() {
  const {
    advancedOptions: {
      allowlistAmountAllowed: {
        allowlistAmountAllowed,
        setAllowlistAmountAllowed,
      },
    },
    errors,
    showErrors,
  } = useListEditionsContext();

  return (
    <FlexBox flexDirection="column" gap={8}>
      <NavLink colorClass={ColorClass.Primary}>Allowlist buy limit</NavLink>
      <FlexBox flexDirection="column" gap={16}>
        <Body2 colorClass={ColorClass.Primary}>
          Specify the number of editions each person on the allowlist can mint
          during the allowlist phase. By default, each person is allowed to mint
          exactly once.
        </Body2>
        <TextInput
          hasError={showErrors && errors.allowlistAmountAllowed != null}
          placeholder="Enter amount allowed"
          onChange={(val) => {
            if (val !== "" && !isPositiveInteger(val)) {
              return;
            }

            setAllowlistAmountAllowed(val);
          }}
          value={allowlistAmountAllowed}
        />
      </FlexBox>
    </FlexBox>
  );
}

function EnabledContent() {
  const {
    advancedOptions: {
      activeAudienceInputOption,
      allowlistAddressesFreeform,
      allowlistEnabled,
      setActiveAudienceInputOption,
      setAllowlistAddressesFreeform,
    },
    errors,
    showErrors,
  } = useListEditionsContext();

  return (
    <div
      className={styles.enabledContent}
      // Use display to show/hide so that query in AudienceSelectInput can load in the background
      style={{ display: allowlistEnabled ? undefined : "none" }}
    >
      <div className={styles.audienceSelectInputContainer}>
        <AudienceSelectInput
          activeAudienceInputOption={activeAudienceInputOption}
          hasError={showErrors && errors.allowlistAddresses != null}
          setActiveAudienceInputOption={setActiveAudienceInputOption}
          freeformAddresses={allowlistAddressesFreeform}
          setFreeformAddresses={setAllowlistAddressesFreeform}
        />
        <AmountAllowedInput />
      </div>
      <PhaseStartInput />
      <PhaseEndInput />
      <AllowlistPriceInput />
    </div>
  );
}

export default function EditionsAllowlistInput() {
  const {
    advancedOptions: { allowlistEnabled, setAllowlistEnabled },
  } = useListEditionsContext();
  return (
    <div>
      <ToggleButtonWithLabel
        enabled={allowlistEnabled}
        label="Allowlist"
        setEnabled={setAllowlistEnabled}
        subLabel={`Only the wallets on the allowlist will be allowed to mint until the allowlist phase ends. ${IMMUTABLE_SETTING}`}
        toggleLabel="Turn on allowlist"
      />
      <EnabledContent />
    </div>
  );
}
