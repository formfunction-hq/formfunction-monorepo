/* eslint-disable react/jsx-no-constructed-context-values */
import {
  Context,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import dayjs from "utils/dates/dayjsex";
import graphql from "babel-plugin-relay/macro";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import {
  DEFAULT_AUCTION_DURATION,
  DEFAULT_TIME_EXTENSION_DURATION,
} from "formfn-shared/dist/constants/AuctionDurationConstants";
import ListingStep from "types/enums/ListingStep";
import isValidPrice from "utils/price/isValidPrice";
import { Duration } from "dayjs/plugin/duration";
import ElementId from "types/enums/ElementId";
import { useFragment } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { Dayjs } from "dayjs";
import getDayjsFromDateAndTime from "utils/dates/getDayjsFromDateAndTime";
import { ListingContext_MetadataAccount$key } from "context/__generated__/ListingContext_MetadataAccount.graphql";
import ListNftSignTransactionStep from "types/enums/ListNftSignTransactionStep";
import { PublicKey } from "@solana/web3.js";
import TickSizeType from "types/enums/TickSizeType";
import getNextListingStepIfExists from "utils/listing/getNextListingStepIfExists";
import useUserContext from "hooks/useUserContext";
import CurrencyConfig from "types/CurrencyConfig";
import SOLANA_CURRENCY_CONFIG from "constants/SolanaCurrencyConfig";
import invariant from "tiny-invariant";
import canSelectedCurrencyBeUsed from "utils/currency/canSelectedCurrencyBeUsed";

const fragment = graphql`
  fragment ListingContext_MetadataAccount on MetadataAccount {
    primarySaleHappened

    nft {
      creatorId
    }

    data {
      creators {
        # eslint-disable-next-line relay/unused-fields
        address
      }
    }

    tags
  }
`;

export type ListingContextData = {
  auctionTime: Duration;
  canAddUnlockableOrPnft: boolean;
  currencyConfig: CurrencyConfig;
  enablePnft: boolean;
  enableScheduledAuctions: boolean;
  enableUnlockable: boolean;
  endTime: Duration;
  existingPnftMint: Maybe<PublicKey>;
  getNextListingStep: () => Maybe<ListingStep>;
  hasError: boolean;
  price: string;
  resetListingInputState: () => void;
  // Always in local time! I.e. we never change the timezone
  scheduledAuctionDate: Dayjs;
  scheduledAuctionDateAndTime: Maybe<Dayjs>;
  scheduledAuctionTime: Maybe<Dayjs>;
  setAuctionTime: (auctionTime: Duration) => void;
  setCurrencyConfig: (currencyConfig: Maybe<CurrencyConfig>) => void;
  setEnablePnft: (enabled: boolean) => void;
  setEnableScheduledAuctions: (enabled: boolean) => void;
  setEnableUnlockable: (enabled: boolean) => void;
  setEndTime: (endTime: Duration) => void;
  setExistingPnftMint: (mint: PublicKey) => void;
  setPrice: (price: string) => void;
  setScheduledAuctionDate: (val: Dayjs) => void;
  setScheduledAuctionTime: (val: Maybe<Dayjs>) => void;
  setShowErrors: (show: boolean) => void;
  setSignTransactionStep: (step: Maybe<ListNftSignTransactionStep>) => void;
  setStep: (val: ListingStep) => void;
  setTags: (tags: Array<string>) => void;
  setTickSizeConstantInSol: (val: string) => void;
  setTickSizeType: (val: TickSizeType) => void;
  setTzCode: (val: string) => void;
  showCurrencyError: boolean;
  showErrors: boolean;
  signTransactionStep: Maybe<ListNftSignTransactionStep>;
  step: ListingStep;
  tags: Array<string>;
  tickSizeConstantInSol: string;
  tickSizeType: TickSizeType;
  tzCode: string;
};

export const ListingContext: Context<ListingContextData> =
  createContext<ListingContextData>({
    auctionTime: DEFAULT_AUCTION_DURATION,
    canAddUnlockableOrPnft: false,
    currencyConfig: SOLANA_CURRENCY_CONFIG,
    enablePnft: false,
    enableScheduledAuctions: false,
    enableUnlockable: false,
    endTime: DEFAULT_TIME_EXTENSION_DURATION,
    existingPnftMint: null,
    getNextListingStep: () => null,
    hasError: false,
    price: "",
    resetListingInputState: emptyFunction,
    scheduledAuctionDate: dayjs(),
    scheduledAuctionDateAndTime: null,
    scheduledAuctionTime: null,
    setAuctionTime: emptyFunction,
    setCurrencyConfig: emptyFunction,
    setEnablePnft: emptyFunction,
    setEnableScheduledAuctions: emptyFunction,
    setEnableUnlockable: emptyFunction,
    setEndTime: emptyFunction,
    setExistingPnftMint: emptyFunction,
    setPrice: emptyFunction,
    setScheduledAuctionDate: emptyFunction,
    setScheduledAuctionTime: emptyFunction,
    setShowErrors: emptyFunction,
    setSignTransactionStep: emptyFunction,
    setStep: emptyFunction,
    setTags: emptyFunction,
    setTickSizeConstantInSol: emptyFunction,
    setTickSizeType: emptyFunction,
    setTzCode: emptyFunction,
    showCurrencyError: false,
    showErrors: false,
    signTransactionStep: null,
    step: ListingStep.Setup,
    tags: [],
    tickSizeConstantInSol: "",
    tickSizeType: TickSizeType.Default,
    tzCode: "America/Los_Angeles",
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  metadataAccount: ListingContext_MetadataAccount$key;
};

// Some other dynamic state fields are set directly below in the component.
const DEFAULT_STATE = {
  enablePnft: false,
  enableScheduledAuctions: false,
  enableUnlockable: false,
  price: "",
  scheduledAuctionTime: null,
  showErrors: false,
  step: ListingStep.Setup,
  tickSizeConstantInSol: "",
  tickSizeType: TickSizeType.Default,
};

export function ListingContextProvider(props: ProviderProps): JSX.Element {
  const { userId } = useUserContext();
  const [step, setStep] = useState<ListingStep>(DEFAULT_STATE.step);
  const [price, setPrice] = useState(DEFAULT_STATE.price);
  const [enablePnft, setEnablePnft] = useState(DEFAULT_STATE.enablePnft);
  const [enableUnlockable, setEnableUnlockable] = useState(
    DEFAULT_STATE.enableUnlockable
  );
  const [enableScheduledAuctions, setEnableScheduledAuctions] = useState(
    DEFAULT_STATE.enableScheduledAuctions
  );
  const [auctionTime, setAuctionTime] = useState(DEFAULT_AUCTION_DURATION);
  const [endTime, setEndTime] = useState(DEFAULT_TIME_EXTENSION_DURATION);
  const metadataAccountData = useFragment(fragment, props.metadataAccount);
  const originalTags = [...metadataAccountData.tags];
  const [tags, setTags] = useState<Array<string>>(originalTags);
  const [tickSizeConstantInSol, setTickSizeConstantInSol] = useState<string>(
    DEFAULT_STATE.tickSizeConstantInSol
  );
  const [tickSizeType, setTickSizeType] = useState<TickSizeType>(
    DEFAULT_STATE.tickSizeType
  );
  const [showErrors, setShowErrors] = useState<boolean>(
    DEFAULT_STATE.showErrors
  );
  const [scheduledAuctionDate, setScheduledAuctionDate] = useState<Dayjs>(
    dayjs()
  );
  const [scheduledAuctionTime, setScheduledAuctionTime] = useState<
    Maybe<Dayjs>
  >(DEFAULT_STATE.scheduledAuctionTime);
  const [tzCode, setTzCode] = useState<string>(dayjs.tz.guess());
  const [signTransactionStep, setSignTransactionStep] =
    useState<Maybe<ListNftSignTransactionStep>>(null);
  const [existingPnftMint, setExistingPnftMint] =
    useState<Maybe<PublicKey>>(null);
  const [currencyConfig, setCurrencyConfig] = useState<Maybe<CurrencyConfig>>(
    SOLANA_CURRENCY_CONFIG
  );
  invariant(currencyConfig != null);

  const resetListingInputState = () => {
    setStep(DEFAULT_STATE.step);
    setEnablePnft(DEFAULT_STATE.enablePnft);
    setEnableUnlockable(DEFAULT_STATE.enableUnlockable);
    setPrice(DEFAULT_STATE.price);
    setShowErrors(DEFAULT_STATE.showErrors);
    setScheduledAuctionTime(DEFAULT_STATE.scheduledAuctionTime);
    setEnableScheduledAuctions(DEFAULT_STATE.enableScheduledAuctions);
    setAuctionTime(DEFAULT_AUCTION_DURATION);
    setEndTime(DEFAULT_TIME_EXTENSION_DURATION);
    setScheduledAuctionDate(dayjs());
    setTzCode(dayjs.tz.guess());
    setTags(originalTags);
    setSignTransactionStep(null);
    setExistingPnftMint(null);
    setCurrencyConfig(SOLANA_CURRENCY_CONFIG);
    setTickSizeType(DEFAULT_STATE.tickSizeType);
    setTickSizeConstantInSol(DEFAULT_STATE.tickSizeConstantInSol);
  };

  const getNextListingStep = useCallback(
    () =>
      getNextListingStepIfExists({
        currentStep: step,
        enablePnft,
        enableUnlockable,
      }),
    [step, enablePnft, enableUnlockable]
  );

  useEffect(() => {
    setShowErrors(false);
    const modal = document.getElementById(ElementId.ListNftModal);
    if (modal) {
      modal.scrollTo({ top: 0 });
    }
  }, [step]);

  const scheduledAuctionDateAndTime =
    scheduledAuctionTime == null
      ? null
      : getDayjsFromDateAndTime(
          scheduledAuctionDate,
          scheduledAuctionTime,
          tzCode
        );

  const hasError =
    !isValidPrice(price, currencyConfig.decimals) ||
    (tickSizeType === TickSizeType.Fixed &&
      !isValidPrice(tickSizeConstantInSol, currencyConfig.decimals)) ||
    (enableScheduledAuctions && scheduledAuctionDateAndTime == null);

  // Unlockables and pNFTs can only be added by the creator in the primary sale.
  const canAddUnlockableOrPnft =
    userId === metadataAccountData.nft.creatorId &&
    !metadataAccountData.primarySaleHappened;

  return (
    <ListingContext.Provider
      value={{
        auctionTime,
        canAddUnlockableOrPnft,
        currencyConfig,
        enablePnft,
        enableScheduledAuctions,
        enableUnlockable,
        endTime,
        existingPnftMint,
        getNextListingStep,
        hasError,
        price,
        resetListingInputState,
        scheduledAuctionDate,
        scheduledAuctionDateAndTime,
        scheduledAuctionTime,
        setAuctionTime,
        setCurrencyConfig: (config: Maybe<CurrencyConfig>) => {
          setPrice("");
          setCurrencyConfig(config);
        },
        setEnablePnft,
        setEnableScheduledAuctions,
        setEnableUnlockable,
        setEndTime,
        setExistingPnftMint,
        setPrice,
        setScheduledAuctionDate,
        setScheduledAuctionTime,
        setShowErrors,
        setSignTransactionStep,
        setStep,
        setTags,
        setTickSizeConstantInSol,
        setTickSizeType,
        setTzCode,
        // SPL token features are disabled for NFTs with collaborators
        showCurrencyError: !canSelectedCurrencyBeUsed(
          currencyConfig!.name,
          metadataAccountData?.data?.creators?.length ?? 1
        ),
        showErrors,
        signTransactionStep,
        step,
        tags,
        tickSizeConstantInSol,
        tickSizeType,
        tzCode,
      }}
    >
      {props.children}
    </ListingContext.Provider>
  );
}
