/* eslint-disable react/jsx-no-constructed-context-values */
import {
  Context,
  createContext,
  Dispatch,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import getUrlParams from "utils/getUrlParams";
import maybeNumber from "utils/maybeNumber";
import { useNavigate } from "react-router-dom";
import CurrencyConfig from "types/CurrencyConfig";
import { useDebounce } from "use-debounce";
import CurrencyEnum from "types/relay/Currency";
import ExploreUrlParamKey from "types/enums/ExploreUrlParamKey";
import wrapSetterWithNavigation from "utils/urlparams/wrapSetterWithNavigation";
import { setCurrencyConfigCallback } from "context/ExploreContext";
import { SelectedTrait } from "components/pages/generative-series/GenerativeSeriesAttributesFilter";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";
import ExploreAvailabilityV2 from "types/enums/ExploreAvailabilityV2";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import addToParamSet from "utils/urlparams/addToParamSet";
import removeFromParamSet from "utils/urlparams/removeFromParamSet";
import getAvailabilitySetFromUrlParam from "utils/urlparams/getAvailabilitySetFromUrlParam";
import useListenForParamChange from "hooks/useListenForParamChange";
import ExploreSortOrder from "types/enums/ExploreSortOrder";
import getUrlWithParam from "utils/getUrlWithParam";
import getContentTypeSetFromUrlParam from "utils/urlparams/getContentTypeSetFromUrlParam";
import ContentTypeForFilters from "types/enums/ContentTypeForFilters";

const DEFAULT_AVAILABILITY_SET = new Set([]);
const DEFAULT_CONTENT_TYPE_SET = new Set([]);

const DEFAULT_SORT_ORDER = ExploreSortOrder.RarityHighest;

type SelectedTraitsDispatchAction =
  | {
      trait: SelectedTrait;
      type: "select_trait";
    }
  | {
      trait: SelectedTrait;
      type: "unselect_trait";
    };

export type GenerativeSeriesContextData = {
  addAvailability: (val: ExploreAvailabilityV2) => void;
  addContentType: (val: ContentTypeForFilters) => void;
  availabilitySet: Set<ExploreAvailabilityV2>;
  contentTypeSet: Set<ContentTypeForFilters>;
  currencyConfig: Maybe<CurrencyConfig>;
  currencyNameFromUrlParam: Maybe<CurrencyEnum>;
  decimalsFromUrlParam: Maybe<string>;
  dispatchSelectedTraits: Dispatch<SelectedTraitsDispatchAction>;
  highPrice: Maybe<number>;
  lowPrice: Maybe<number>;
  removeAvailability: (val: ExploreAvailabilityV2) => void;
  removeContentType: (val: ContentTypeForFilters) => void;
  selectedTraits: Array<SelectedTrait>;
  setCurrencyConfig: (val: Maybe<CurrencyConfig>) => void;
  setHighPrice: (val: Maybe<number>) => void;
  setLowPrice: (val: Maybe<number>) => void;
  setSortOrder: (val: ExploreSortOrder) => void;
  sortOrder: ExploreSortOrder;
};

export const GenerativeSeriesContext: Context<GenerativeSeriesContextData> =
  createContext<GenerativeSeriesContextData>({
    addAvailability: emptyFunction,
    addContentType: emptyFunction,
    availabilitySet: new Set([ExploreAvailabilityV2.LiveAuctionWithBids]),
    contentTypeSet: DEFAULT_CONTENT_TYPE_SET,
    currencyConfig: null,
    currencyNameFromUrlParam: null,
    decimalsFromUrlParam: null,
    dispatchSelectedTraits: emptyFunction,
    highPrice: null,
    lowPrice: null,
    removeAvailability: emptyFunction,
    removeContentType: emptyFunction,
    selectedTraits: [],
    setCurrencyConfig: emptyFunction,
    setHighPrice: emptyFunction,
    setLowPrice: emptyFunction,
    setSortOrder: emptyFunction,
    sortOrder: DEFAULT_SORT_ORDER,
  });

function areTraitsEqual(trait1: SelectedTrait, trait2: SelectedTrait): boolean {
  return (
    trait1.traitName === trait2.traitName &&
    trait1.traitValue === trait2.traitValue
  );
}

function selectedTraitsReducer(
  state: Array<SelectedTrait>,
  action: SelectedTraitsDispatchAction
): Array<SelectedTrait> {
  switch (action.type) {
    case "select_trait":
      return removeDuplicatesWithComparison(
        [...state, action.trait],
        areTraitsEqual
      );
    case "unselect_trait":
      return state.filter((trait) => !areTraitsEqual(trait, action.trait));
    default:
      return assertUnreachable(action);
  }
}

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  defaultValues?: Partial<GenerativeSeriesContextData>;
};

