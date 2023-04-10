/* eslint-disable react/jsx-no-constructed-context-values */
import dayjs from "utils/dates/dayjsex";
import { Dayjs } from "dayjs";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { Context, createContext, useMemo, useState } from "react";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import getDayjsFromDateAndTime from "utils/dates/getDayjsFromDateAndTime";
import isPublicKey from "formfn-shared/dist/utils/solana/isPublicKey";
import AudienceInputOption from "types/enums/AudienceInputOption";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import useUserSearchContext from "hooks/useUserSearchContext";
import isValidPrice from "utils/price/isValidPrice";
import useListingContext from "hooks/useListingContext";
import MaxDecimals from "types/enums/MaxDecimals";
import isPositiveInteger from "utils/isPositiveInteger";

export type ListEditionsContextData = {
  advancedOptions: {
    activeAudienceInputOption: AudienceInputOption;
    allowlistAddresses: Array<string>;
    allowlistAddressesFreeform: Array<string>;
    allowlistAmountAllowed: {
      allowlistAmountAllowed: string;
      setAllowlistAmountAllowed: (val: string) => void;
    };
    allowlistEnabled: boolean;
    allowlistPhaseEnd: {
      allowlistPhaseEndDate: Dayjs;
      allowlistPhaseEndDateAndTime: Maybe<Dayjs>;
      allowlistPhaseEndEnabled: boolean;
      allowlistPhaseEndTime: Maybe<Dayjs>;
      allowlistPhaseEndTzCode: string;
      setAllowlistPhaseEndDate: (val: Dayjs) => void;
      setAllowlistPhaseEndEnabled: (val: boolean) => void;
      setAllowlistPhaseEndTime: (val: Maybe<Dayjs>) => void;
      setAllowlistPhaseEndTzCode: (val: string) => void;
    };
    allowlistPhaseStart: {
      allowlistPhaseStartDate: Dayjs;
      allowlistPhaseStartDateAndTime: Maybe<Dayjs>;
      allowlistPhaseStartEnabled: boolean;
      allowlistPhaseStartTime: Maybe<Dayjs>;
      allowlistPhaseStartTzCode: string;
      setAllowlistPhaseStartDate: (val: Dayjs) => void;
      setAllowlistPhaseStartEnabled: (val: boolean) => void;
      setAllowlistPhaseStartTime: (val: Maybe<Dayjs>) => void;
      setAllowlistPhaseStartTzCode: (val: string) => void;
    };
    allowlistPrice: {
      allowlistPrice: string;
      allowlistPriceEnabled: boolean;
      setAllowlistPrice: (val: string) => void;
      setAllowlistPriceEnabled: (val: boolean) => void;
    };
    antiBotProtectionEnabled: boolean;
    editionBuyLimitPerAddress: string;
    setActiveAudienceInputOption: (val: AudienceInputOption) => void;
    setAllowlistAddressesFreeform: (val: Array<string>) => void;
    setAllowlistEnabled: (val: boolean) => void;
    setAntiBotProtectionEnabled: (enabled: boolean) => void;
    setEditionBuyLimitPerAddress: (limit: string) => void;
  };
  errors: Record<string, Undef<string>>;
  hasError: boolean;
  setShowErrors: (val: boolean) => void;
  showErrors: boolean;
};

export const ListEditionsContext: Context<ListEditionsContextData> =
  createContext<ListEditionsContextData>({
    advancedOptions: {
      activeAudienceInputOption: AudienceInputOption.SimpleAudienceInput,
      allowlistAddresses: [],
      allowlistAddressesFreeform: [],
      allowlistAmountAllowed: {
        allowlistAmountAllowed: "",
        setAllowlistAmountAllowed: emptyFunction,
      },
      allowlistEnabled: false,
      allowlistPhaseEnd: {
        allowlistPhaseEndDate: dayjs(),
        allowlistPhaseEndDateAndTime: null,
        allowlistPhaseEndEnabled: false,
        allowlistPhaseEndTime: null,
        allowlistPhaseEndTzCode: dayjs.tz.guess(),
        setAllowlistPhaseEndDate: emptyFunction,
        setAllowlistPhaseEndEnabled: emptyFunction,
        setAllowlistPhaseEndTime: emptyFunction,
        setAllowlistPhaseEndTzCode: emptyFunction,
      },
      allowlistPhaseStart: {
        allowlistPhaseStartDate: dayjs(),
        allowlistPhaseStartDateAndTime: null,
        allowlistPhaseStartEnabled: false,
        allowlistPhaseStartTime: null,
        allowlistPhaseStartTzCode: dayjs.tz.guess(),
        setAllowlistPhaseStartDate: emptyFunction,
        setAllowlistPhaseStartEnabled: emptyFunction,
        setAllowlistPhaseStartTime: emptyFunction,
        setAllowlistPhaseStartTzCode: emptyFunction,
      },
      allowlistPrice: {
        allowlistPrice: "",
        allowlistPriceEnabled: false,
        setAllowlistPrice: emptyFunction,
        setAllowlistPriceEnabled: emptyFunction,
      },
      antiBotProtectionEnabled: false,
      editionBuyLimitPerAddress: "",
      setActiveAudienceInputOption: emptyFunction,
      setAllowlistAddressesFreeform: emptyFunction,
      setAllowlistEnabled: emptyFunction,
      setAntiBotProtectionEnabled: emptyFunction,
      setEditionBuyLimitPerAddress: emptyFunction,
    },
    errors: {},
    hasError: false,
    setShowErrors: emptyFunction,
    showErrors: false,
  });

