import ResponsivePageBody from "components/containers/ResponsivePageBody";
import { Suspense, useState } from "react";
import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import FontClass from "types/enums/FontClass";
import ErrorMessage from "components/text/ErrorMessage";
import CampaignHeaderStatusBanner from "components/pages/campaign/campaign-generic/CampaignHeaderStatusBanner";
import CampaignCategoryExpress_enum from "types/relay/CampaignCategoryExpress_enum";
import CampaignColorSchemeExpress_enum from "types/relay/CampaignColorSchemeExpress_enum";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import graphql from "babel-plugin-relay/macro";
import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";
import Page404Content from "components/pages/errors/Page404Content";
import useUserContext from "hooks/useUserContext";
import { useNavigate, useParams } from "react-router-dom";
import useErrorMessage from "hooks/useErrorMessage";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import CampaignBasicInfoForm, {
  CampaignBasicInfoFormData,
  CAMPAIGN_NAME_TAKEN_ERROR_MSG_SUBSTRING,
} from "components/pages/campaign/basic-info/CampaignBasicInfoForm";
import RELAY_FUTURE_UNION_VALUE from "constants/RelayFutureUnionValue";
import { UserSearchContextProvider } from "context/UserSearchContext";
import useUserSearchContext from "hooks/useUserSearchContext";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import CurrencyConfig from "types/CurrencyConfig";
import useGetCurrencyConfigForCurrencyExpress from "hooks/useGetCurrencyConfigForCurrencyExpress";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";
import { notify } from "components/toast/notifications";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import {
  CampaignEditBasicInfoPageQuery,
  CampaignEditBasicInfoPageQuery$variables,
} from "components/pages/campaign/basic-info/__generated__/CampaignEditBasicInfoPageQuery.graphql";
import { CampaignEditBasicInfoPageMutation } from "components/pages/campaign/basic-info/__generated__/CampaignEditBasicInfoPageMutation.graphql";
import { CampaignEditBasicInfoPage_CampaignV2$key } from "components/pages/campaign/basic-info/__generated__/CampaignEditBasicInfoPage_CampaignV2.graphql";
import usePreventRefresh from "hooks/usePreventRefresh";
import getBasicInfoMutationInput from "components/pages/campaign/basic-info/getBasicInfoMutationInput";

const mutation = graphql`
  mutation CampaignEditBasicInfoPageMutation(
    $input: UpdateCampaignBasicInfoInput!
  ) {
    CampaignsNamespace {
      updateCampaignBasicInfo(input: $input) {
        campaign {
          slug
          ...CampaignEditBasicInfoPage_CampaignV2
          ...CampaignPageDraftModeContent_CampaignV2
        }
      }
    }
  }
`;

const fragment = graphql`
  fragment CampaignEditBasicInfoPage_CampaignV2 on CampaignV2 {
    id

    category
    colorScheme
    goalProgressSymbol

    goal {
      __typename
      ... on CampaignMonetaryGoal {
        goalAmount
        currency {
          ...useGetCurrencyConfigForCurrencyExpress_CurrencyExpress
        }
      }
      ... on CampaignSaleCountGoal {
        goalAmount
      }
    }
    previewAsset {
      downloadUrl
    }
    tagline
    teamMembers {
      member {
        ...useUserSearchBarUserExpress_UserExpress
      }
    }
    title

    ...CampaignHeaderStatusBanner_CampaignV2
  }
`;

const query = graphql`
  query CampaignEditBasicInfoPageQuery($input: CampaignV2ForSlugInput!) {
    CampaignsNamespace {
      campaignV2ForSlug(input: $input) {
        campaign {
          ...CampaignEditBasicInfoPage_CampaignV2
        }
      }
    }
  }
`;

