/* eslint-disable react/jsx-no-constructed-context-values */
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import useSolanaContext from "hooks/useSolanaContext";
import { Context, createContext } from "react";

export type BottomTabsContextData = {
  bottomTabsHeight: number;
  hasBottomTabs?: boolean;
  hasBottomTabsProvider: boolean;
  hideBottomTabs?: boolean;
};

export const BottomTabsContext: Context<BottomTabsContextData> =
  createContext<BottomTabsContextData>({
    bottomTabsHeight: 0,
    hasBottomTabs: undefined,
    hasBottomTabsProvider: false,
    hideBottomTabs: undefined,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  hideBottomTabs?: boolean;
};

const BOTTOM_TABS_HEIGHT = 92;

export function BottomTabsProvider(props: ProviderProps): JSX.Element {
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const { anchorWallet } = useSolanaContext();
  const hasBottomTabs =
    anchorWallet === undefined && isBottomTabsWidth
      ? undefined
      : isBottomTabsWidth && anchorWallet != null;

  return (
    <BottomTabsContext.Provider
      value={{
        bottomTabsHeight: hasBottomTabs ? BOTTOM_TABS_HEIGHT : 0,
        hasBottomTabs,
        hasBottomTabsProvider: true,
        hideBottomTabs: props.hideBottomTabs,
      }}
    >
      {props.children}
    </BottomTabsContext.Provider>
  );
}
