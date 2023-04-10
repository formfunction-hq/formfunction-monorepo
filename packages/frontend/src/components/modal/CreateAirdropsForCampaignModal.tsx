import graphql from "babel-plugin-relay/macro";
import { CreateAirdropsForCampaignModalMutation } from "components/modal/__generated__/CreateAirdropsForCampaignModalMutation.graphql";
import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";
import { CreateAirdropsForCampaignModal_CampaignV2$key } from "components/modal/__generated__/CreateAirdropsForCampaignModal_CampaignV2.graphql";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import { notify } from "components/toast/notifications";
import {
  CreateAirdropsForCampaignModalQuery,
  CreateAirdropsForCampaignModalQuery$data,
} from "components/modal/__generated__/CreateAirdropsForCampaignModalQuery.graphql";
import CreateAirdropsModalContent from "components/modal/CreateAirdropsModalContent";
import { Suspense, useState } from "react";
import GenericModal from "components/modal/GenericModal";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import FlexBox from "components/layout/FlexBox";
import ColorClass from "types/enums/ColorClass";
import flat from "formfn-shared/dist/utils/array/flat";
import ArtName from "components/text/ArtName";
import pluralize from "formfn-shared/dist/utils/pluralize";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import GenericFundingTiersInput from "components/input/GenericFundingTiersInput";

const query = graphql`
  query CreateAirdropsForCampaignModalQuery(
    $input: CampaignHoldersForSlugInput!
  ) {
    CampaignsNamespace {
      campaignHoldersForSlug {
        # Fetch all holders
        holdersByFundingTier(input: $input) {
          fundingTier {
            ... on ICampaignFundingTier {
              id
            }
            __typename
            ... on CampaignFundingTierStandard {
              ...GenericFundingTiersInput_CampaignFundingTierStandard
            }
          }
          holders {
            user {
              id
            }
          }
        }
      }
    }
  }
`;

const fragment = graphql`
  fragment CreateAirdropsForCampaignModal_CampaignV2 on CampaignV2 {
    slug
    creator {
      id
    }
  }
`;

const mutation = graphql`
  mutation CreateAirdropsForCampaignModalMutation(
    $input: CreateAirdropsInput!
    $postInput: CreatePostBaseForCampaignInput!
  ) {
    AirdropMutations {
      createAirdrops(input: $input) {
        airdrops {
          id
        }
      }
    }

    PostNamespace {
      createPostBaseForCampaign(input: $postInput) {
        post {
          __typename
        }
      }
    }
  }
`;

function getToAddresses(
  holderQueryData: CreateAirdropsForCampaignModalQuery$data,
  selectedFundingTierIds: Set<string>
) {
  return removeDuplicatesWithSet(
    flat(
      holderQueryData.CampaignsNamespace.campaignHoldersForSlug.holdersByFundingTier
        ?.filter((item) => selectedFundingTierIds.has(item.fundingTier.id!))
        ?.map((item) => [...item.holders.map(({ user }) => user)]) ?? []
    ).map((item) => item.id)
  );
}

function getValidFundingTiers(
  holderQueryData: CreateAirdropsForCampaignModalQuery$data
) {
  return holderQueryData.CampaignsNamespace.campaignHoldersForSlug.holdersByFundingTier
    ?.filter(
      ({ fundingTier, holders }) =>
        fundingTier.__typename === "CampaignFundingTierStandard" &&
        holders.length > 0
    )
    .map(({ fundingTier }) => fundingTier);
}

type Props = {
  campaign: CreateAirdropsForCampaignModal_CampaignV2$key;
  isShown: boolean;
  onHide: () => void;
};

