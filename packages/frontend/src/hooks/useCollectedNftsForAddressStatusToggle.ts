import { Dispatch, SetStateAction, useState } from "react";
import getUrlWithParam from "utils/getUrlWithParam";
import { useNavigate } from "react-router-dom";
import useListenForParamChange from "hooks/useListenForParamChange";
import getUrlParam from "utils/getUrlParam";
import CollectedNftsForAddressStatusToggle from "types/enums/CollectedNftsForAddressStatusToggle";

const URL_PARAM_KEY = "collected-status";

export default function useCollectedNftsForAddressStatusToggle(): [
  CollectedNftsForAddressStatusToggle,
  Dispatch<SetStateAction<CollectedNftsForAddressStatusToggle>>
] {
  const navigate = useNavigate();
  const initialToggle = getUrlParam(URL_PARAM_KEY) || "";
  const [statusToggle, setStatusToggle] = useState(
    Object.values(CollectedNftsForAddressStatusToggle).includes(
      initialToggle as any
    )
      ? (initialToggle as CollectedNftsForAddressStatusToggle)
      : CollectedNftsForAddressStatusToggle.All
  );

  useListenForParamChange({
    defaultValue: CollectedNftsForAddressStatusToggle.All,
    onChange: (val) => setStatusToggle(val),
    paramKey: URL_PARAM_KEY,
    validValues: Object.values(CollectedNftsForAddressStatusToggle),
  });

  return [
    statusToggle,
    (val) => {
      navigate(getUrlWithParam(URL_PARAM_KEY, val as string));
    },
  ];
}
