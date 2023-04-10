import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import TextButton from "components/buttons/TextButton";
import BottomDrawer from "components/drawers/BottomDrawer";
import GenericModal from "components/modal/GenericModal";
import styles from "css/modal/BuyNowGenericModal.module.css";
import useExchangeRatesContext from "hooks/useExchangeRatesContext";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Suspense } from "react";
import { useFragment } from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import usePreventRefresh from "hooks/usePreventRefresh";
import Body1 from "components/text/Body1";
import TinyLabel from "components/text/TinyLabel";
import { BOTTOM_DRAWER_BREAKPOINT } from "constants/Breakpoints";
import GenericSuccessModalContent from "components/modal/GenericSuccessModalContent";
import { notify } from "components/toast/notifications";
import PriceWithSymbol from "components/price/PriceWithSymbol";
import useFormattedNftPrice from "hooks/useFormattedNftPrice";
import {
  BuyNowGenericModal_Price$data,
  BuyNowGenericModal_Price$key,
} from "components/modal/__generated__/BuyNowGenericModal_Price.graphql";
import CampaignBenefitsSection from "components/campaign/CampaignBenefitsSection";
import { CampaignBenefitsSection_CampaignFundingTierStandard$key } from "components/campaign/__generated__/CampaignBenefitsSection_CampaignFundingTierStandard.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

const fragment = graphql`
  fragment BuyNowGenericModal_Price on Price {
    currencyInfo {
      name
    }

    ...PriceWithSymbol_Price
    ...useFormattedNftPrice_Price
  }
`;

function BuyNowPrice({
  price,
  usdPrice,
  verbOverride,
}: {
  price: BuyNowGenericModal_Price$data;
  usdPrice?: string;
  verbOverride?: string;
}) {
  return (
    <div className={styles.buyNowPriceContainer}>
      <div className={styles.buyNowPriceRow1}>
        <TinyLabel colorClass={ColorClass.Primary} textTransform="uppercase">
          {verbOverride ?? "Buy now"}
        </TinyLabel>
      </div>
      <div className={styles.buyNowPriceRow2}>
        <PriceWithSymbol
          fontClass={FontClass.ArtName}
          className={styles.buyNowPriceSol}
          price={price}
          textAlign="left"
        />
        {usdPrice != null && (
          <Body1 colorClass={ColorClass.Secondary}>{`~$${usdPrice} USD`}</Body1>
        )}
      </div>
    </div>
  );
}

function Right({
  buyNowDisabled,
  fundingTierData,
  isLoading,
  price,
  onBuyNowClick,
  onHide,
  priceInput,
  verbOverride,
}: {
  buyNowDisabled: boolean;
  fundingTierData?: Maybe<CampaignBenefitsSection_CampaignFundingTierStandard$key>;
  isLoading: boolean;
  onBuyNowClick: () => void;
  onHide: () => void;
  price: BuyNowGenericModal_Price$key;
  priceInput?: JSX.Element;
  verbOverride?: string;
}): JSX.Element {
  const { priceToUsd } = useExchangeRatesContext();
  const priceData = useFragment(fragment, price);
  const formattedPrice = useFormattedNftPrice(priceData);
  const usdPrice = priceToUsd(
    Number(formattedPrice),
    priceData?.currencyInfo.name ?? "Solana"
  );
  const { width } = useWindowDimensions();

  return (
    <div className={styles.right}>
      {priceInput == null ? (
        <BuyNowPrice
          price={priceData}
          usdPrice={usdPrice != null ? usdPrice : undefined}
          verbOverride={verbOverride}
        />
      ) : (
        priceInput
      )}
      {fundingTierData != null && (
        <CampaignBenefitsSection fundingTierData={fundingTierData} />
      )}
      <div className={styles.buttons}>
        {width > BOTTOM_DRAWER_BREAKPOINT && (
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
            fontClass={FontClass.Body1Medium}
            onClick={onHide}
          >
            Nevermind
          </TextButton>
        )}
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.buyNowButton}
          disabled={buyNowDisabled}
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          onClick={onBuyNowClick}
        >
          {verbOverride ?? "Buy Now"}
        </ButtonWithText>
      </div>
    </div>
  );
}

type Props = {
  buyDisabledDescription?: string;
  buySuccessButton?: JSX.Element;
  description: string;
  fundingTierData?: Maybe<CampaignBenefitsSection_CampaignFundingTierStandard$key>;
  isLoading: boolean;
  isShown: boolean;
  isSuccess: boolean;
  listingCard: JSX.Element;
  nftName: string;
  onBuyNowClick: () => void;
  onHide: () => void;
  price: BuyNowGenericModal_Price$key;
  priceInput?: JSX.Element;
  titleOverride?: string;
  verbOverride?: string;
};

export default function BuyNowGenericModal({
  buyDisabledDescription,
  buySuccessButton,
  description,
  fundingTierData,
  isLoading,
  isShown,
  isSuccess,
  listingCard,
  nftName,
  onBuyNowClick,
  onHide,
  price,
  priceInput,
  titleOverride,
  verbOverride,
}: Props): JSX.Element {
  const { width } = useWindowDimensions();

  usePreventRefresh(isShown && isLoading);

  const onHidePleaseWait = () => {
    if (isLoading && !isSuccess) {
      notify({
        duration: 2,
        message: "Please wait for your transaction to finish processing",
        type: "info",
      });
      return;
    }

    onHide();
  };

  const body = (
    <div className={styles.container}>
      <Body1 colorClass={ColorClass.Secondary} textAlign="center">
        {description}
      </Body1>
      {buyDisabledDescription && (
        <Body1
          className={styles.buyDisabledDescription}
          colorClass={ColorClass.Error}
          textAlign="center"
        >
          {buyDisabledDescription}
        </Body1>
      )}
      <div className={styles.body}>
        {listingCard}
        <Suspense fallback={null}>
          <Right
            buyNowDisabled={buyDisabledDescription != null}
            isLoading={isLoading}
            price={price}
            fundingTierData={fundingTierData}
            onBuyNowClick={onBuyNowClick}
            onHide={onHidePleaseWait}
            priceInput={priceInput}
            verbOverride={verbOverride}
          />
        </Suspense>
      </div>
    </div>
  );

  const title = isSuccess
    ? "Your purchase was successful"
    : titleOverride ?? "Buy now";
  const content = isSuccess ? (
    <GenericSuccessModalContent
      button={buySuccessButton}
      onHide={onHide}
      // NOTE: we don't show the price in this message b/c for linear editions,
      // it would show the price of the NEXT edition (since buying an edition updates the price)
      message={`You successfully purchased ${nftName}!`}
      type="standard"
    />
  ) : (
    body
  );

  if (width <= BOTTOM_DRAWER_BREAKPOINT) {
    return (
      <BottomDrawer isShown={isShown} onHide={onHidePleaseWait} title={title}>
        <div className={styles.bottomDrawerContainer}>{content}</div>
      </BottomDrawer>
    );
  }

  return (
    <GenericModal isShown={isShown} onHide={onHidePleaseWait} title={title}>
      {content}
    </GenericModal>
  );
}
