/* eslint-disable react-hooks/exhaustive-deps */
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { useCampaignPageActivityQuery } from "hooks/campaign-page/v1/__generated__/useCampaignPageActivityQuery.graphql";
import { useCampaignPageCampaignQuery } from "hooks/campaign-page/v1/__generated__/useCampaignPageCampaignQuery.graphql";
import useIsPopheadzCampaign from "hooks/useIsPopheadzCampaign";
import { Context, createContext } from "react";
import { useQueryLoaderHookType } from "react-relay/relay-hooks/useQueryLoader";
import ColorScheme from "types/ColorScheme";
import ButtonTheme from "types/enums/ButtonTheme";
import getColorScheme from "utils/colors/getColorScheme";

const DEFAULT_COLOR_SCHEME = getColorScheme(
  "WebsiteBackground",
  "BrightPurple",
  "Primary",
  ButtonTheme.DarkGunmetal
);

export type CampaignContextData = {
  campaignSlug: string;
  colorScheme: Maybe<ColorScheme>;
  creatorUsername: string;
  loadCampaignActivityQuery: useQueryLoaderHookType<useCampaignPageActivityQuery>[1];
  loadCampaignQuery: useQueryLoaderHookType<useCampaignPageCampaignQuery>[1];
};

export const CampaignContext: Context<CampaignContextData> =
  createContext<CampaignContextData>({
    campaignSlug: "",
    colorScheme: null,
    creatorUsername: "",
    loadCampaignActivityQuery: emptyFunction,
    loadCampaignQuery: emptyFunction,
  });

type ProviderProps = {
  campaignSlug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;

  creatorUsername: string;
  loadCampaignActivityQuery: useQueryLoaderHookType<useCampaignPageActivityQuery>[1];
  loadCampaignQuery: useQueryLoaderHookType<useCampaignPageCampaignQuery>[1];
};

export function CampaignContextProvider({
  campaignSlug,
  children,
  creatorUsername,
  loadCampaignActivityQuery,
  loadCampaignQuery,
}: ProviderProps): JSX.Element {
  const isPopheadz = useIsPopheadzCampaign();
  return (
    <CampaignContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        campaignSlug,
        colorScheme: isPopheadz
          ? getColorScheme(
              "PopheadzLightGray",
              "PopheadzDarkGray",
              "Primary",
              ButtonTheme.DarkGunmetal
            )
          : DEFAULT_COLOR_SCHEME,
        creatorUsername,
        loadCampaignActivityQuery,
        loadCampaignQuery,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
}
