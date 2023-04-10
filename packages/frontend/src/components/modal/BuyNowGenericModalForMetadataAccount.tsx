import graphql from "babel-plugin-relay/macro";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import { useFragment } from "react-relay";
import { BuyNowGenericModalForMetadataAccount_MetadataAccount$key } from "components/modal/__generated__/BuyNowGenericModalForMetadataAccount_MetadataAccount.graphql";
import BuyNowGenericModal from "components/modal/BuyNowGenericModal";

const fragment = graphql`
  fragment BuyNowGenericModalForMetadataAccount_MetadataAccount on MetadataAccount {
    data {
      name
    }

    nft {
      CampaignFundingTier {
        ...CampaignBenefitsSection_CampaignFundingTierStandard
      }

      priceV2 {
        ...BuyNowGenericModal_Price
      }
    }

    ...ListingCardForMetadata_MetadataAccount
  }
`;

type Props = {
  buyDisabledDescription?: string;
  buySuccessButton?: JSX.Element;
  description: string;
  isLoading: boolean;
  isShown: boolean;
  isSuccess: boolean;
  metadataAccount: BuyNowGenericModalForMetadataAccount_MetadataAccount$key;
  nftKindPillOverride?: JSX.Element;
  onBuyNowClick: () => void;
  onHide: () => void;
  priceInput?: JSX.Element;
};

export default function BuyNowGenericModalForMetadataAccount({
  buyDisabledDescription,
  buySuccessButton,
  description,
  isLoading,
  isShown,
  isSuccess,
  metadataAccount,
  nftKindPillOverride,
  onBuyNowClick,
  onHide,
  priceInput,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);

  const listingCard = (
    <ListingCardForMetadata
      isBlurredOverride={false}
      enableMaxWidth
      nftKindPillOverride={nftKindPillOverride}
      metadataAccount={metadataAccountData}
    />
  );
  return (
    <BuyNowGenericModal
      buyDisabledDescription={buyDisabledDescription}
      buySuccessButton={buySuccessButton}
      description={description}
      isLoading={isLoading}
      isShown={isShown}
      isSuccess={isSuccess}
      listingCard={listingCard}
      fundingTierData={metadataAccountData.nft.CampaignFundingTier}
      onBuyNowClick={onBuyNowClick}
      onHide={onHide}
      price={metadataAccountData.nft.priceV2!}
      priceInput={priceInput}
      nftName={metadataAccountData.data.name}
    />
  );
}