function Content({
  campaignCreatorId,
  campaignSlug,
  holderQueryData,
  isLoading,
  onHide,
  setIsLoading,
}: {
  campaignCreatorId: string;
  campaignSlug: string;
  holderQueryData: CreateAirdropsForCampaignModalQuery$data;
  isLoading: boolean;
  onHide: () => void;
  setIsLoading: (val: boolean) => void;
}) {
  const [commit] =
    useMutation<CreateAirdropsForCampaignModalMutation>(mutation);
  const modalDescription =
    "You can airdrop a piece to all the current supporters of this project; " +
    "they will be notified about it through email.";
  const [selectedFundingTierIds, setSelectedFundingTierIds] = useState<
    Set<string>
  >(new Set());
  const toAddresses = getToAddresses(holderQueryData, selectedFundingTierIds);
  const numSupporters = toAddresses.length;
  const fundingTierSelectButtonText =
    selectedFundingTierIds.size === 0
      ? "Select supporters"
      : `${numSupporters} ${pluralize("supporter", numSupporters)} selected`;

  return (
    <CreateAirdropsModalContent
      audienceSelectSection={
        <FlexBox flexDirection="column" gap={16}>
          <ArtName colorClass={ColorClass.Primary}>
            Who should get this airdrop?
          </ArtName>
          <GenericFundingTiersInput
            fundingTiers={getValidFundingTiers(holderQueryData) ?? null}
            buttonText={fundingTierSelectButtonText}
            selectedFundingTierIds={selectedFundingTierIds}
            setSelectedFundingTierIds={setSelectedFundingTierIds}
          />
        </FlexBox>
      }
      description={modalDescription}
      isLoading={isLoading}
      numAirdrops={toAddresses.length}
      onHide={onHide}
      setIsLoading={setIsLoading}
      onCreateEditionDistributorCompleted={(mint: string) =>
        new Promise((resolve, reject) => {
          commit({
            onCompleted: () => {
              notify({
                description:
                  "You will be notified once your airdrop has been completed.",
                message: "Airdrop queued!",
                type: "info",
              });
              resolve();
            },
            onError: () => {
              notifyUnexpectedError();
              reject();
            },
            variables: {
              input: { masterEditionMint: mint, toAddresses, type: "Gift" },
              postInput: {
                airdropMasterEditionMint: mint,
                campaignSlug,
                creatorId: campaignCreatorId,
                postInput: {
                  title: "",
                  visibility: "CampaignSupportersOnly",
                  visibilityFundingTierIds:
                    selectedFundingTierIds.size > 0
                      ? Array.from(selectedFundingTierIds)
                      : null,
                },
              },
            },
          });
        })
      }
    />
  );
}

function QueryLoader({
  campaignCreatorId,
  campaignSlug,
  onHide,
  isLoading,
  setIsLoading,
}: {
  campaignCreatorId: string;
  campaignSlug: string;
  isLoading: boolean;
  onHide: () => void;
  setIsLoading: (val: boolean) => void;
}) {
  const queryData = useLazyLoadQuery<CreateAirdropsForCampaignModalQuery>(
    query,
    { input: { campaignSlug, creatorId: campaignCreatorId } }
  );

  return (
    <Content
      campaignCreatorId={campaignCreatorId}
      campaignSlug={campaignSlug}
      holderQueryData={queryData}
      onHide={onHide}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
}

export default function CreateAirdropsForCampaignModal({
  campaign,
  isShown,
  onHide,
}: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { slug: campaignSlug, creator } = useFragment(fragment, campaign);
  const onHideInner = () => {
    if (isLoading) {
      notify({
        duration: 2,
        message: "Please wait for your airdrop to finish setting up",
        type: "info",
      });
      return;
    }

    onHide();
  };

  return (
    <GenericModal
      title="Airdrop to supporters"
      isShown={isShown}
      onHide={onHideInner}
    >
      <Suspense
        fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
      >
        <QueryLoader
          campaignCreatorId={creator.id}
          campaignSlug={campaignSlug}
          isLoading={isLoading}
          onHide={onHide}
          setIsLoading={setIsLoading}
        />
      </Suspense>
    </GenericModal>
  );
}
