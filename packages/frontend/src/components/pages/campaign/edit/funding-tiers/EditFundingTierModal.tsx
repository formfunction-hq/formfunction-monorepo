import GenericModal from "components/modal/GenericModal";
import FontClass from "types/enums/FontClass";
import styles from "css/pages/campaign/edit/funding-tiers/CreateFundingTierModal.module.css";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import graphql from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import { useState } from "react";
import ErrorMessage from "components/text/ErrorMessage";
import FundingTierForm, {
  FundingTierFormData,
} from "components/pages/campaign/edit/funding-tiers/FundingTierForm";
import { EditFundingTierModal_CampaignFundingTierStandard$key } from "components/pages/campaign/edit/funding-tiers/__generated__/EditFundingTierModal_CampaignFundingTierStandard.graphql";
import { EditFundingTierModalUpdateMutation } from "components/pages/campaign/edit/funding-tiers/__generated__/EditFundingTierModalUpdateMutation.graphql";
import { EditFundingTierModalDeleteMutation } from "components/pages/campaign/edit/funding-tiers/__generated__/EditFundingTierModalDeleteMutation.graphql";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import TextButton from "components/buttons/TextButton";
import {
  getDefaultValueWithBulletPoints,
  removeBulletPoints,
} from "components/input/TextAreaWithBulletPoints";
import { MODAL_DESCRIPTION } from "components/pages/campaign/edit/funding-tiers/CreateFundingTierModal";

const updateMutation = graphql`
  mutation EditFundingTierModalUpdateMutation(
    $input: UpdateCampaignFundingTierStandardInput!
  ) {
    CampaignsNamespace {
      updateCampaignFundingTierStandard(input: $input) {
        campaign {
          ...CampaignPageDraftModeContent_CampaignV2
          fundingTiers {
            ...EditFundingTierModal_CampaignFundingTierStandard
          }
        }
      }
    }
  }
`;

const deleteMutation = graphql`
  mutation EditFundingTierModalDeleteMutation(
    $input: DeleteCampaignFundingTierInput!
  ) {
    CampaignsNamespace {
      deleteCampaignFundingTier(input: $input) {
        campaign {
          ...CampaignPageDraftModeContent_CampaignV2
          fundingTiers {
            ...EditFundingTierModal_CampaignFundingTierStandard
          }
        }
      }
    }
  }
`;

const fragment = graphql`
  fragment EditFundingTierModal_CampaignFundingTierStandard on CampaignFundingTierStandard {
    description
    title
    benefits {
      description
    }
    id
  }
`;

type Props = {
  fundingTier: EditFundingTierModal_CampaignFundingTierStandard$key;
  isShown: boolean;
  onHide: () => void;
};

export default function EditFundingTierModal({
  isShown,
  fundingTier,
  onHide,
}: Props) {
  const [commitUpdate, updateInFlight] =
    useMutation<EditFundingTierModalUpdateMutation>(updateMutation);
  const [commitDelete, deleteInFlight] =
    useMutation<EditFundingTierModalDeleteMutation>(deleteMutation);
  const fundingTierData = useFragment(fragment, fundingTier);

  const {
    description,
    title,
    benefits,
    id: campaignFundingTierId,
  } = fundingTierData;
  const defaultValues = {
    benefits: getDefaultValueWithBulletPoints(
      (benefits ?? []).map((benefit) => benefit.description)
    ),
    description,
    tierName: title,
  };
  const [errorMessage, setErrorMessage] =
    useState<Maybe<ErrorMessageMsg>>(null);

  const onSubmit = (formData: FundingTierFormData) => {
    const {
      benefits: formDataBenefits,
      description: formDataDescription,
      tierName,
    } = formData;

    commitUpdate({
      onCompleted: () => {
        onHide();
      },
      onError: () => {
        setErrorMessage(ErrorMessageMsg.UnexpectedError);
      },
      variables: {
        input: {
          benefits: removeBulletPoints(formDataBenefits),
          campaignFundingTierId,
          description: formDataDescription,
          title: tierName,
        },
      },
    });
  };

  const onDelete = () => {
    commitDelete({
      onCompleted: onHide,
      onError: () => {
        notifyUnexpectedError();
      },
      variables: { input: { campaignFundingTierId } },
    });
  };

  return (
    <GenericModal isShown={isShown} onHide={onHide} title="Edit funding tier">
      <div className={styles.container}>
        <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
          {MODAL_DESCRIPTION}
        </Body1>
        <div className={styles.fundingTierFormContainer}>
          <FundingTierForm
            defaultValues={defaultValues}
            inFlight={updateInFlight}
            onSubmit={onSubmit}
          />
        </div>
        <TextButton
          disabled={deleteInFlight}
          onClick={onDelete}
          fontClass={FontClass.NavLink}
          buttonThemeOrColorClass={ColorClass.Red}
          className={styles.deleteButton}
        >
          {deleteInFlight ? "Deleting..." : "Delete funding tier"}
        </TextButton>
        {errorMessage != null && (
          <ErrorMessage fontClass={FontClass.Body1}>
            {errorMessage}
          </ErrorMessage>
        )}
      </div>
    </GenericModal>
  );
}
