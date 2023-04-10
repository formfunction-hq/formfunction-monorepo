import { PriceFunctionType } from "@formfunction-hq/formfunction-auction-house";
import graphql from "babel-plugin-relay/macro";
import EditionsMaxPriceInput from "components/listing/EditionsMaxPriceInput";
import ListButton from "components/listing/ListButton";
import ListingInputs from "components/listing/ListingInputs";
import { ChangePriceForEditionsLinearPrice_MetadataAccount$key } from "components/listing/__generated__/ChangePriceForEditionsLinearPrice_MetadataAccount.graphql";
import ErrorMessage from "components/text/ErrorMessage";
import { notify } from "components/toast/notifications";
import {
  PRICE_INCREMENT_LABEL,
  PRICE_INCREMENT_PLACEHOLDER,
  PRICE_INCREMENT_SUB_LABEL,
  STARTING_PRICE_LABEL,
  STARTING_PRICE_PLACEHOLDER,
  STARTING_PRICE_SUB_LABEL,
} from "constants/EditionsCopyConstants";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import useChangePriceForEditions from "hooks/useChangePriceForEditions";
import useErrorMessage from "hooks/useErrorMessage";
import { useState } from "react";
import { useFragment } from "react-relay";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import FontClass from "types/enums/FontClass";
import isMaxPriceValid from "utils/price/isMaxPriceValid";
import isValidPrice from "utils/price/isValidPrice";
import parseEditionPriceParams from "formfn-shared/dist/utils/price/parseEditionPriceParams";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import PriceInput from "components/input/PriceInput";
import useGetCurrencyConfigForPrice from "hooks/useGetCurrencyConfigForPrice";
import MaxDecimals from "types/enums/MaxDecimals";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

const fragment = graphql`
  fragment ChangePriceForEditionsLinearPrice_MetadataAccount on MetadataAccount {
    nft {
      priceV2 {
        currencyInfo {
          decimals
        }
        ...useGetCurrencyConfigForPrice_Price
      }
      editionPriceInfo {
        priceParams
        startingPriceInLamports
      }
    }

    ...useChangePriceForEditions_MetadataAccount
  }
`;

type Props = {
  isLoading: boolean;
  metadataAccount: ChangePriceForEditionsLinearPrice_MetadataAccount$key;
  onHide: () => void;
  setIsLoading: (val: boolean) => void;
};

export default function ChangePriceForEditionsLinearPrice({
  isLoading,
  metadataAccount,
  onHide,
  setIsLoading,
}: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { editionPriceInfo } = metadataAccountData.nft;
  const currencyConfig = useGetCurrencyConfigForPrice(
    metadataAccountData.nft.priceV2!
  );
  const { decimals } = metadataAccountData.nft.priceV2!.currencyInfo;
  const [startingPrice, setStartingPrice] = useState(
    editionPriceInfo?.startingPriceInLamports != null
      ? formatDecimals(editionPriceInfo.startingPriceInLamports, decimals)
      : ""
  );
  const priceParamsRaw = editionPriceInfo?.priceParams ?? [];
  const priceParams = parseEditionPriceParams(
    PriceFunctionType.Linear,
    // If changing price from constant -> linear, the length will be 0
    priceParamsRaw.length === 0 ? [0] : priceParamsRaw
  );
  const [maxPrice, setMaxPrice] = useState(
    priceParams?.maxPriceInLamports != null
      ? formatDecimals(priceParams?.maxPriceInLamports, decimals)
      : ""
  );
  const [priceIncrement, setPriceIncrement] = useState(
    priceParams.priceIncrementInLamports === 0
      ? ""
      : formatDecimals(priceParams.priceIncrementInLamports, decimals)
  );
  const [isMaxPriceEnabled, setIsMaxPriceEnabled] = useState(
    priceParams.maxPriceInLamports != null
  );
  const { changePriceForEditions } =
    useChangePriceForEditions(metadataAccountData);
  const [showErrors, setShowErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useErrorMessage();

  const maxPriceValid = isMaxPriceValid(maxPrice, startingPrice, decimals);

  return (
    <>
      <ListingInputs>
        <InputWithLabel
          label={
            <InputLabel
              label={STARTING_PRICE_LABEL}
              subLabel={STARTING_PRICE_SUB_LABEL}
            />
          }
          input={
            <PriceInput
              placeholder={STARTING_PRICE_PLACEHOLDER}
              price={startingPrice}
              setPrice={setStartingPrice}
              currencyConfig={currencyConfig}
              showUsdPrice
              showCurrencySymbol
            />
          }
        />
        <InputWithLabel
          label={
            <InputLabel
              label={PRICE_INCREMENT_LABEL}
              subLabel={PRICE_INCREMENT_SUB_LABEL}
            />
          }
          input={
            <PriceInput
              placeholder={PRICE_INCREMENT_PLACEHOLDER}
              price={priceIncrement}
              setPrice={setPriceIncrement}
              currencyConfig={currencyConfig}
              showUsdPrice
              showCurrencySymbol
            />
          }
        />
        <EditionsMaxPriceInput
          currencyConfig={currencyConfig}
          hasError={showErrors && !maxPriceValid}
          isMaxPriceEnabled={isMaxPriceEnabled}
          price={maxPrice}
          setIsMaxPriceEnabled={(val) => {
            setIsMaxPriceEnabled(val);
            setErrorMessage(null);
          }}
          setPrice={(val) => {
            setMaxPrice(val);
            setErrorMessage(null);
          }}
        />
      </ListingInputs>
      <ListButton
        disabled={
          !isValidPrice(startingPrice, decimals) ||
          !isValidPrice(priceIncrement, decimals)
        }
        isLoading={isLoading}
        onClick={() => {
          setShowErrors(true);
          if (!maxPriceValid) {
            setErrorMessage(ErrorMessageMsg.InvalidMaxPrice);
            return;
          }

          changePriceForEditions({
            onCompleted: (txid: string) => {
              notify({ message: "The price has been changed", txid });
              setIsLoading(false);
              onHide();
            },
            onError: () => {
              notifyUnexpectedError();
            },
            priceFunctionType: PriceFunctionType.Linear,
            priceParams: filterNulls([
              convertToFullDecimals(priceIncrement, decimals),
              isMaxPriceEnabled &&
              isValidPrice(maxPrice, decimals, MaxDecimals.Price)
                ? convertToFullDecimals(maxPrice, decimals)
                : null,
            ]),
            setIsLoading,
            startingPriceLamports: convertToFullDecimals(
              startingPrice,
              decimals
            ),
          });
        }}
      >
        Save
      </ListButton>
      {errorMessage != null && (
        <ErrorMessage fontClass={FontClass.Body1}>{errorMessage}</ErrorMessage>
      )}
    </>
  );
}
