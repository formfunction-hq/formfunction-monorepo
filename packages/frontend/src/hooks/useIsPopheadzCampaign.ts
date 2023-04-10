import { useLocation } from "react-router-dom";

export default function useIsPopheadzCampaign() {
  const { pathname } = useLocation();
  return pathname.includes("campaigns/popheadz");
}