type ProviderProps = {
  children: any;
};

export function ListEditionsContextProvider({
  children,
}: ProviderProps): JSX.Element {
  const [activeAudienceInputOption, setActiveAudienceInputOption] =
    useState<AudienceInputOption>(AudienceInputOption.SimpleAudienceInput);
  const [allowlistAddressesFreeform, setAllowlistAddressesFreeform] = useState<
    Array<string>
  >([]);
  const [allowlistAmountAllowed, setAllowlistAmountAllowed] = useState("1");
  const [allowlistEnabled, setAllowlistEnabled] = useState(false);
  const [allowlistPhaseEndDate, setAllowlistPhaseEndDate] = useState<Dayjs>(
    dayjs()
  );
  const [allowlistPhaseEndEnabled, setAllowlistPhaseEndEnabled] =
    useState(false);
  const [allowlistPhaseEndTime, setAllowlistPhaseEndTime] =
    useState<Maybe<Dayjs>>(null);
  const [allowlistPhaseEndTzCode, setAllowlistPhaseEndTzCode] =
    useState<string>(dayjs.tz.guess());
  const [allowlistPhaseStartDate, setAllowlistPhaseStartDate] = useState<Dayjs>(
    dayjs()
  );
  const [allowlistPhaseStartEnabled, setAllowlistPhaseStartEnabled] =
    useState(false);
  const [allowlistPhaseStartTime, setAllowlistPhaseStartTime] =
    useState<Maybe<Dayjs>>(null);
  const [allowlistPhaseStartTzCode, setAllowlistPhaseStartTzCode] =
    useState<string>(dayjs.tz.guess());
  const [allowlistPrice, setAllowlistPrice] = useState("");
  const [allowlistPriceEnabled, setAllowlistPriceEnabled] = useState(false);
  const [antiBotProtectionEnabled, setAntiBotProtectionEnabled] =
    useState(false);
  const [editionBuyLimitPerAddress, setEditionBuyLimitPerAddress] =
    useState("");
  const [showErrors, setShowErrors] = useState(false);
  const { selectedAddresses, selectedUsers } = useUserSearchContext();
  const { currencyConfig } = useListingContext();

  const value = useMemo(() => {
    const getAllowlistAddresses = () => {
      switch (activeAudienceInputOption) {
        case AudienceInputOption.FreeformWalletInput:
          return allowlistAddressesFreeform;
        case AudienceInputOption.SimpleAudienceInput:
          return [
            ...selectedUsers.map((item) => item.id),
            ...selectedAddresses,
          ];
        default:
          return assertUnreachable(activeAudienceInputOption);
      }
    };

    const allowlistAddresses = getAllowlistAddresses();

    const isAllowlistAddressesInvalid =
      allowlistEnabled &&
      (allowlistAddresses.length === 0 ||
        allowlistAddresses.some((address) => !isPublicKey(address)));

    const allowlistPhaseEndDateAndTime =
      !allowlistPhaseEndEnabled || allowlistPhaseEndTime == null
        ? null
        : getDayjsFromDateAndTime(
            allowlistPhaseEndDate,
            allowlistPhaseEndTime,
            allowlistPhaseEndTzCode
          );
    const allowlistPhaseStartDateAndTime =
      !allowlistPhaseStartEnabled || allowlistPhaseStartTime == null
        ? null
        : getDayjsFromDateAndTime(
            allowlistPhaseStartDate,
            allowlistPhaseStartTime,
            allowlistPhaseStartTzCode
          );

    const isEndTimeAfterStartTime =
      allowlistPhaseEndEnabled &&
      allowlistPhaseStartEnabled &&
      allowlistPhaseEndTime != null &&
      allowlistPhaseStartTime != null &&
      allowlistPhaseEndDateAndTime != null &&
      allowlistPhaseStartDateAndTime != null &&
      allowlistPhaseStartDateAndTime.isSameOrAfter(
        allowlistPhaseEndDateAndTime
      );

    const errors = {
      allowlistAddresses: isAllowlistAddressesInvalid
        ? "Allowlist addresses must all be public keys"
        : undefined,
      allowlistAmountAllowed: !isPositiveInteger(allowlistAmountAllowed)
        ? "Allowlist amount allowed must be a positive integer"
        : undefined,
      allowlistPhaseEndDateAndTime: isEndTimeAfterStartTime
        ? "End time must be after start time"
        : undefined,
      allowlistPhaseEndTime:
        allowlistPhaseEndEnabled && allowlistPhaseEndTime == null
          ? "Allowlist phase end time must be specified"
          : undefined,
      allowlistPhaseStartTime:
        allowlistPhaseStartEnabled && allowlistPhaseStartTime == null
          ? "Allowlist phase start time must be specified"
          : undefined,
      allowlistPrice:
        allowlistPriceEnabled &&
        !isValidPrice(
          allowlistPrice,
          currencyConfig.decimals,
          MaxDecimals.Price,
          true
        )
          ? "Allowlist price is invalid"
          : undefined,
      allowlistPriceNotRequired:
        allowlistPriceEnabled && allowlistPhaseEndDateAndTime == null
          ? "You can only set an allowlist price if the allowlist phase has an end time"
          : undefined,
    };
    return {
      advancedOptions: {
        activeAudienceInputOption,
        allowlistAddresses,
        allowlistAddressesFreeform,
        allowlistAmountAllowed: {
          allowlistAmountAllowed,
          setAllowlistAmountAllowed,
        },
        allowlistEnabled,
        allowlistPhaseEnd: {
          allowlistPhaseEndDate,
          allowlistPhaseEndDateAndTime,
          allowlistPhaseEndEnabled,
          allowlistPhaseEndTime,
          allowlistPhaseEndTzCode,
          setAllowlistPhaseEndDate,
          setAllowlistPhaseEndEnabled,
          setAllowlistPhaseEndTime,
          setAllowlistPhaseEndTzCode,
        },
        allowlistPhaseStart: {
          allowlistPhaseStartDate,
          allowlistPhaseStartDateAndTime,
          allowlistPhaseStartEnabled,
          allowlistPhaseStartTime,
          allowlistPhaseStartTzCode,
          setAllowlistPhaseStartDate,
          setAllowlistPhaseStartEnabled,
          setAllowlistPhaseStartTime,
          setAllowlistPhaseStartTzCode,
        },
        allowlistPrice: {
          allowlistPrice,
          allowlistPriceEnabled,
          setAllowlistPrice,
          setAllowlistPriceEnabled,
        },
        antiBotProtectionEnabled,
        editionBuyLimitPerAddress,
        setActiveAudienceInputOption,
        setAllowlistAddressesFreeform,
        setAllowlistEnabled,
        setAntiBotProtectionEnabled,
        setEditionBuyLimitPerAddress,
      },
      errors,
      hasError: filterNulls(Object.values(errors)).length > 0,
      setShowErrors,
      showErrors,
    };
  }, [
    activeAudienceInputOption,
    allowlistAddressesFreeform,
    allowlistAmountAllowed,
    allowlistEnabled,
    allowlistPhaseEndDate,
    allowlistPhaseEndEnabled,
    allowlistPhaseEndTime,
    allowlistPhaseEndTzCode,
    allowlistPhaseStartDate,
    allowlistPhaseStartEnabled,
    allowlistPhaseStartTime,
    allowlistPhaseStartTzCode,
    allowlistPrice,
    allowlistPriceEnabled,
    antiBotProtectionEnabled,
    currencyConfig.decimals,
    editionBuyLimitPerAddress,
    selectedAddresses,
    selectedUsers,
    showErrors,
  ]);

  return (
    <ListEditionsContext.Provider value={value}>
      {children}
    </ListEditionsContext.Provider>
  );
}
