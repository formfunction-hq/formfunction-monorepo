/* eslint-disable react/jsx-no-constructed-context-values */
import {
  Context,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import ExploreSortOrder from "types/enums/ExploreSortOrder";
import ExploreTab from "types/enums/ExploreTab";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import getUrlParams from "utils/getUrlParams";
import maybeNumber from "utils/maybeNumber";
import useExploreTab from "hooks/useExploreTab";
import { NavigateFunction, useNavigate } from "react-router-dom";
import getUrlWithParam from "utils/getUrlWithParam";
import useListenForParamChange from "hooks/useListenForParamChange";
import { forceCheck } from "react-lazyload";
import ExploreAvailabilityV2 from "types/enums/ExploreAvailabilityV2";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import CurrencyConfig from "types/CurrencyConfig";
import { useDebounce } from "use-debounce";
import getUrlWithoutParam from "utils/getUrlWithoutParam";
import CurrencyEnum from "types/relay/Currency";
import ExploreUrlParamKey from "types/enums/ExploreUrlParamKey";
import wrapSetterWithNavigation from "utils/urlparams/wrapSetterWithNavigation";
import getAvailabilitySetFromUrlParam from "utils/urlparams/getAvailabilitySetFromUrlParam";
import addToParamSet from "utils/urlparams/addToParamSet";
import removeFromParamSet from "utils/urlparams/removeFromParamSet";
import CampaignSortOrder_enum from "types/relay/CampaignSortOrder_enum";
import { ExcludeFutureAddedValue } from "types/ExcludeFutureAddedValue";
import CampaignCategoryExpress_enum from "types/relay/CampaignCategoryExpress_enum";
import CAMPAIGN_CATEGORIES from "constants/CampaignCategories";
import getCategoriesFromUrlParam from "utils/urlparams/getCategoriesFromUrlParam";
import addToParamArray from "utils/urlparams/addToParamArray";
import removeFromParamArray from "utils/urlparams/removeFromParamArray";

export type CampaignSortOrder = ExcludeFutureAddedValue<CampaignSortOrder_enum>;

const DEFAULT_CAMPAIGN_SORT_ORDER: CampaignSortOrder = "Newest";

export function setCurrencyConfigCallback(
  currencyConfig: Maybe<CurrencyConfig>,
  navigate: NavigateFunction
) {
  if (currencyConfig == null) {
    navigate(getUrlWithoutParam(ExploreUrlParamKey.Decimals));
  } else if (currencyConfig != null) {
    navigate(
      getUrlWithParam(ExploreUrlParamKey.Decimals, currencyConfig.decimals)
    );
  }
}

export type ExploreContextData = {
  addAvailability: (val: ExploreAvailabilityV2) => void;
  availabilitySet: Set<ExploreAvailabilityV2>;
  campaigns: {
    addCategory: (val: CampaignCategoryExpress_enum) => void;
    categories: Array<CampaignCategoryExpress_enum>;
    removeCategory: (val: CampaignCategoryExpress_enum) => void;
    setSortOrder: (val: CampaignSortOrder) => void;
    sortOrder: CampaignSortOrder;
  };
  currencyConfig: Maybe<CurrencyConfig>;
  currencyNameFromUrlParam: Maybe<CurrencyEnum>;
  decimalsFromUrlParam: Maybe<string>;
  hasPnft: boolean;
  hasUnlockable: boolean;
  highPrice: Maybe<number>;
  lowPrice: Maybe<number>;
  primaryMarket: boolean;
  removeAvailability: (val: ExploreAvailabilityV2) => void;
  secondaryMarket: boolean;
  setCurrencyConfig: (val: Maybe<CurrencyConfig>) => void;
  setHasPnft: (val: boolean) => void;
  setHasUnlockable: (val: boolean) => void;
  setHighPrice: (val: Maybe<number>) => void;
  setLowPrice: (val: Maybe<number>) => void;
  setPrimaryMarket: (val: boolean) => void;
  setSecondaryMarket: (val: boolean) => void;
  setSortOrder: (val: ExploreSortOrder) => void;
  setTab: (val: ExploreTab) => void;
  sortOrder: ExploreSortOrder;
  sortOrderForArtwork: ExploreSortOrder;
  sortOrderForCreators: ExploreSortOrder;
  sortOrderForEditions: ExploreSortOrder;
  sortOrderForSeries: ExploreSortOrder;
  tab: ExploreTab;
};

export const ExploreContext: Context<ExploreContextData> =
  createContext<ExploreContextData>({
    addAvailability: emptyFunction,
    availabilitySet: new Set([ExploreAvailabilityV2.LiveAuctionWithBids]),
    campaigns: {
      addCategory: emptyFunction,
      categories: [],
      removeCategory: emptyFunction,
      setSortOrder: emptyFunction,
      sortOrder: DEFAULT_CAMPAIGN_SORT_ORDER,
    },
    currencyConfig: null,
    currencyNameFromUrlParam: null,
    decimalsFromUrlParam: null,
    hasPnft: false,
    hasUnlockable: false,
    highPrice: null,
    lowPrice: null,
    primaryMarket: true,
    removeAvailability: emptyFunction,
    secondaryMarket: true,
    setCurrencyConfig: emptyFunction,
    setHasPnft: emptyFunction,
    setHasUnlockable: emptyFunction,
    setHighPrice: emptyFunction,
    setLowPrice: emptyFunction,
    setPrimaryMarket: emptyFunction,
    setSecondaryMarket: emptyFunction,
    setSortOrder: emptyFunction,
    setTab: emptyFunction,
    sortOrder: ExploreSortOrder.Newest,
    sortOrderForArtwork: ExploreSortOrder.AuctionEndEarliest,
    sortOrderForCreators: ExploreSortOrder.Newest,
    sortOrderForEditions: ExploreSortOrder.MostRecentlySold,
    sortOrderForSeries: ExploreSortOrder.MostRecentlyAddedTo,
    tab: ExploreTab.Artwork,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

type ExploreTabConfig = {
  defaultAvailabilitySet: Set<ExploreAvailabilityV2>;
  shouldUseExtraParams: boolean;
  shouldUseMarketParams: boolean;
};

function getTabConfig(tab: ExploreTab): ExploreTabConfig {
  switch (tab) {
    case ExploreTab.Artwork:
      return {
        defaultAvailabilitySet: new Set([
          ExploreAvailabilityV2.LiveAuctionWithBids,
          ExploreAvailabilityV2.ReservePrice,
        ]),
        shouldUseExtraParams: true,
        shouldUseMarketParams: true,
      };
    case ExploreTab.Creators:
      return {
        defaultAvailabilitySet: new Set<ExploreAvailabilityV2>(),
        shouldUseExtraParams: false,
        shouldUseMarketParams: false,
      };
    case ExploreTab.Editions:
      return {
        defaultAvailabilitySet: new Set([ExploreAvailabilityV2.Available]),
        shouldUseExtraParams: false,
        shouldUseMarketParams: false,
      };
    case ExploreTab.Series:
      return {
        defaultAvailabilitySet: new Set([
          ExploreAvailabilityV2.LiveAuctionWithBids,
          ExploreAvailabilityV2.ReservePrice,
        ]),
        shouldUseExtraParams: false,
        shouldUseMarketParams: false,
      };
    case ExploreTab.Campaigns:
      return {
        defaultAvailabilitySet: new Set(),
        shouldUseExtraParams: false,
        shouldUseMarketParams: false,
      };
    default:
      return assertUnreachable(tab);
  }
}

export function ExploreContextProvider({
  children,
}: ProviderProps): JSX.Element {
  const urlParams = getUrlParams();
  const navigate = useNavigate();
  const availabilitySetUrlParam = urlParams.get(
    ExploreUrlParamKey.AvailabilitySet
  );
  const categoriesUrlParam = urlParams.get(ExploreUrlParamKey.Categories);
  const [campaignSortOrder, setCampaignSortOrder] = useState<CampaignSortOrder>(
    DEFAULT_CAMPAIGN_SORT_ORDER
  );
  const [tab, setTab] = useExploreTab();
  const [availabilitySet, setAvailabilitySet] = useState<
    Set<ExploreAvailabilityV2>
  >(
    !isEmptyString(availabilitySetUrlParam)
      ? getAvailabilitySetFromUrlParam(availabilitySetUrlParam!)
      : getTabConfig(tab).defaultAvailabilitySet
  );
  const [currencyConfig, setCurrencyConfig] =
    useState<Maybe<CurrencyConfig>>(null);
  const [lowPrice, setLowPrice] = useState<Maybe<number>>(
    maybeNumber(urlParams.get(ExploreUrlParamKey.PriceLow))
  );
  const [highPrice, setHighPrice] = useState<Maybe<number>>(
    maybeNumber(urlParams.get(ExploreUrlParamKey.PriceHigh))
  );
  const [primaryMarket, setPrimaryMarket] = useState(
    urlParams.get(ExploreUrlParamKey.PrimaryMarket) ?? "true"
  );
  const [secondaryMarket, setSecondaryMarket] = useState(
    urlParams.get(ExploreUrlParamKey.SecondaryMarket) ?? "true"
  );
  const [hasPnft, setHasPnft] = useState(
    urlParams.get(ExploreUrlParamKey.HasPnft) ?? "false"
  );
  const [hasUnlockable, setHasUnlockable] = useState(
    urlParams.get(ExploreUrlParamKey.HasUnlockable) ?? "false"
  );
  const [sortOrderForArtwork, setSortOrderForArtwork] =
    useState<ExploreSortOrder>(
      (urlParams.get(
        ExploreUrlParamKey.SortOrderArtwork
      ) as ExploreSortOrder) ?? ExploreSortOrder.AuctionEndEarliest
    );
  const [sortOrderForEditions, setSortOrderForEditions] =
    useState<ExploreSortOrder>(
      (urlParams.get(
        ExploreUrlParamKey.SortOrderArtwork
      ) as ExploreSortOrder) ?? ExploreSortOrder.MostRecentlySold
    );
  const [sortOrderForCreators, setSortOrderForCreators] =
    useState<ExploreSortOrder>(
      (urlParams.get(
        ExploreUrlParamKey.SortOrderCreators
      ) as ExploreSortOrder) ?? ExploreSortOrder.Newest
    );
  const [sortOrderForSeries, setSortOrderForSeries] =
    useState<ExploreSortOrder>(
      (urlParams.get(ExploreUrlParamKey.SortOrderSeries) as ExploreSortOrder) ??
        ExploreSortOrder.MostRecentlyAddedTo
    );
  const [categories, setCategories] = useState<
    Array<CampaignCategoryExpress_enum>
  >(getCategoriesFromUrlParam(categoriesUrlParam));
  const setAvailabilitySetCallback = useCallback(
    (val) => setAvailabilitySet(getAvailabilitySetFromUrlParam(val)),
    []
  );
  const setCampaignCategoriesCallback = useCallback(
    (val) => setCategories(getCategoriesFromUrlParam(val)),
    []
  );
  const [debouncedLowPriceInFullDecimals] = useDebounce(lowPrice, 500);
  const [debouncedHighPriceInFullDecimals] = useDebounce(highPrice, 500);

  useListenForParamChange({
    defaultValue: Array.from(getTabConfig(tab).defaultAvailabilitySet).join(
      ","
    ),
    emptyValue: "",
    onChange: setAvailabilitySetCallback,
    paramKey: ExploreUrlParamKey.AvailabilitySet,
  });
  useListenForParamChange({
    defaultValue: DEFAULT_CAMPAIGN_SORT_ORDER,
    onChange: setCampaignSortOrder,
    paramKey: ExploreUrlParamKey.SortOrderCampaigns,
  });
  useListenForParamChange({
    defaultValue: "true",
    onChange: setPrimaryMarket,
    paramKey: ExploreUrlParamKey.PrimaryMarket,
  });
  useListenForParamChange({
    defaultValue: "true",
    onChange: setSecondaryMarket,
    paramKey: ExploreUrlParamKey.SecondaryMarket,
  });
  useListenForParamChange({
    defaultValue: "false",
    onChange: setHasPnft,
    paramKey: ExploreUrlParamKey.HasPnft,
  });
  useListenForParamChange({
    defaultValue: "false",
    onChange: setHasUnlockable,
    paramKey: ExploreUrlParamKey.HasUnlockable,
  });
  useListenForParamChange({
    defaultValue: ExploreSortOrder.AuctionEndEarliest,
    onChange: setSortOrderForArtwork,
    paramKey: ExploreUrlParamKey.SortOrderArtwork,
  });
  useListenForParamChange({
    defaultValue: ExploreSortOrder.Newest,
    onChange: setSortOrderForCreators,
    paramKey: ExploreUrlParamKey.SortOrderCreators,
  });
  useListenForParamChange({
    defaultValue: ExploreSortOrder.MostRecentlyAddedTo,
    onChange: setSortOrderForSeries,
    paramKey: ExploreUrlParamKey.SortOrderSeries,
  });
  useListenForParamChange({
    defaultValue: CAMPAIGN_CATEGORIES.join(","),
    emptyValue: "",
    onChange: setCampaignCategoriesCallback,
    paramKey: ExploreUrlParamKey.Categories,
  });

  function getSortOrderForTab() {
    switch (tab) {
      case ExploreTab.Artwork:
        return sortOrderForArtwork;
      case ExploreTab.Editions:
        return sortOrderForEditions;
      case ExploreTab.Creators:
        return sortOrderForCreators;
      case ExploreTab.Series:
        return sortOrderForSeries;
      case ExploreTab.Campaigns:
        return sortOrderForSeries;
      default:
        return assertUnreachable(tab);
    }
  }

  useEffect(() => {
    // Since we don't use LD bootstrap on local, default state gets
    // messed up if we don't do this
    // TODO (@bryancho): remove
    setCurrencyConfig(null);
  }, []);

  return (
    <ExploreContext.Provider
      value={{
        addAvailability: (val) =>
          addToParamSet(
            navigate,
            val,
            availabilitySet,
            ExploreUrlParamKey.AvailabilitySet
          ),
        availabilitySet,
        campaigns: {
          addCategory: (val: CampaignCategoryExpress_enum) =>
            addToParamArray(
              navigate,
              val,
              categories,
              ExploreUrlParamKey.Categories
            ),
          categories,
          removeCategory: (val: CampaignCategoryExpress_enum) =>
            removeFromParamArray(
              navigate,
              val,
              categories,
              ExploreUrlParamKey.Categories,
              CAMPAIGN_CATEGORIES.join(",")
            ),
          setSortOrder: wrapSetterWithNavigation(
            setCampaignSortOrder,
            ExploreUrlParamKey.SortOrderCampaigns,
            navigate
          ),
          sortOrder: campaignSortOrder,
        },
        currencyConfig,
        currencyNameFromUrlParam: urlParams.get(
          ExploreUrlParamKey.Currency
        ) as Maybe<CurrencyEnum>,
        decimalsFromUrlParam: urlParams.get(ExploreUrlParamKey.Decimals),
        hasPnft: getTabConfig(tab).shouldUseExtraParams && hasPnft === "true",
        hasUnlockable:
          getTabConfig(tab).shouldUseExtraParams && hasUnlockable === "true",
        highPrice: debouncedHighPriceInFullDecimals,
        lowPrice: debouncedLowPriceInFullDecimals,
        primaryMarket:
          getTabConfig(tab).shouldUseMarketParams && primaryMarket === "true",
        removeAvailability: (val) =>
          removeFromParamSet(
            navigate,
            val,
            availabilitySet,
            ExploreUrlParamKey.AvailabilitySet
          ),
        secondaryMarket:
          getTabConfig(tab).shouldUseMarketParams && secondaryMarket === "true",
        setCurrencyConfig: wrapSetterWithNavigation(
          setCurrencyConfig,
          ExploreUrlParamKey.Currency,
          navigate,
          (item: Maybe<CurrencyConfig>) => {
            setCurrencyConfigCallback(item, navigate);
          },
          (item: Maybe<CurrencyConfig>) => item?.name
        ),
        setHasPnft: (val) =>
          navigate(
            getUrlWithParam(ExploreUrlParamKey.HasPnft, val ? "true" : "false")
          ),
        setHasUnlockable: (val) =>
          navigate(
            getUrlWithParam(
              ExploreUrlParamKey.HasUnlockable,
              val ? "true" : "false"
            )
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
        setPrimaryMarket: (val) =>
          navigate(
            getUrlWithParam(
              ExploreUrlParamKey.PrimaryMarket,
              val ? "true" : "false"
            )
          ),
        setSecondaryMarket: (val) =>
          navigate(
            getUrlWithParam(
              ExploreUrlParamKey.SecondaryMarket,
              val ? "true" : "false"
            )
          ),

        setSortOrder: (order) => {
          switch (tab) {
            case ExploreTab.Artwork:
              setSortOrderForArtwork(order);
              navigate(
                getUrlWithParam(ExploreUrlParamKey.SortOrderArtwork, order)
              );
              break;
            case ExploreTab.Editions:
              setSortOrderForEditions(order);
              navigate(
                getUrlWithParam(ExploreUrlParamKey.SortOrderEditions, order)
              );
              break;
            case ExploreTab.Creators:
              setSortOrderForCreators(order);
              navigate(
                getUrlWithParam(ExploreUrlParamKey.SortOrderCreators, order)
              );
              break;
            case ExploreTab.Series:
              setSortOrderForSeries(order);
              navigate(
                getUrlWithParam(ExploreUrlParamKey.SortOrderSeries, order)
              );
              break;
            case ExploreTab.Campaigns:
              break;
            default:
              assertUnreachable(tab);
          }
        },
        setTab: (val) => {
          // Needed because we lazy load the contents in the tabs (e.g. ListingCardImage).
          // So when you start on one tab (e.g. the series tab) and then switch to another tab (e.g.
          // the artwork tab), we need to call this so the elements in the viewport actually render.
          setTimeout(forceCheck, 100);
          setTab(val);
        },
        sortOrder: getSortOrderForTab(),
        sortOrderForArtwork,
        sortOrderForCreators,
        sortOrderForEditions,
        sortOrderForSeries,
        tab,
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
}
