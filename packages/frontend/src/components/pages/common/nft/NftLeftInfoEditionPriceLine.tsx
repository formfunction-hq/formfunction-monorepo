import graphql from "babel-plugin-relay/macro";
import Body1 from "components/text/Body1";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import parseEditionPriceParams from "formfn-shared/dist/utils/price/parseEditionPriceParams";
import { PriceFunctionType } from "@formfunction-hq/formfunction-auction-house";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useFragment } from "react-relay";
import { NftLeftInfoEditionPriceLine_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftLeftInfoEditionPriceLine_MetadataAccount.graphql";
import useNftPriceSymbol from "hooks/useNftPriceSymbol";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";

const fragment = graphql`
  fragment NftLeftInfoEditionPriceLine_MetadataAccount on MetadataAccount {
    nft {
      editionAllowlistEnabled
      editionPublicSaleStartTime

      priceV2 {
        ...useNftPriceSymbol_Price
        currencyInfo {
          decimals
        }
      }

      editionPriceInfo {
        allowlistPriceInFullDecimals
        priceFunctionType
        priceParams
        startingPriceInLamports
      }
    }
  }
`;

type Props = {
  metadataAccount: NftLeftInfoEditionPriceLine_MetadataAccount$key;
};

export default function NftLeftInfoEditionPriceLine({
  metadataAccount,
}: Props): Maybe<JSX.Element> {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const {
    nft: {
      editionAllowlistEnabled,
      editionPriceInfo,
      editionPublicSaleStartTime,
      priceV2,
    },
  } = metadataAccountData;
  const { shortSymbol, symbol } = useNftPriceSymbol(priceV2);

  if (editionPriceInfo == null || priceV2 == null) {
    return null;
  }

  const symbolToUse = shortSymbol ?? symbol;
  const {
    allowlistPriceInFullDecimals,
    priceFunctionType,
    priceParams: priceParamsRaw,
    startingPriceInLamports,
  } = editionPriceInfo;
  const formattedStartingPrice = formatDecimals(
    Number(startingPriceInLamports),
    priceV2.currencyInfo.decimals
  );

  const allowlistLabel = (
    <span className={FontClass.Body1Medium}>Allowlist price:</span>
  );
  const noAllowlistLabel = (
    <span className={FontClass.Body1Medium}>Price:</span>
  );
  const publicSaleLabel = (
    <span className={FontClass.Body1Medium}>Public sale price:</span>
  );
  const allowlistPrice =
    allowlistPriceInFullDecimals == null ? null : (
      <Body1 colorClass={ColorClass.Primary}>
        {allowlistLabel}{" "}
        {formatDecimals(
          allowlistPriceInFullDecimals,
          priceV2.currencyInfo.decimals
        )}{" "}
        {symbolToUse}
      </Body1>
    );
  const conditionalLabel =
    allowlistPriceInFullDecimals == null ? noAllowlistLabel : publicSaleLabel;
  const hidePublicSalePrice =
    editionAllowlistEnabled && editionPublicSaleStartTime == null;

  switch (priceFunctionType) {
    case "Constant":
      return (
        <>
          {allowlistPrice}
          {!hidePublicSalePrice && (
            <Body1 colorClass={ColorClass.Primary}>
              {conditionalLabel} {formattedStartingPrice} {symbolToUse} set
              price
            </Body1>
          )}
        </>
      );
    case "Linear": {
      const priceParams = parseEditionPriceParams(
        PriceFunctionType.Linear,
        priceParamsRaw
      );
      const formattedPriceIncrements = formatDecimals(
        Number(priceParams.priceIncrementInLamports),
        priceV2.currencyInfo.decimals
      );
      const formattedMaxPrice = formatDecimals(
        Number(priceParams.maxPriceInLamports),
        priceV2.currencyInfo.decimals
      );
      // TODO(@bryancho): use PriceGqlType for this
      return (
        <>
          {allowlistPrice}
          {!hidePublicSalePrice && (
            <Body1 colorClass={ColorClass.Primary}>
              {conditionalLabel} {formattedStartingPrice} {symbolToUse} starting
              price • {formattedPriceIncrements} {symbolToUse} increments
              {priceParams.maxPriceInLamports == null
                ? ""
                : ` • ${formattedMaxPrice} ${symbolToUse} max price`}
            </Body1>
          )}
        </>
      );
    }
    case "Minimum":
      return (
        <>
          {allowlistPrice}
          {!hidePublicSalePrice && (
            <Body1 colorClass={ColorClass.Primary}>
              {conditionalLabel} {formattedStartingPrice} {symbolToUse} minimum
              price
            </Body1>
          )}
        </>
      );
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(priceFunctionType);
  }
}