export function GenerativeSeriesContextProvider({
  children,
  defaultValues,
}: ProviderProps): JSX.Element {
  const urlParams = getUrlParams();
  const navigate = useNavigate();
  const availabilitySetUrlParam = urlParams.get(
    ExploreUrlParamKey.AvailabilitySet
  );
  const contentTypeSetUrlParam = urlParams.get(ExploreUrlParamKey.ContentType);
  const [availabilitySet, setAvailabilitySet] = useState<
    Set<ExploreAvailabilityV2>
  >(
    !isEmptyString(availabilitySetUrlParam)
      ? defaultValues?.availabilitySet ??
          getAvailabilitySetFromUrlParam(availabilitySetUrlParam!)
      : DEFAULT_AVAILABILITY_SET
  );
  const [contentTypeSet, setContentTypeSet] = useState<
    Set<ContentTypeForFilters>
  >(
    !isEmptyString(contentTypeSetUrlParam)
      ? defaultValues?.contentTypeSet ??
          getContentTypeSetFromUrlParam(contentTypeSetUrlParam!)
      : DEFAULT_CONTENT_TYPE_SET
  );
  const [currencyConfig, setCurrencyConfig] = useState<Maybe<CurrencyConfig>>(
    defaultValues?.currencyConfig ?? null
  );
  const [lowPrice, setLowPrice] = useState<Maybe<number>>(
    defaultValues?.lowPrice ??
      maybeNumber(urlParams.get(ExploreUrlParamKey.PriceLow))
  );
  const [highPrice, setHighPrice] = useState<Maybe<number>>(
    defaultValues?.highPrice ??
      maybeNumber(urlParams.get(ExploreUrlParamKey.PriceHigh))
  );
  const [sortOrder, setSortOrder] = useState<ExploreSortOrder>(
    defaultValues?.sortOrder ??
      (urlParams.get(
        ExploreUrlParamKey.SortOrderArtwork
      ) as ExploreSortOrder) ??
      DEFAULT_SORT_ORDER
  );
  const [debouncedLowPriceInFullDecimals] = useDebounce(lowPrice, 500);
  const [debouncedHighPriceInFullDecimals] = useDebounce(highPrice, 500);
  const [selectedTraits, dispatchSelectedTraits] = useReducer<
    typeof selectedTraitsReducer
  >(selectedTraitsReducer, []);
  const setAvailabilitySetCallback = useCallback(
    (val) => setAvailabilitySet(getAvailabilitySetFromUrlParam(val)),
    []
  );
  const setContentTypeSetCallback = useCallback(
    (val) => setContentTypeSet(getContentTypeSetFromUrlParam(val)),
    []
  );

  useListenForParamChange({
    defaultValue: "",
    onChange: setAvailabilitySetCallback,
    paramKey: ExploreUrlParamKey.AvailabilitySet,
  });
  useListenForParamChange({
    defaultValue: "",
    onChange: setContentTypeSetCallback,
    paramKey: ExploreUrlParamKey.ContentType,
  });
  useListenForParamChange({
    defaultValue: DEFAULT_SORT_ORDER,
    onChange: setSortOrder,
    paramKey: ExploreUrlParamKey.SortOrderArtwork,
  });
  useEffect(() => {
    // Since we don't use LD bootstrap on local, default state gets
    // messed up if we don't do this
    // TODO (@bryancho): remove
    setCurrencyConfig(null);
  }, []);

  return (
    <GenerativeSeriesContext.Provider
      value={{
        addAvailability: (val) =>
          addToParamSet(
            navigate,
            val,
            availabilitySet,
            ExploreUrlParamKey.AvailabilitySet
          ),
        addContentType: (val) =>
          addToParamSet(
            navigate,
            val,
            contentTypeSet,
            ExploreUrlParamKey.ContentType
          ),
        availabilitySet,
        contentTypeSet,
        currencyConfig,
        currencyNameFromUrlParam: urlParams.get(
          ExploreUrlParamKey.Currency
        ) as Maybe<CurrencyEnum>,
        decimalsFromUrlParam: urlParams.get(ExploreUrlParamKey.Decimals),
        dispatchSelectedTraits,
        highPrice: debouncedHighPriceInFullDecimals,
        lowPrice: debouncedLowPriceInFullDecimals,
        removeAvailability: (val) =>
          removeFromParamSet(
            navigate,
            val,
            availabilitySet,
            ExploreUrlParamKey.AvailabilitySet
          ),
        removeContentType: (val) =>
          removeFromParamSet(
            navigate,
            val,
            contentTypeSet,
            ExploreUrlParamKey.ContentType
          ),
        selectedTraits,
        setCurrencyConfig: wrapSetterWithNavigation(
          setCurrencyConfig,
          ExploreUrlParamKey.Currency,
          navigate,
          (item: Maybe<CurrencyConfig>) => {
            setCurrencyConfigCallback(item, navigate);
          },
          (item: Maybe<CurrencyConfig>) => item?.name
        ),
        setHighPrice: wrapSetterWithNavigation(
          setHighPrice,
          ExploreUrlParamKey.PriceHigh,
          navigate
        ),
        setLowPrice: wrapSetterWithNavigation(
          setLowPrice,
          ExploreUrlParamKey.PriceLow,
          navigate
        ),
        setSortOrder: (order) => {
          setSortOrder(order);
          navigate(getUrlWithParam(ExploreUrlParamKey.SortOrderArtwork, order));
        },
        sortOrder,
      }}
    >
      {children}
    </GenerativeSeriesContext.Provider>
  );
}
