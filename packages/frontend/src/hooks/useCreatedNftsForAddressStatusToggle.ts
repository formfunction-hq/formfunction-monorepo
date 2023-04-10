import { Dispatch, SetStateAction, useState } from "react";
import getUrlWithParam from "utils/getUrlWithParam";
import { useNavigate } from "react-router-dom";
import useListenForParamChange from "hooks/useListenForParamChange";
import getUrlParam from "utils/getUrlParam";
import CreatedNftsForAddressStatusToggle from "types/enums/CreatedNftsForAddressStatusToggle";

const URL_PARAM_KEY = "created-status";

export default function useCreatedNftsForAddressStatusToggle(): [
  CreatedNftsForAddressStatusToggle,
  Dispatch<SetStateAction<CreatedNftsForAddressStatusToggle>>
] {
  const navigate = useNavigate();
  const initialToggle = getUrlParam(URL_PARAM_KEY) || "";
  const [statusToggle, setStatusToggle] = useState(
    Object.values(CreatedNftsForAddressStatusToggle).includes(
      initialToggle as any
    )
      ? (initialToggle as CreatedNftsForAddressStatusToggle)
      : CreatedNftsForAddressStatusToggle.All
  );

  useListenForParamChange({
    defaultValue: CreatedNftsForAddressStatusToggle.All,
    onChange: (val) => setStatusToggle(val),
    paramKey: URL_PARAM_KEY,
    validValues: Object.values(CreatedNftsForAddressStatusToggle),
  });

  return [
    statusToggle,
    (val) => {
      navigate(getUrlWithParam(URL_PARAM_KEY, val as string));
    },
  ];
}
