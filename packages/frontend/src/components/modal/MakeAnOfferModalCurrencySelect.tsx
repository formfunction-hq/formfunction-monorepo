import CurrencySelect from "components/select/CurrencySelect";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useNftPageLoadCampaign from "hooks/nft-page/useNftPageLoadCampaign";
import { useNftPageCampaignQuery } from "hooks/nft-page/__generated__/useNftPageCampaignQuery.graphql";
import useNftPageContext from "hooks/useNftPageContext";
import { Suspense } from "react";
import { PreloadedQuery } from "react-relay";
import CurrencyConfig from "types/CurrencyConfig";
import Currency from "types/relay/Currency";

type Props = {
  currencyConfig: CurrencyConfig;
  listingCurrencyAllowlistOverride?: Currency;
  setCurrencyConfig: (config: Maybe<CurrencyConfig>) => void;
};

function Select({
  allowedCurrencyNames,
  currencyConfig,
  listingCurrencyAllowlistOverride,
  setCurrencyConfig,
}: Props & {
  allowedCurrencyNames?: Array<Currency>;
}) {
  return (
    <CurrencySelect
      allowedCurrencyNames={allowedCurrencyNames}
      currencyConfig={currencyConfig}
      setCurrencyConfig={setCurrencyConfig}
      listingCurrencyAllowlistOverride={listingCurrencyAllowlistOverride}
    />
  );
}

function DataLoader(
  props: Props & {
    nftCampaignQueryRef: PreloadedQuery<useNftPageCampaignQuery>;
  }
) {
  const { campaignGoalCurrency } = useNftPageLoadCampaign(
    props.nftCampaignQueryRef
  );
  const currencyName = campaignGoalCurrency?.name;

  return (
    <Select
      {...props}
      allowedCurrencyNames={currencyName == null ? undefined : [currencyName]}
    />
  );
}

export default function MakeAnOfferModalCurrencySelect(
  props: Props & { primarySaleHappened: boolean }
): JSX.Element {
  const { nftCampaignQueryRef } = useNftPageContext();

  if (nftCampaignQueryRef == null || props.primarySaleHappened) {
    return <Select {...props} />;
  }

  return (
    <Suspense fallback={null}>
      <DataLoader {...props} nftCampaignQueryRef={nftCampaignQueryRef} />
    </Suspense>
  );
}
