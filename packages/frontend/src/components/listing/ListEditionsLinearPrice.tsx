import { PriceFunctionType } from "@formfunction-hq/formfunction-auction-house";
import graphql from "babel-plugin-relay/macro";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import PriceInput from "components/input/PriceInput";
import EditionsMaxPriceInput from "components/listing/EditionsMaxPriceInput";
import ListButton from "components/listing/ListButton";
import ListEditionsAdvancedOptions from "components/listing/ListEditionsAdvancedOptions";
import ListingCurrencyError from "components/listing/ListingCurrencyError";
import ListingInputs from "components/listing/ListingInputs";
import ListingPriceInput from "components/listing/ListingPriceInput";
import ListingTagsInput from "components/listing/ListingTagsInput";
import { ListEditionsLinearPrice_MetadataAccount$key } from "components/listing/__generated__/ListEditionsLinearPrice_MetadataAccount.graphql";
import ErrorMessage from "components/text/ErrorMessage";
import { notify } from "components/toast/notifications";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import {
  PRICE_INCREMENT_LABEL,
  PRICE_INCREMENT_PLACEHOLDER,
  PRICE_INCREMENT_SUB_LABEL,
  STARTING_PRICE_LABEL,
  STARTING_PRICE_PLACEHOLDER,
  STARTING_PRICE_SUB_LABEL,
} from "constants/EditionsCopyConstants";
import { ListEditionsContextProvider } from "context/ListEditionsContext";
import { UserSearchContextProvider } from "context/UserSearchContext";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import useErrorMessage from "hooks/useErrorMessage";
import useListEditionsContext from "hooks/useListEditionsContext";
import useListEditionsForSale from "hooks/useListEditionsForSale";
import useListingContext from "hooks/useListingContext";
import { useState } from "react";
import { useFragment } from "react-relay";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import FontClass from "types/enums/FontClass";
import isMaxPriceValid from "utils/price/isMaxPriceValid";
import isValidPrice from "utils/price/isValidPrice";

const DEFAULT_INPUT_STATES = {
  maxPrice: "",
  priceIncrement: "",
  startingPrice: "",
  tags: [],
};

const fragment = graphql`
  fragment ListEditionsLinearPrice_MetadataAccount on MetadataAccount {
    primarySaleHappened
    ...useListEditionsForSale_MetadataAccount
  }
`;

type Props = {
  isLoading: boolean;
  metadataAccount: ListEditionsLinearPrice_MetadataAccount$key;
  onHide: () => void;
  setIsLoading: (val: boolean) => void;
};

function Inner({ isLoading, metadataAccount, onHide, setIsLoading }: Props) {
  const {
    advancedOptions: {
      allowlistAddresses,
      allowlistAmountAllowed: { allowlistAmountAllowed },
      allowlistEnabled,
      allowlistPhaseEnd: { allowlistPhaseEndDateAndTime },
      allowlistPhaseStart: { allowlistPhaseStartDateAndTime },
      allowlistPrice: { allowlistPriceEnabled, allowlistPrice },
      antiBotProtectionEnabled,
      editionBuyLimitPerAddress,
    },
    hasError,
    showErrors,
    setShowErrors,
  } = useListEditionsContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const [maxPrice, setMaxPrice] = useState("");
  const [priceIncrement, setPriceIncrement] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const { listEditionsForSale } = useListEditionsForSale(metadataAccountData);
  const [errorMessage, setErrorMessage] = useErrorMessage();
  const [isMaxPriceEnabled, setIsMaxPriceEnabled] = useState(false);
  const {
    currencyConfig,
    price: startingPrice,
    setPrice: setStartingPrice,
  } = useListingContext();

  const resetInputStates = () => {
    setMaxPrice(DEFAULT_INPUT_STATES.maxPrice);
    setPriceIncrement(DEFAULT_INPUT_STATES.priceIncrement);
    setStartingPrice(DEFAULT_INPUT_STATES.startingPrice);
    setTags(DEFAULT_INPUT_STATES.tags);
  };

  const maxPriceValid = isMaxPriceValid(
    maxPrice,
    startingPrice,
    currencyConfig.decimals
  );

  return (
    <>
      <ListingInputs>
        <ListingPriceInput
          label={STARTING_PRICE_LABEL}
          placeholder={STARTING_PRICE_PLACEHOLDER}
          primarySaleHappened={metadataAccountData.primarySaleHappened}
          subLabel={STARTING_PRICE_SUB_LABEL}
          price={startingPrice}
          setPrice={setStartingPrice}
        />
        <ListingCurrencyError />
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
        <ListingTagsInput setTags={setTags} tags={tags} />
        <ListEditionsAdvancedOptions showAllowlistInput={false} />
      </ListingInputs>
      <ListButton
        disabled={
          !isValidPrice(startingPrice, currencyConfig.decimals) ||
          !isValidPrice(priceIncrement, currencyConfig.decimals)
        }
        isLoading={isLoading}
        onClick={() => {
          setShowErrors(true);
          if (!maxPriceValid) {
            setErrorMessage(ErrorMessageMsg.InvalidMaxPrice);
            return;
          }
          if (hasError) {
            setErrorMessage(ErrorMessageMsg.InvalidInputs);
            return;
          }

          listEditionsForSale({
            editionsInput: {
              allowlistAddresses,
              allowlistAmountAllowed: Number(allowlistAmountAllowed),
              allowlistEnabled,
              allowlistPriceInFullDecimals: !allowlistPriceEnabled
                ? null
                : convertToFullDecimals(
                    allowlistPrice,
                    currencyConfig.decimals
                  ),
              allowlistStartTime: allowlistPhaseStartDateAndTime ?? undefined,
              priceFunctionType: PriceFunctionType.Linear,
              priceParams: filterNulls([
                convertToFullDecimals(priceIncrement, currencyConfig.decimals),
                isMaxPriceEnabled &&
                isValidPrice(maxPrice, currencyConfig.decimals)
                  ? convertToFullDecimals(maxPrice, currencyConfig.decimals)
                  : null,
              ]),
              publicSaleStartTime: allowlistPhaseEndDateAndTime ?? undefined,
              startingPriceInFullDecimals: convertToFullDecimals(
                startingPrice,
                currencyConfig.decimals
              ),
            },
            onCompleted: (txid: string) => {
              notify({ message: "Successfully listed", txid });
              setIsLoading(false);
              resetInputStates();
              onHide();
            },
            onError: () => {
              notifyUnexpectedError();
            },
            setIsLoading,
            tags,
            updateNftInput: {
              antiBotProtectionEnabled,
              editionBuyLimitPerAddress:
                editionBuyLimitPerAddress === ""
                  ? null
                  : Number(editionBuyLimitPerAddress),
            },
          });
        }}
      >
        Finish listing
      </ListButton>
      {hasError && errorMessage != null && (
        <ErrorMessage fontClass={FontClass.Body1}>{errorMessage}</ErrorMessage>
      )}
    </>
  );
}

export default function ListEditionsLinearPrice(props: Props) {
  return (
    <UserSearchContextProvider>
      <ListEditionsContextProvider>
        <Inner {...props} />
      </ListEditionsContextProvider>
    </UserSearchContextProvider>
  );
}
