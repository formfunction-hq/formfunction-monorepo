import styles from "css/listing/ListingPriceInput.module.css";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import CurrencySelect from "components/select/CurrencySelect";
import useListingContext from "hooks/useListingContext";
import PriceInput from "components/input/PriceInput";
import useNftPageContext from "hooks/useNftPageContext";
import { PreloadedQuery } from "react-relay";
import { useNftPageCampaignQuery } from "hooks/nft-page/__generated__/useNftPageCampaignQuery.graphql";
import { Suspense } from "react";
import CurrencyNameExpress_enum from "types/relay/Currency";
import useNftPageLoadCampaign from "hooks/nft-page/useNftPageLoadCampaign";

type Props = {
  label: string;
  placeholder?: string;
  price: string;
  setPrice: (val: string) => void;
  subLabel: string;
};

function Input({
  allowedCurrencyNames,
  label,
  placeholder,
  price,
  setPrice,
  subLabel,
}: Props & {
  allowedCurrencyNames?: Array<CurrencyNameExpress_enum>;
}) {
  const { currencyConfig, setCurrencyConfig, showCurrencyError } =
    useListingContext();

  return (
    <InputWithLabel
      label={<InputLabel label={label} subLabel={subLabel} />}
      input={
        <div className={styles.inputs}>
          <CurrencySelect
            allowedCurrencyNames={allowedCurrencyNames}
            currencyConfig={currencyConfig}
            setCurrencyConfig={setCurrencyConfig}
          />
          <PriceInput
            disabled={showCurrencyError}
            currencyConfig={currencyConfig}
            placeholder={placeholder}
            price={price}
            setPrice={setPrice}
            showUsdPrice
          />
        </div>
      }
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
    <Input
      {...props}
      allowedCurrencyNames={currencyName == null ? undefined : [currencyName]}
    />
  );
}

/**
 * This component is made rather complicated because when an NFT is in a campaign,
 * we need to restrict its currency to the campaign's currency.
 */
export default function ListingPriceInput(
  props: Props & { primarySaleHappened: boolean }
) {
  const { nftCampaignQueryRef } = useNftPageContext();

  if (nftCampaignQueryRef == null || props.primarySaleHappened) {
    return <Input {...props} />;
  }

  return (
    <Suspense fallback={null}>
      <DataLoader {...props} nftCampaignQueryRef={nftCampaignQueryRef} />
    </Suspense>
  );
}
