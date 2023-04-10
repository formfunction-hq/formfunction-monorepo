import FlexBox from "components/layout/FlexBox";
import CampaignDashboardTabGeneric from "components/pages/campaign/dashboard/tabs/CampaignDashboardTabGeneric";
import ColorClass from "types/enums/ColorClass";
import graphql from "babel-plugin-relay/macro";
import {
  CampaignDashboardSettingsTab_CampaignV2$key,
  CampaignStatusExpress_enum,
} from "components/pages/campaign/dashboard/tabs/__generated__/CampaignDashboardSettingsTab_CampaignV2.graphql";
import ArtName from "components/text/ArtName";
import Body2 from "components/text/Body2";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import { useFragment, useMutation } from "react-relay";
import useUserContext from "hooks/useUserContext";
import CheckmarkGradientIcon from "components/icons/CheckmarkGradientIcon";
import { CampaignDashboardSettingsTabConcludeCampaignMutation } from "components/pages/campaign/dashboard/tabs/__generated__/CampaignDashboardSettingsTabConcludeCampaignMutation.graphql";
import { notify } from "components/toast/notifications";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import { CampaignDashboardSettingsTabRemoveUserAsTeamMemberMutation } from "components/pages/campaign/dashboard/tabs/__generated__/CampaignDashboardSettingsTabRemoveUserAsTeamMemberMutation.graphql";
import sleepMs from "formfn-shared/dist/utils/sleepMs";
import { useState } from "react";
import GenericConfirmationModal from "components/modal/GenericConfirmationModal";

const concludeCampaignMutation = graphql`
  mutation CampaignDashboardSettingsTabConcludeCampaignMutation(
    $input: ConcludeCampaignInput!
  ) {
    CampaignsNamespace {
      concludeCampaign(input: $input) {
        campaign {
          id
          status
        }
      }
    }
  }
`;

const removeUserAsTeamMemberMutation = graphql`
  mutation CampaignDashboardSettingsTabRemoveUserAsTeamMemberMutation(
    $input: RemoveUserAsTeamMemberFromCampaignInput!
  ) {
    CampaignsNamespace {
      removeUserAsTeamMemberFromCampaign(input: $input) {
        campaign {
          id
        }
      }
    }
  }
`;

const fragment = graphql`
  fragment CampaignDashboardSettingsTab_CampaignV2 on CampaignV2 {
    id
    creator {
      id
    }
    status
    title
  }
`;

type Props = {
  campaign: CampaignDashboardSettingsTab_CampaignV2$key;
};

function EndCampaignSetting({
  campaignId,
  status,
}: {
  campaignId: string;
  status: CampaignStatusExpress_enum;
}) {
  const [shouldShowConfirmationModal, setShouldShowConfirmationModal] =
    useState(false);
  const [commit, inFlight] =
    useMutation<CampaignDashboardSettingsTabConcludeCampaignMutation>(
      concludeCampaignMutation
    );
  const onConfirm = () => {
    commit({
      onCompleted: () => {
        notify({ message: "Campaign ended!", type: "info" });
        setShouldShowConfirmationModal(false);
      },
      onError: () => notifyUnexpectedError(),
      variables: { input: { campaignId } },
    });
  };
  const bodyText = (
    <Body2 colorClass={ColorClass.Primary}>
      Ending your campaign will remove the campaign banner on your profile, and
      you won&apos;t be able to add new NFTs to this campaign anymore. You will
      still be able to access the dashboard to provide updates to your
      supporters.
    </Body2>
  );

  return (
    <>
      <GenericConfirmationModal
        title="End campaign?"
        bodyText={bodyText}
        buttonText="End campaign"
        cancelButtonText="Nevermind"
        isLoading={inFlight}
        isShown={shouldShowConfirmationModal}
        onConfirmClick={onConfirm}
        onHide={() => setShouldShowConfirmationModal(false)}
      />
      <FlexBox flexDirection="column" alignItems="flex-start" gap={16}>
        <FlexBox flexDirection="column" alignItems="flex-start" gap={8}>
          <ArtName colorClass={ColorClass.Primary}>End campaign</ArtName>
          {bodyText}
        </FlexBox>
        {status !== "Concluded" ? (
          <ButtonWithText
            fontClass={FontClass.NavLink}
            buttonTheme={ButtonTheme.PurpleGradient}
            onClick={() => setShouldShowConfirmationModal(true)}
          >
            End campaign
          </ButtonWithText>
        ) : (
          // TODO[@bryancho]: Add end time
          <FlexBox flexDirection="row" gap={8}>
            <CheckmarkGradientIcon />
            <Body2 colorClass={ColorClass.Secondary}>Ended</Body2>
          </FlexBox>
        )}
      </FlexBox>
    </>
  );
}

function RemoveSelfAsTeamMemberSetting({ campaignId }: { campaignId: string }) {
  const { user } = useUserContext();
  const [shouldShowConfirmationModal, setShouldShowConfirmationModal] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [commit] =
    useMutation<CampaignDashboardSettingsTabRemoveUserAsTeamMemberMutation>(
      removeUserAsTeamMemberMutation
    );
  const onConfirm = () => {
    setIsLoading(true);
    commit({
      onCompleted: () => {
        async function run() {
          notify({
            message: "Removed as team member. Reloading...",
            type: "info",
          });
          await sleepMs(1000);
          window.location.replace("/explore");
        }
        run();
      },
      onError: () => {
        notifyUnexpectedError();
        setIsLoading(false);
      },
      variables: { input: { campaignId, userId: user!.id } },
    });
  };

  return (
    <>
      <GenericConfirmationModal
        title="Remove yourself as a team member?"
        bodyText="Once you confirm you will no longer be a team member of this campaign. This is not reversible."
        buttonText="Remove"
        cancelButtonText="Nevermind"
        isLoading={isLoading}
        isShown={shouldShowConfirmationModal}
        onConfirmClick={onConfirm}
        onHide={() => setShouldShowConfirmationModal(false)}
      />
      <FlexBox flexDirection="column" alignItems="flex-start" gap={16}>
        <FlexBox flexDirection="column" alignItems="flex-start" gap={8}>
          <ArtName colorClass={ColorClass.Primary}>
            Remove yourself as a team member
          </ArtName>
          <Body2 colorClass={ColorClass.Primary}>
            If you were added as a team member to this campaign and you would
            like to remove yourself, you can do so here. This is not reversible.
          </Body2>
        </FlexBox>
        <ButtonWithText
          fontClass={FontClass.NavLink}
          buttonTheme={ButtonTheme.Red}
          onClick={() => setShouldShowConfirmationModal(true)}
        >
          Remove as team member
        </ButtonWithText>
      </FlexBox>
    </>
  );
}

export default function CampaignDashboardSettingsTab({
  campaign,
}: Props): JSX.Element {
  const { user } = useUserContext();
  const campaignData = useFragment(fragment, campaign);
  const { id: campaignId, creator, status, title } = campaignData;
  const isViewerCreator = creator.id === user?.id;

  const content = (
    <FlexBox flexDirection="column" alignItems="center" gap={32}>
      {isViewerCreator ? (
        <EndCampaignSetting campaignId={campaignId} status={status} />
      ) : (
        <RemoveSelfAsTeamMemberSetting campaignId={campaignId} />
      )}
    </FlexBox>
  );

  return (
    <CampaignDashboardTabGeneric
      campaignTitle={title}
      title="Campaign settings"
      subtitle="Change settings for your campaign"
      content={content}
    />
  );
}
