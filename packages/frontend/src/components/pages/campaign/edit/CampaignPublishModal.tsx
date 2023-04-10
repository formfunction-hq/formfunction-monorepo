import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import GenericModal from "components/modal/GenericModal";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import graphql from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import { useState } from "react";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import GenericConfirmationModal from "components/modal/GenericConfirmationModal";
import { CampaignPublishModalMutation } from "components/pages/campaign/edit/__generated__/CampaignPublishModalMutation.graphql";
import useConfetti from "hooks/useConfetti";
import CampaignDraftChecklist from "components/pages/campaign/edit/CampaignDraftChecklist";
import { CampaignDraftChecklist_CampaignV2$key } from "components/pages/campaign/edit/__generated__/CampaignDraftChecklist_CampaignV2.graphql";
import CampaignPublishOrSubmitContainer from "components/pages/campaign/edit/CampaignPublishOrSubmitContainer";

const mutation = graphql`
  mutation CampaignPublishModalMutation($input: PublishCampaignInput!) {
    CampaignsNamespace {
      publishCampaign(input: $input) {
        campaign {
          ...CampaignPageDraftModeContent_CampaignV2
        }
      }
    }
  }
`;

type Props = {
  campaign: CampaignDraftChecklist_CampaignV2$key;
  campaignId: string;
  isShown: boolean;
  onHide: () => void;
};

type ModalState = "BEFORE_SUBMISSION" | "SUBMITTED" | "ERROR";

export default function CampaignPublishModal({
  campaignId,
  isShown,
  campaign,
  onHide,
}: Props): Maybe<JSX.Element> {
  const [commit, inFlight] =
    useMutation<CampaignPublishModalMutation>(mutation);
  const [modalState, setModalState] = useState<ModalState>("BEFORE_SUBMISSION");
  const showConfetti = useConfetti();

  const onSubmit = () => {
    commit({
      onCompleted: () => {
        setModalState("SUBMITTED");
        showConfetti();
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
    setModalState("BEFORE_SUBMISSION");
    onHide();
  };

  const goToCampaignDashboard = () => {
    setModalState("BEFORE_SUBMISSION");
    onHide();
  };

  switch (modalState) {
    case "BEFORE_SUBMISSION":
      return (
        <GenericModal
          isShown={isShown}
          onHide={onHide}
          title="Publish your campaign"
        >
          <CampaignPublishOrSubmitContainer>
            <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
              Once you publish your campaign, it will be visible on your profile
              and in Explore, and you&apos;ll be able to share the link.
              You&apos;ll also be able to access your campaign dashboard to send
              updates to your campaign supporters.
              <br />
              <br />
              You can still edit your campaign in a limited capacity after
              publishing; specifically, you can edit everything besides the
              basic info (e.g. the title, goal, etc.).
            </Body1>
            <CampaignDraftChecklist
              campaign={campaign}
              onSubmit={onSubmit}
              variant="publish"
              inFlight={inFlight}
            />
          </CampaignPublishOrSubmitContainer>
        </GenericModal>
      );
    case "SUBMITTED":
      return (
        <GenericConfirmationModal
          bodyText="Your campaign is now visible from your profile. You can still add pieces to it."
          buttonText="Go to campaign dashboard"
          onConfirmClick={goToCampaignDashboard}
          isShown={isShown}
          onHide={goToCampaignDashboard}
          title="Your campaign was successfully published!"
        />
      );
    case "ERROR":
      return (
        <GenericConfirmationModal
          bodyText="Each funding tier must contain at least one NFT. Please try again."
          buttonText="Go back"
          onConfirmClick={resetModalAndHide}
          isShown={isShown}
          onHide={resetModalAndHide}
          title="Issue with submission"
        />
      );
    default:
      return assertUnreachable(modalState as never);
  }
}
