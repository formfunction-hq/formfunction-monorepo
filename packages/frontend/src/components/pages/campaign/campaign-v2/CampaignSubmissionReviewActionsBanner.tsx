import graphql from "babel-plugin-relay/macro";
import styles from "css/pages/campaign/campaign-v2/CampaignSubmissionReviewActionsBanner.module.css";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import Body1Bold from "components/text/Body1Bold";
import ColorClass from "types/enums/ColorClass";
import { CampaignSubmissionReviewActionsBannerMutation } from "components/pages/campaign/campaign-v2/__generated__/CampaignSubmissionReviewActionsBannerMutation.graphql";
import { useFragment, useMutation } from "react-relay";
import { CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse$key } from "components/pages/campaign/campaign-v2/__generated__/CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse.graphql";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "components/toast/notifications";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import { CampaignSubmissionReviewActionsBannerApproveMutation } from "components/pages/campaign/campaign-v2/__generated__/CampaignSubmissionReviewActionsBannerApproveMutation.graphql";
import CampaignStatusExpress_enum from "types/relay/CampaignStatusExpress_enum";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import FlexBox from "components/layout/FlexBox";
import TextArea from "components/input/TextArea";
import { useState } from "react";

const campaignFragment = graphql`
  fragment CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignV2ForSlug(input: $input) {
      campaign {
        id
        status
      }
    }
  }
`;

const approveMutation = graphql`
  mutation CampaignSubmissionReviewActionsBannerApproveMutation(
    $input: ApproveCampaignInput!
  ) {
    CampaignsNamespace {
      approveCampaign(input: $input) {
        campaign {
          id
        }
      }
    }
  }
`;

const rejectMutation = graphql`
  mutation CampaignSubmissionReviewActionsBannerMutation(
    $input: RejectCampaignInput!
  ) {
    CampaignsNamespace {
      rejectCampaign(input: $input) {
        campaign {
          id
        }
      }
    }
  }
`;

type Props = {
  campaign: CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse$key;
};

function shouldButtonsBeEnabled(status: CampaignStatusExpress_enum) {
  switch (status) {
    case "Approved":
    case "Draft":
    case "Pending":
    case "Rejected":
      return true;
    case "Published":
    case "Concluded":
    case RELAY_FUTURE_ADDED_VALUE:
      return false;
    default:
      return assertUnreachable(status);
  }
}

export default function CampaignSubmissionReviewActionsBanner({
  campaign,
}: Props) {
  const [feedback, setFeedback] = useState("");
  const campaignFragmentData = useFragment(campaignFragment, campaign);
  const navigate = useNavigate();
  const { username, campaignSlug } = useParams();
  const [commitRejectMutation, rejectionMutationInFlight] =
    useMutation<CampaignSubmissionReviewActionsBannerMutation>(rejectMutation);
  const [commitApproveMutation, approveMutationInFlight] =
    useMutation<CampaignSubmissionReviewActionsBannerApproveMutation>(
      approveMutation
    );
  const {
    campaignV2ForSlug: { campaign: campaignData },
  } = campaignFragmentData;

  if (campaignData == null) {
    return null;
  }
  const onError = () => {
    notify({
      message: "Unexpected error occurred. Please message #eng.",
      type: "error",
    });
  };

  const { id: campaignId, status } = campaignData;
  const shouldButtonsBeDisabled =
    !shouldButtonsBeEnabled(status) ||
    rejectionMutationInFlight ||
    approveMutationInFlight;

  return (
    <FlexBox className={styles.container} flexDirection="column" gap={32}>
      <FlexBox alignItems="center" justifyContent="space-between">
        <Body1Bold colorClass={ColorClass.Red}>
          Admin only • {`Campaign status: ${status}`}
        </Body1Bold>
        <div className={styles.actions}>
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            fontClass={FontClass.NavLink}
            disabled={shouldButtonsBeDisabled}
            onClick={() =>
              commitApproveMutation({
                onCompleted: () => {
                  notify({ message: "Approved!", type: "info" });
                  navigate(getCampaignLinkRelative(username!, campaignSlug!));
                },
                onError,
                variables: { input: { campaignId } },
              })
            }
          >
            Approve
          </ButtonWithText>
          <ButtonWithText
            buttonTheme={ButtonTheme.RedOutline}
            fontClass={FontClass.NavLink}
            disabled={shouldButtonsBeDisabled || feedback === ""}
            onClick={() =>
              commitRejectMutation({
                onCompleted: () => {
                  notify({ message: "Rejected with feedback!", type: "info" });
                  navigate("/");
                },
                onError,
                variables: {
                  input: { campaignId, feedback, isPermaReject: false },
                },
              })
            }
          >
            Reject with feedback
          </ButtonWithText>
          <ButtonWithText
            buttonTheme={ButtonTheme.RedOutline}
            fontClass={FontClass.NavLink}
            disabled={shouldButtonsBeDisabled}
            onClick={() =>
              commitRejectMutation({
                onCompleted: () => {
                  notify({ message: "Rejected!", type: "info" });
                  navigate("/");
                },
                onError,
                variables: { input: { campaignId, isPermaReject: true } },
              })
            }
          >
            Reject
          </ButtonWithText>
        </div>
      </FlexBox>
      <TextArea
        placeholder="If you are rejecting with feedback, enter the feedback here"
        rows={5}
        value={feedback}
        onChange={setFeedback}
      />
    </FlexBox>
  );
}
