import ResponsivePageBody from "components/containers/ResponsivePageBody";
import { useState } from "react";
import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import FontClass from "types/enums/FontClass";
import ErrorMessage from "components/text/ErrorMessage";
import CampaignHeaderStatusBanner from "components/pages/campaign/campaign-generic/CampaignHeaderStatusBanner";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import graphql from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import { CreateCampaignPageMutation } from "components/pages/campaign/basic-info/__generated__/CreateCampaignPageMutation.graphql";
import useUserContext from "hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import useErrorMessage from "hooks/useErrorMessage";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import CampaignBasicInfoForm, {
  CampaignBasicInfoFormData,
  CAMPAIGN_NAME_TAKEN_ERROR_MSG_SUBSTRING,
} from "components/pages/campaign/basic-info/CampaignBasicInfoForm";
import { UserSearchContextProvider } from "context/UserSearchContext";
import useUserSearchContext from "hooks/useUserSearchContext";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import SOLANA_CURRENCY_CONFIG from "constants/SolanaCurrencyConfig";
import CurrencyConfig from "types/CurrencyConfig";
import { notify } from "components/toast/notifications";
import usePreventRefresh from "hooks/usePreventRefresh";
import getBasicInfoMutationInput from "components/pages/campaign/basic-info/getBasicInfoMutationInput";

const mutation = graphql`
  mutation CreateCampaignPageMutation($input: CreateCampaignInput!) {
    CampaignsNamespace {
      createCampaign(input: $input) {
        campaign {
          slug
          ...CampaignPageDraftModeContent_CampaignV2
        }
      }
    }
  }
`;

function Content(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [commit] = useMutation<CreateCampaignPageMutation>(mutation);
  const navigate = useNavigate();
  const { userId, user } = useUserContext();
  const [errorMessage, setErrorMessage] = useErrorMessage();
  const { selectedUsers } = useUserSearchContext();
  const [currencyConfig, setCurrencyConfig] = useState<Maybe<CurrencyConfig>>(
    SOLANA_CURRENCY_CONFIG
  );

  const onSubmit = async (formData: CampaignBasicInfoFormData) => {
    setIsLoading(true);
    const input = await getBasicInfoMutationInput(
      currencyConfig,
      formData,
      selectedUsers,
      userId
    );
    commit({
      onCompleted: (response) => {
        setIsLoading(false);
        notify({ message: "Campaign created!", type: "info" });
        const { slug } = response.CampaignsNamespace.createCampaign.campaign;
        navigate(getCampaignLinkRelative(user!.username, slug));
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
        input,
      },
    });
  };

  return (
    <DisconnectedPageContainer>
      <PageWithHeaderAndFooter>
        <CampaignHeaderStatusBanner campaign={null} />
        <ResponsivePageBody>
          <CampaignBasicInfoForm
            currencyConfig={currencyConfig!}
            setCurrecyConfig={setCurrencyConfig}
            isLoading={isLoading}
            onSubmit={onSubmit}
            errorMessage={errorMessage}
            previewImageUrl={null}
            setErrorMessage={setErrorMessage}
          />
          {errorMessage != null && (
            <ErrorMessage fontClass={FontClass.Body1}>
              {errorMessage}
            </ErrorMessage>
          )}
        </ResponsivePageBody>
      </PageWithHeaderAndFooter>
    </DisconnectedPageContainer>
  );
}

export default function CreateCampaignPage(): JSX.Element {
  usePreventRefresh(true);

  return (
    <UserSearchContextProvider>
      <Content />
    </UserSearchContextProvider>
  );
}
