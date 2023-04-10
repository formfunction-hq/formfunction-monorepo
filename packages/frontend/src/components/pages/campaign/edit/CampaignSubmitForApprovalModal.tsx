import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import GenericModal from "components/modal/GenericModal";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import graphql from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import { useState } from "react";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import GenericConfirmationModal from "components/modal/GenericConfirmationModal";
import { CampaignSubmitForApprovalModalMutation } from "components/pages/campaign/edit/__generated__/CampaignSubmitForApprovalModalMutation.graphql";
import CampaignDraftChecklist from "components/pages/campaign/edit/CampaignDraftChecklist";
import { CampaignDraftChecklist_CampaignV2$key } from "components/pages/campaign/edit/__generated__/CampaignDraftChecklist_CampaignV2.graphql";
import CampaignPublishOrSubmitContainer from "components/pages/campaign/edit/CampaignPublishOrSubmitContainer";
import TextButtonTheme from "types/enums/TextButtonTheme";
import TextButton from "components/buttons/TextButton";
import HelpCenterLink from "formfn-shared/dist/types/enums/HelpCenterLink";

const mutation = graphql`
  mutation CampaignSubmitForApprovalModalMutation(
    $input: SubmitCampaignForApprovalInput!
  ) {
    CampaignsNamespace {
      submitCampaignForApproval(input: $input) {
        campaign {
          ...CampaignPageDraftModeContent_CampaignV2
        }
      }
    }
  }
`;

type ModalState = "DEFAULT" | "SUBMITTED" | "ERROR";

function Content({
  campaign,
  inFlight,
  isShown,
  onHide,
  onSubmit,
  resetModalAndHide,
  state,
}: {
  campaign: CampaignDraftChecklist_CampaignV2$key;
  inFlight: boolean;
  isShown: boolean;
  onHide: () => void;
  onSubmit: () => void;
  resetModalAndHide: () => void;
  state: ModalState;
}) {
  switch (state) {
    case "DEFAULT":
      return (
        <GenericModal
          isShown={isShown}
          onHide={onHide}
          title="Submit for approval"
        >
          <CampaignPublishOrSubmitContainer>
            <Body1
              textAlign="center"
              colorClass={ColorClass.Secondary}
              display="inline"
            >
              All campaigns must be submitted for review to make sure they meet
              campaign guidelines. Once approved, you will still be able to edit
              the campaign before publishing it.{" "}
              <TextButton
                buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
                display="inline"
                href={HelpCenterLink.CampaignGuidelines}
                type="link_external"
              >
                Learn more
              </TextButton>
            </Body1>
            <CampaignDraftChecklist
              campaign={campaign}
              onSubmit={onSubmit}
              variant="submitForApproval"
              inFlight={inFlight}
            />
          </CampaignPublishOrSubmitContainer>
        </GenericModal>
      );
    case "SUBMITTED":
      return (
        <GenericConfirmationModal
          bodyText={
            <Body1
              colorClass={ColorClass.Primary}
              display="inline"
              textAlign="center"
            >
              Currently, all campaigns must be submitted for review to make sure
              they meet campaign guidelines.{" "}
              <TextButton
                buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
                display="inline"
                href={HelpCenterLink.CampaignGuidelines}
                type="link_external"
              >
                Learn more
              </TextButton>
            </Body1>
          }
          buttonText="Ok"
          onConfirmClick={resetModalAndHide}
          isShown={isShown}
          onHide={resetModalAndHide}
          title="You submitted your campaign!"
        />
      );
    case "ERROR":
      return (
        <GenericConfirmationModal
          bodyText="You need to fill out the basic details, gallery, funding tiers, and About section of your campaign before you can submit it for approval."
          buttonText="Go back"
          onConfirmClick={resetModalAndHide}
          isShown={isShown}
          onHide={resetModalAndHide}
          title="Your campaign isn't ready yet"
        />
      );
    default:
      return assertUnreachable(state as never);
  }
}

type Props = {
  campaign: CampaignDraftChecklist_CampaignV2$key;
  campaignId: string;
  isShown: boolean;
  onHide: () => void;
};

export default function CampaignSubmitForApprovalModal({
  campaign,
  campaignId,
  isShown,
  onHide,
}: Props): Maybe<JSX.Element> {
  const [commit, inFlight] =
    useMutation<CampaignSubmitForApprovalModalMutation>(mutation);
  const [modalState, setModalState] = useState<ModalState>("DEFAULT");

  const onSubmit = () => {
    commit({
      onCompleted: () => {
        setModalState("SUBMITTED");
      },
      onError: () => {
        // Display error message from server?
        setModalState("ERROR");
      },
      variables: {
        input: {
          campaignId,
        },
      },
    });
  };

  const resetModalAndHide = () => {
    setModalState("DEFAULT");
    onHide();
  };

  return (
    <Content
      campaign={campaign}
      isShown={isShown}
      inFlight={inFlight}
      onHide={onHide}
      onSubmit={onSubmit}
      resetModalAndHide={resetModalAndHide}
      state={modalState}
    />
  );
}
