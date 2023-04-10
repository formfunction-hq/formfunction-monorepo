/* eslint-disable react/jsx-no-constructed-context-values */
import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import ProfileUrlParamKey from "formfn-shared/dist/types/enums/ProfileUrlParamKey";
import getUrlParam from "utils/getUrlParam";

export type ProfilePageModalData = {
  isCreateAirdropsModalShown: boolean;
  isCreateSeriesModalShown: boolean;
  isManageSeriesModalShown: boolean;
  setIsCreateAirdropsModalShown: Dispatch<SetStateAction<boolean>>;
  setIsCreateSeriesModalShown: Dispatch<SetStateAction<boolean>>;
  setIsManageSeriesModalShown: Dispatch<SetStateAction<boolean>>;
};

export const ProfilePageModalContext: Context<ProfilePageModalData> =
  createContext<ProfilePageModalData>({
    isCreateAirdropsModalShown: false,
    isCreateSeriesModalShown: false,
    isManageSeriesModalShown: false,
    setIsCreateAirdropsModalShown: emptyFunction,
    setIsCreateSeriesModalShown: emptyFunction,
    setIsManageSeriesModalShown: emptyFunction,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export default function ProfilePageModalContextProvider(
  props: ProviderProps
): JSX.Element {
  const createSeriesUrlParam = getUrlParam(ProfileUrlParamKey.CreateSeries);
  const createAirdropUrlParam = getUrlParam(ProfileUrlParamKey.CreateAirdrop);
  const [isCreateAirdropsModalShown, setIsCreateAirdropsModalShown] =
    useState<boolean>(createAirdropUrlParam === "1" || false);
  const [isCreateSeriesModalShown, setIsCreateSeriesModalShown] =
    useState<boolean>(createSeriesUrlParam === "1" || false);
  const [isManageSeriesModalShown, setIsManageSeriesModalShown] =
    useState<boolean>(false);

  // For cases where the context is already instantiated (e.g., already on profile page)
  // we need to watch for a change in the param value to show the modal
  useEffect(() => {
    if (createSeriesUrlParam === "1" && !isCreateSeriesModalShown) {
      setIsCreateSeriesModalShown(true);
    }
    if (createAirdropUrlParam === "1" && !isCreateAirdropsModalShown) {
      setIsCreateAirdropsModalShown(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createAirdropUrlParam, createSeriesUrlParam]);

  return (
    <ProfilePageModalContext.Provider
      value={{
        isCreateAirdropsModalShown,
        isCreateSeriesModalShown,
        isManageSeriesModalShown,
        setIsCreateAirdropsModalShown,
        setIsCreateSeriesModalShown,
        setIsManageSeriesModalShown,
      }}
    >
      {props.children}
    </ProfilePageModalContext.Provider>
  );
}