function Content({
  campaign,
}: {
  campaign: CampaignEditBasicInfoPage_CampaignV2$key;
}): JSX.Element {
  const campaignData = useFragment(fragment, campaign);
  const [commit] = useMutation<CampaignEditBasicInfoPageMutation>(mutation);
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { username } = useParams();
  const { id } = user || {};
  const [errorMessage, setErrorMessage] = useErrorMessage();
  const { selectedUsers } = useUserSearchContext();
  const existingCurrencyConfig = useGetCurrencyConfigForCurrencyExpress(
    campaignData?.goal.__typename === "CampaignMonetaryGoal"
      ? campaignData!.goal.currency
      : null
  );
  const [currencyConfig, setCurrencyConfig] = useState<Maybe<CurrencyConfig>>(
    existingCurrencyConfig
  );
  const [isLoading, setIsLoading] = useState(false);

  // Campaign goal should always exist and goal type should never be %other
  if (
    campaignData.goal == null ||
    campaignData.goal.__typename === RELAY_FUTURE_UNION_VALUE
  ) {
    return <Page404Content />;
  }

  const defaultValues = {
    campaignName: campaignData.title ?? "",
    category: campaignData.category as CampaignCategoryExpress_enum,
    colorScheme: campaignData.colorScheme as CampaignColorSchemeExpress_enum,
    emoji: campaignData.goalProgressSymbol ?? "",
    previewImageFile: null,
    price: String(
      formatDecimals(
        Number(campaignData.goal.goalAmount),
        currencyConfig!.decimals
      )
    ),
    tagline: campaignData.tagline ?? "",
  };

  const onSubmit = async (formData: CampaignBasicInfoFormData) => {
    setIsLoading(true);
    const input = await getBasicInfoMutationInput(
      currencyConfig,
      formData,
      selectedUsers,
      id
    );
    commit({
      onCompleted: (response) => {
        setIsLoading(false);
        notify({ message: "Campaign updated!", type: "info" });
        const {
          CampaignsNamespace: {
            updateCampaignBasicInfo: {
              campaign: { slug },
            },
          },
        } = response;
        navigate(getCampaignLinkRelative(username!, slug));
      },
      onError: (e) => {
        setIsLoading(false);
        if (e.message.includes(CAMPAIGN_NAME_TAKEN_ERROR_MSG_SUBSTRING)) {
          setErrorMessage(ErrorMessageMsg.CampaignNameTaken);
        } else {
          setErrorMessage(ErrorMessageMsg.UnexpectedError);
        }
      },
      variables: {
        input: {
          campaignId: campaignData.id,
          ...input,
        },
      },
    });
  };

  return (
    <>
      <CampaignHeaderStatusBanner campaign={campaignData} />
      <ResponsivePageBody>
        <CampaignBasicInfoForm
          currencyConfig={currencyConfig!}
          setCurrecyConfig={setCurrencyConfig}
          defaultValues={defaultValues}
          isLoading={isLoading}
          onSubmit={onSubmit}
          previewImageUrl={campaignData?.previewAsset?.downloadUrl}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          submitButtonTextOverride="Save basic info"
        />
        {errorMessage != null && (
          <ErrorMessage fontClass={FontClass.Body1}>
            {errorMessage}
          </ErrorMessage>
        )}
      </ResponsivePageBody>
    </>
  );
}

function ContentAndUserSearchContext({
  campaign,
}: {
  campaign: CampaignEditBasicInfoPage_CampaignV2$key;
}) {
  const campaignData = useFragment(fragment, campaign);

  return (
    <UserSearchContextProvider
      users={campaignData?.teamMembers?.map(({ member }) => member)}
    >
      <Content campaign={campaign} />
    </UserSearchContextProvider>
  );
}

function DataLoader(): JSX.Element {
  const { user } = useUserContext();
  const { id } = user || {};
  const { campaignSlug } = useParams();

  const campaignData: CampaignEditBasicInfoPageQuery$variables = {
    input: { campaignSlug: campaignSlug ?? "", creatorId: id },
  };
  const {
    CampaignsNamespace: {
      campaignV2ForSlug: { campaign },
    },
  } = useLazyLoadQuery<CampaignEditBasicInfoPageQuery>(query, campaignData);

  if (campaign == null) {
    return (
      <ResponsivePageBody>
        <Page404Content />
      </ResponsivePageBody>
    );
  }

  return <ContentAndUserSearchContext campaign={campaign} />;
}

export default function CampaignEditBasicInfoPage(): JSX.Element {
  usePreventRefresh(true);

  return (
    <DisconnectedPageContainer>
      <PageWithHeaderAndFooter>
        <Suspense
          fallback={
            <ResponsivePageBody>
              <LoadingSpinner colorValue={ColorValue.BrightPurple} />
            </ResponsivePageBody>
          }
        >
          <DataLoader />
        </Suspense>
      </PageWithHeaderAndFooter>
    </DisconnectedPageContainer>
  );
}
