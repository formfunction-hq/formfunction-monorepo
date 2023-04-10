import { PriceFunctionType } from "@formfunction-hq/formfunction-auction-house";
import graphql from "babel-plugin-relay/macro";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import PriceInput from "components/input/PriceInput";
import ListButton from "components/listing/ListButton";
import { PRICE_FUNCTION_TYPE_LABELS } from "components/listing/ListEditionsConstantOrMinimumPrice";
import ListingInputs from "components/listing/ListingInputs";
import { ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount$key } from "components/listing/__generated__/ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount.graphql";
import { notify } from "components/toast/notifications";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";
import useChangePriceForEditions from "hooks/useChangePriceForEditions";
import useGetCurrencyConfigForPrice from "hooks/useGetCurrencyConfigForPrice";
import { useState } from "react";
import { useFragment } from "react-relay";
import isValidPrice from "utils/price/isValidPrice";

const fragment = graphql`
  fragment ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount on MetadataAccount {
    nft {
      priceV2 {
        amount
        currencyInfo {
          decimals
        }

        ...useGetCurrencyConfigForPrice_Price
      }
    }

    ...useChangePriceForEditions_MetadataAccount
  }
`;

type Props = {
  isLoading: boolean;
  metadataAccount: ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount$key;
  onHide: () => void;
  priceFunctionType: PriceFunctionType.Constant | PriceFunctionType.Minimum;
  setIsLoading: (val: boolean) => void;
};

export default function ChangePriceForEditionsConstantOrMinimumPrice({
  isLoading,
  metadataAccount,
  onHide,
  priceFunctionType,
  setIsLoading,
}: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { amount: originalPrice } = metadataAccountData.nft.priceV2!;
  const { decimals } = metadataAccountData.nft.priceV2!.currencyInfo;
  const currencyConfig = useGetCurrencyConfigForPrice(
    metadataAccountData.nft.priceV2!
  );
  const [price, setPrice] = useState(
    originalPrice == null ? "" : formatDecimals(originalPrice, decimals)
  );
  const { changePriceForEditions } =
    useChangePriceForEditions(metadataAccountData);

  return (
    <>
      <ListingInputs>
        <InputWithLabel
          label={
            <InputLabel
              label={PRICE_FUNCTION_TYPE_LABELS[priceFunctionType].label}
              subLabel={PRICE_FUNCTION_TYPE_LABELS[priceFunctionType].subLabel}
            />
          }
          input={
            <PriceInput
              price={price}
              setPrice={setPrice}
              currencyConfig={currencyConfig}
              showUsdPrice
              showCurrencySymbol
            />
          }
        />
      </ListingInputs>
      <ListButton
        disabled={!isValidPrice(price, currencyConfig.decimals)}
        isLoading={isLoading}
        onClick={() =>
          changePriceForEditions({
            onCompleted: (txid: string) => {
              notify({ message: "The price has been changed", txid });
              setIsLoading(false);
              onHide();
            },
            onError: () => {
              notifyUnexpectedError();
            },
            priceFunctionType,
            priceParams: [],
            setIsLoading,
            startingPriceLamports: convertToFullDecimals(price, decimals),
          })
        }
      >
        Save
      </ListButton>
    </>
  );
}
