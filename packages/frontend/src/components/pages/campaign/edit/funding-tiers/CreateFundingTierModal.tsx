import GenericModal from "components/modal/GenericModal";
import FontClass from "types/enums/FontClass";
import styles from "css/pages/campaign/edit/funding-tiers/CreateFundingTierModal.module.css";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import graphql from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import { useState } from "react";
import ErrorMessage from "components/text/ErrorMessage";
import FundingTierForm, {
  FundingTierFormData,
} from "components/pages/campaign/edit/funding-tiers/FundingTierForm";
import { CreateFundingTierModalMutation } from "components/pages/campaign/edit/funding-tiers/__generated__/CreateFundingTierModalMutation.graphql";
import { removeBulletPoints } from "components/input/TextAreaWithBulletPoints";

export const MODAL_DESCRIPTION =
  "Set up the different tiers and benefits for your campaign.";

const mutation = graphql`
  mutation CreateFundingTierModalMutation(
    $input: CreateCampaignFundingTierStandardInput!
  ) {
    CampaignsNamespace {
      createCampaignFundingTierStandard(input: $input) {
        campaign {
          id
          ...CampaignPageDraftModeContent_CampaignV2
        }
      }
    }
  }
`;

type Props = {
  campaignId: string;
  isShown: boolean;
  onHide: () => void;
};

export default function CreateFundingTierModal({
  campaignId,
  isShown,
  onHide,
}: Props) {
  const [commit, inFlight] =
    useMutation<CreateFundingTierModalMutation>(mutation);

  const [errorMessage, setErrorMessage] =
    useState<Maybe<ErrorMessageMsg>>(null);

  const onSubmit = async ({
    benefits,
    description,
    tierName,
  }: FundingTierFormData) => {
    commit({
      onCompleted: () => {
        onHide();
      },
      onError: () => {
        setErrorMessage(ErrorMessageMsg.UnexpectedError);
      },
      variables: {
        input: {
          benefits: removeBulletPoints(benefits),
          campaignId,
          description,
          title: tierName,
        },
      },
    });
  };

  return (
    <GenericModal isShown={isShown} onHide={onHide} title="Add a funding tier">
      <div className={styles.container}>
        <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
          {MODAL_DESCRIPTION}
        </Body1>
        <div className={styles.fundingTierFormContainer}>
          <FundingTierForm inFlight={inFlight} onSubmit={onSubmit} />
        </div>
        {errorMessage != null && (
          <ErrorMessage fontClass={FontClass.Body1}>
            {errorMessage}
          </ErrorMessage>
        )}
      </div>
    </GenericModal>
  );
}
