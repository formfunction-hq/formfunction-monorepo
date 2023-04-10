import GenericModal from "components/modal/GenericModal";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import styles from "css/pages/campaign/edit/CampaignAboutModal.module.css";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import { useForm } from "react-hook-form";
import InputLabel from "components/input/InputLabel";
import { useMutation, useFragment } from "react-relay";
import { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import { CampaignAboutModalMutation } from "components/pages/campaign/edit/__generated__/CampaignAboutModalMutation.graphql";
import ErrorMessage from "components/text/ErrorMessage";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import { CampaignAboutModal_CampaignV2$key } from "components/pages/campaign/edit/__generated__/CampaignAboutModal_CampaignV2.graphql";
import {
  ABOUT_CAMPAIGN_SUB_LABEL,
  ABOUT_CREATOR_SUB_LABEL,
  CAMPAIGN_ABOUT_QUESTIONS_SUB_LABEL,
  ABOUT_RISKS_AND_CHALLENGES_SUB_LABEL,
  ABOUT_PROJECT_GOALS_SUB_LABEL,
} from "constants/InputSubLabels";
import InputWithLabel from "components/input/InputWithLabel";
import FormTextArea from "components/input/FormTextArea";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

const mutation = graphql`
  mutation CampaignAboutModalMutation($input: UpdateCampaignAboutInput!) {
    CampaignsNamespace {
      updateCampaignAbout(input: $input) {
        campaign {
          ...CampaignPageDraftModeContent_CampaignV2
        }
      }
    }
  }
`;

const fragment = graphql`
  fragment CampaignAboutModal_CampaignV2 on CampaignV2 {
    id
    about {
      campaign
      contactInfo
      creator
      risksAndChallenges
      timeline
    }
  }
`;

type CampaignAboutFormData = {
  campaign: string;
  contactInfo: string;
  creator: string;
  risksAndChallenges: string;
  timeline: string;
};

type Props = {
  campaign: CampaignAboutModal_CampaignV2$key;
  isShown: boolean;
  onHide: () => void;
};
export default function CampaignAboutModal({
  campaign,
  isShown,
  onHide,
}: Props) {
  const campaignData = useFragment(fragment, campaign);
  const { about } = campaignData;
  const [commit, inFlight] = useMutation<CampaignAboutModalMutation>(mutation);
  const [errorMessage, setErrorMessage] =
    useState<Maybe<ErrorMessageMsg>>(null);
  const { register, watch, handleSubmit } = useForm<CampaignAboutFormData>({
    defaultValues: {
      campaign: about.campaign ?? "",
      contactInfo: about.contactInfo ?? "",
      creator: about.creator ?? "",
      risksAndChallenges: about.risksAndChallenges ?? "",
      timeline: about.timeline ?? "",
    },
    mode: "onTouched",
  });

  const onSubmit = (formData: CampaignAboutFormData) => {
    const {
      campaign: campaignFormData,
      creator,
      timeline,
      contactInfo,
      risksAndChallenges,
    } = formData;

    commit({
      onCompleted: () => {
        onHide();
        setErrorMessage(null);
      },
      onError: () => {
        setErrorMessage(ErrorMessageMsg.UnexpectedError);
      },
      variables: {
        input: {
          about: {
            campaign: campaignFormData,
            contactInfo,
            creator,
            risksAndChallenges,
            timeline,
          },
          campaignId: campaignData.id,
        },
      },
    });
  };

  return (
    <GenericModal
      isShown={isShown}
      onHide={() => {
        if (errorMessage != null) {
          setErrorMessage(null);
        }
        onHide();
      }}
      title="Set up About section"
    >
      <div className={styles.container}>
        <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
          Tell people more about your campaign and why it matters.
        </Body1>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit, emptyFunction)}
        >
          <InputWithLabel
            input={
              <FormTextArea
                placeholder="Share about your project and why people should support your campaign!"
                registerResult={register("campaign")}
                rows={2}
                value={watch("campaign")}
              />
            }
            label={
              <InputLabel
                label="About the campaign"
                subLabel={ABOUT_CAMPAIGN_SUB_LABEL}
              />
            }
          />
          <InputWithLabel
            input={
              <FormTextArea
                placeholder="Share about yourself!"
                registerResult={register("creator")}
                rows={2}
                value={watch("creator")}
              />
            }
            label={
              <InputLabel
                label="About the creator"
                subLabel={ABOUT_CREATOR_SUB_LABEL}
              />
            }
          />
          <InputWithLabel
            input={
              <FormTextArea
                placeholder="e.g. At 50 SOL raised, I'll be able to make the storyboards. At 100 SOL raised, I’ll start the production process. At 200 SOL raised (fully funded), I’ll complete the entire animated short."
                registerResult={register("timeline")}
                rows={4}
                value={watch("timeline")}
              />
            }
            label={
              <InputLabel
                label="Project goals"
                subLabel={ABOUT_PROJECT_GOALS_SUB_LABEL}
              />
            }
          />
          <InputWithLabel
            input={
              <FormTextArea
                placeholder="e.g. I've never worked with manufacturing before, so this will be a learning process."
                registerResult={register("risksAndChallenges")}
                rows={3}
                value={watch("risksAndChallenges")}
              />
            }
            label={
              <InputLabel
                label="Risks and challenges"
                subLabel={ABOUT_RISKS_AND_CHALLENGES_SUB_LABEL}
              />
            }
          />
          <InputWithLabel
            input={
              <FormTextArea
                placeholder="e.g. If you have any other questions, email me at myemail@email.com!"
                registerResult={register("contactInfo")}
                rows={2}
                value={watch("contactInfo")}
              />
            }
            label={
              <InputLabel
                label="Questions"
                subLabel={CAMPAIGN_ABOUT_QUESTIONS_SUB_LABEL}
              />
            }
          />
          <ButtonWithText
            className={styles.submitButton}
            buttonTheme={ButtonTheme.PurpleGradient}
            fontClass={FontClass.NavLink}
            type="submit"
            isLoading={inFlight}
          >
            Save
          </ButtonWithText>
        </form>
        {errorMessage != null && (
          <ErrorMessage fontClass={FontClass.Body1}>
            {errorMessage}
          </ErrorMessage>
        )}
      </div>
    </GenericModal>
  );
}
