import { Dispatch, SetStateAction, useState } from "react";
import ProfileTabType from "types/enums/ProfileTabType";
import getUrlWithParam from "utils/getUrlWithParam";
import { useNavigate } from "react-router-dom";
import useListenForParamChange from "hooks/useListenForParamChange";
import getUrlParam from "utils/getUrlParam";

const URL_PARAM_KEY = "tab";

export default function useProfileTab(
  isCreator: boolean
): [ProfileTabType, Dispatch<SetStateAction<ProfileTabType>>] {
  const navigate = useNavigate();
  const initialTab = getUrlParam(URL_PARAM_KEY) || "";
  const defaultTab = isCreator
    ? ProfileTabType.Created
    : ProfileTabType.Collected;
  const [tab, setTab] = useState<ProfileTabType>(
    Object.values(ProfileTabType).includes(initialTab as any)
      ? (initialTab as ProfileTabType)
      : defaultTab
  );

  useListenForParamChange({
    defaultValue: defaultTab,
    onChange: setTab,
    paramKey: URL_PARAM_KEY,
    validValues: Object.values(ProfileTabType),
  });

  return [
    tab,
    (val) => {
      navigate(getUrlWithParam(URL_PARAM_KEY, val as string));
    },
  ];
}
