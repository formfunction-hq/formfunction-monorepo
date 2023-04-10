import {
  FundingTierNftsContext,
  FundingTierNftsContextData,
} from "components/pages/campaign/edit/funding-tiers/FundingTierNftsContext";
import { useContext } from "react";

export default function useFundingTierNftsContext(): FundingTierNftsContextData {
  return useContext(FundingTierNftsContext);
}
