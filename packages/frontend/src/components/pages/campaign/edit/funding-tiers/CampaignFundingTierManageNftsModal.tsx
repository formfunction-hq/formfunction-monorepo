import GenericModal from "components/modal/GenericModal";
import FontClass from "types/enums/FontClass";
import styles from "css/pages/campaign/edit/funding-tiers/CampaignFundingTierManageNftsModal.module.css";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import graphql from "babel-plugin-relay/macro";
import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { RefObject, Suspense, useRef, useState } from "react";
import ErrorMessage from "components/text/ErrorMessage";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import ElementId from "types/enums/ElementId";
import { CampaignFundingTierManageNftsModal_CampaignFundingTierStandard$key } from "components/pages/campaign/edit/funding-tiers/__generated__/CampaignFundingTierManageNftsModal_CampaignFundingTierStandard.graphql";
import useWindowDimensions from "hooks/useWindowDimensions";
import { CampaignFundingTierManageNftsModalUpdateMutation } from "components/pages/campaign/edit/funding-tiers/__generated__/CampaignFundingTierManageNftsModalUpdateMutation.graphql";
import FundingTierNftSearch from "components/pages/campaign/edit/funding-tiers/FundingTierNftSearch";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FundingTierNftSelectDnd from "components/pages/campaign/edit/funding-tiers/FundingTierNftSelectDnd";
import FlexBox from "components/layout/FlexBox";
import useUserContext from "hooks/useUserContext";
import { CampaignFundingTierManageNftsModalMetadataAccountsQuery } from "components/pages/campaign/edit/funding-tiers/__generated__/CampaignFundingTierManageNftsModalMetadataAccountsQuery.graphql";
import useFundingTierNftsContext from "hooks/useFundingTierNftsContext";
import { FIRST_FOR_FUNDING_TIER_NFTS } from "hooks/campaign-page/v2/useCampaignPageFundingTiers";

const updateMutation = graphql`
  mutation CampaignFundingTierManageNftsModalUpdateMutation(
    $input: UpdateCampaignFundingTierNftsInput!
    $firstForFundingTierNfts: PaginationAmount!
  ) {
    CampaignsNamespace {
      updateCampaignFundingTierNfts(input: $input) {
        campaignFundingTier {
          ... on CampaignFundingTierStandard {
            nftOrder
            # We want to be able to manage all the NFTs in the funding tier
            # If this becomes a performance issue, may need to consider a different approach
            metadataAccountsMutationResponse: metadataAccounts(
              first: $firstForFundingTierNfts
            ) {
              edges {
                node {
                  id
                  nft {
                    id
                  }
                  mint
                  ...GenericNftSearchRow_MetadataAccount
                  ...GenericNftSearchDndRow_MetadataAccount
                }
              }
            }
            ...FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard
            ...CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard
          }
        }
      }
    }
  }
`;

const fundingTierFragment = graphql`
  fragment CampaignFundingTierManageNftsModal_CampaignFundingTierStandard on CampaignFundingTierStandard {
    id
  }
`;

export const metadataAccountsQuery = graphql`
  query CampaignFundingTierManageNftsModalMetadataAccountsQuery(
    $after: String
    $first: PaginationAmount!
    $input: MetadataAccountsAvailableToAddToCampaignInput!
  ) {
    ...FundingTierNftSearchMetadataAccounts_Query
  }
`;

type InnerProps = {
  fundingTier: CampaignFundingTierManageNftsModal_CampaignFundingTierStandard$key;
  onHide: () => void;
  popoverRef: RefObject<HTMLElement>;
};

function Inner({ fundingTier, onHide, popoverRef }: InnerProps) {
  const { items, resetItems, resetItemsUsingResponse } =
    useFundingTierNftsContext();

  const [commit, inFlight] =
    useMutation<CampaignFundingTierManageNftsModalUpdateMutation>(
      updateMutation
    );

  const { user } = useUserContext();

  const fundingTierData = useFragment(fundingTierFragment, fundingTier);

  const fundingTierMetadata =
    useLazyLoadQuery<CampaignFundingTierManageNftsModalMetadataAccountsQuery>(
      metadataAccountsQuery,
      {
        first: 200,
        input: {
          campaignFundingTierId: fundingTierData.id,
          creatorAddress: user?.id ?? "",
        },
      },
      { fetchPolicy: "network-only" }
    );

  const { id: campaignFundingTierId } = fundingTierData;
  const [errorMessage, setErrorMessage] = useState<Maybe<string>>(null);

  const onSubmit = () => {
    commit({
      onCompleted: (response) => {
        resetItemsUsingResponse(
          response.CampaignsNamespace.updateCampaignFundingTierNfts
            .campaignFundingTier
        );
        onHide();
      },
      onError: (e: Error) => {
        setErrorMessage(e.message);
        resetItems();
      },
      variables: {
        firstForFundingTierNfts: FIRST_FOR_FUNDING_TIER_NFTS,
        input: {
          campaignFundingTierId,
          nftIds: items.map((item) => item.mint),
        },
      },
    });
  };

  return (
    <FlexBox marginTop="48px" flexDirection="column" gap={16}>
      <FundingTierNftSearch
        popoverRef={popoverRef}
        fundingTierMetadata={fundingTierMetadata}
      />
      <FundingTierNftSelectDnd />
      {errorMessage != null && (
        <ErrorMessage fontClass={FontClass.Body1}>{errorMessage}</ErrorMessage>
      )}
      <div className={styles.saveButtonContainer}>
        <div className={styles.saveButtonDivider} />
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.saveButton}
          fontClass={FontClass.NavLink}
          isLoading={inFlight}
          type="submit"
          onClick={onSubmit}
        >
          Save
        </ButtonWithText>
      </div>
    </FlexBox>
  );
}

type Props = {
  fundingTier: CampaignFundingTierManageNftsModal_CampaignFundingTierStandard$key;
  isShown: boolean;
  onHide: () => void;
};

export default function CampaignFundingTierManageNftsModal({
  isShown,
  fundingTier,
  onHide,
}: Props) {
  const popoverRef = useRef(null);
  const { height: windowHeight } = useWindowDimensions();
  const { resetItems } = useFundingTierNftsContext();

  return (
    <GenericModal
      bottomDrawerHeight={windowHeight - 40}
      isShown={isShown}
      className={styles.modal}
      modalId={ElementId.CampaignFundingTierManageNftsModal}
      onHide={() => {
        onHide();
        resetItems();
      }}
      title="Add NFTs to this tier"
      excludeRefs={[popoverRef]}
    >
      <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
        Add, reorder, and remove NFTs in this tier. You can add pieces that you
        minted earlier that have not sold, or mint new pieces.{" "}
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
          display="inline"
          fontClass={FontClass.Body1Medium}
          href="/create"
          type="link_external"
        >
          Mint a new piece
        </TextButton>
      </Body1>
      <Suspense
        fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
      >
        <Inner
          onHide={onHide}
          fundingTier={fundingTier}
          popoverRef={popoverRef}
        />
      </Suspense>
    </GenericModal>
  );
}
