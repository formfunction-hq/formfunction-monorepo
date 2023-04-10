import { useLocation } from "react-router-dom";

export default function useIsTooniesCampaign() {
  const { pathname } = useLocation();
  return pathname.includes("campaigns/toonies");
}
