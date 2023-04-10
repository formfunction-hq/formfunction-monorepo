import { PriceFunctionType } from "@formfunction-hq/formfunction-auction-house";
import graphql from "babel-plugin-relay/macro";
import ListButton from "components/listing/ListButton";
import ListEditionsAdvancedOptions from "components/listing/ListEditionsAdvancedOptions";
import ListingCurrencyError from "components/listing/ListingCurrencyError";
import ListingInputs from "components/listing/ListingInputs";
import ListingPriceInput from "components/listing/ListingPriceInput";
import ListingTagsInput from "components/listing/ListingTagsInput";
import { ListEditionsConstantOrMinimumPrice_MetadataAccount$key } from "components/listing/__generated__/ListEditionsConstantOrMinimumPrice_MetadataAccount.graphql";
import { notify } from "components/toast/notifications";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import {
  BUY_NOW_LABEL,
  BUY_NOW_SUB_LABEL,
} from "constants/EditionsCopyConstants";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import useListEditionsForSale from "hooks/useListEditionsForSale";
import useListingContext from "hooks/useListingContext";
import { useState } from "react";
import { useFragment } from "react-relay";
import isValidPrice from "utils/price/isValidPrice";
import { ListEditionsContextProvider } from "context/ListEditionsContext";
import useListEditionsContext from "hooks/useListEditionsContext";
import useErrorMessage from "hooks/useErrorMessage";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import ErrorMessage from "components/text/ErrorMessage";
import FontClass from "types/enums/FontClass";
import { UserSearchContextProvider } from "context/UserSearchContext";

export const PRICE_FUNCTION_TYPE_LABELS = {
  [PriceFunctionType.Constant]: {
    label: BUY_NOW_LABEL,
    subLabel: BUY_NOW_SUB_LABEL,
  },
  [PriceFunctionType.Minimum]: {
    label: "Minimum price",
    subLabel:
      "This is the minimum price collectors can instantly buy each edition at. Collectors will have the ability to pay above the minimum price if they wish.",
  },
};

const DEFAULT_INPUT_STATES = {
  price: "",
  tags: [],
};

const fragment = graphql`
  fragment ListEditionsConstantOrMinimumPrice_MetadataAccount on MetadataAccount {
    primarySaleHappened
    ...useListEditionsForSale_MetadataAccount
  }
`;

type Props = {
  isLoading: boolean;
  metadataAccount: ListEditionsConstantOrMinimumPrice_MetadataAccount$key;
  onHide: () => void;
  priceFunctionType: PriceFunctionType.Constant | PriceFunctionType.Minimum;
  setIsLoading: (val: boolean) => void;
};

function Inner({
  isLoading,
  metadataAccount,
  onHide,
  priceFunctionType,
  setIsLoading,
}: Props) {
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
    setShowErrors,
  } = useListEditionsContext();
  const [tags, setTags] = useState<Array<string>>(DEFAULT_INPUT_STATES.tags);
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { listEditionsForSale } = useListEditionsForSale(metadataAccountData);
  const { currencyConfig, price, setPrice } = useListingContext();
  const [errorMessage, setErrorMessage] = useErrorMessage();

  const resetInputStates = () => {
    setPrice(DEFAULT_INPUT_STATES.price);
    setTags(DEFAULT_INPUT_STATES.tags);
  };

  return (
    <>
      <ListingInputs>
        <ListingPriceInput
          label={PRICE_FUNCTION_TYPE_LABELS[priceFunctionType].label}
          primarySaleHappened={metadataAccountData.primarySaleHappened}
          subLabel={PRICE_FUNCTION_TYPE_LABELS[priceFunctionType].subLabel}
          price={price}
          setPrice={setPrice}
        />
        <ListingCurrencyError />
        <ListingTagsInput setTags={setTags} tags={tags} />
        <ListEditionsAdvancedOptions showAllowlistInput />
      </ListingInputs>
      <ListButton
        disabled={!isValidPrice(price, currencyConfig.decimals)}
        isLoading={isLoading}
        onClick={() => {
          setShowErrors(true);
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
              priceFunctionType,
              priceParams: [],
              publicSaleStartTime: allowlistPhaseEndDateAndTime ?? undefined,
              startingPriceInFullDecimals: convertToFullDecimals(
                price,
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

export default function ListEditionsConstantOrMinimumPrice(props: Props) {
  return (
    <UserSearchContextProvider>
      <ListEditionsContextProvider>
        <Inner {...props} />
      </ListEditionsContextProvider>
    </UserSearchContextProvider>
  );
}
