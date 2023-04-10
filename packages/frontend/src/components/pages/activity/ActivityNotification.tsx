import graphql from "babel-plugin-relay/macro";
import ActivityNotificationBidderAuctionAlmostOver from "components/pages/activity/notifications/ActivityNotificationBidderAuctionAlmostOver";
import ActivityNotificationBidderAuctionExtended from "components/pages/activity/notifications/ActivityNotificationBidderAuctionExtended";
import ActivityNotificationBidderAuctionSettled from "components/pages/activity/notifications/ActivityNotificationBidderAuctionSettled";
import ActivityNotificationBidderClaimPnft from "components/pages/activity/notifications/ActivityNotificationBidderClaimPnft";
import ActivityNotificationBidderClaimPnftReminder from "components/pages/activity/notifications/ActivityNotificationBidderClaimPnftReminder";
import ActivityNotificationBidderLostAuction from "components/pages/activity/notifications/ActivityNotificationBidderLostAuction";
import ActivityNotificationBidderOutbid from "components/pages/activity/notifications/ActivityNotificationBidderOutbid";
import ActivityNotificationBidderWonAuction from "components/pages/activity/notifications/ActivityNotificationBidderWonAuction";
import ActivityNotificationBuyerOfferAccepted from "components/pages/activity/notifications/ActivityNotificationBuyerOfferAccepted";
import ActivityNotificationBuyerOfferExpired from "components/pages/activity/notifications/ActivityNotificationBuyerOfferExpired";
import ActivityNotificationCollabRequest from "components/pages/activity/notifications/ActivityNotificationCollabRequest";
import ActivityNotificationCreatorSecondarySale from "components/pages/activity/notifications/ActivityNotificationCreatorSecondarySale";
import ActivityNotificationFollowerAuctionAlmostOver from "components/pages/activity/notifications/ActivityNotificationFollowerAuctionAlmostOver";
import ActivityNotificationFollowerNewEditionsListed from "components/pages/activity/notifications/ActivityNotificationFollowerNewEditionsListed";
import ActivityNotificationFollowerNewPieceListed from "components/pages/activity/notifications/ActivityNotificationFollowerNewPieceListed";
import ActivityNotificationFollowerNewPieceListedSecondary from "components/pages/activity/notifications/ActivityNotificationFollowerNewPieceListedSecondary";
import ActivityNotificationFollowerNewPieceScheduled from "components/pages/activity/notifications/ActivityNotificationFollowerNewPieceScheduled";
import ActivityNotificationFollowerScheduledAuctionIsLive from "components/pages/activity/notifications/ActivityNotificationFollowerScheduledAuctionIsLive";
import ActivityNotificationInvitesConvertedToCreator from "components/pages/activity/notifications/ActivityNotificationInvitesConvertedToCreator";
import ActivityNotificationInvitesInviteeAcceptedInvite from "components/pages/activity/notifications/ActivityNotificationInvitesInviteeAcceptedInvite";
import ActivityNotificationNewFollower from "components/pages/activity/notifications/ActivityNotificationNewFollower";
import ActivityNotificationOwnerAuctionEnded from "components/pages/activity/notifications/ActivityNotificationOwnerAuctionEnded";
import ActivityNotificationOwnerAuctionEndedNoBids from "components/pages/activity/notifications/ActivityNotificationOwnerAuctionEndedNoBids";
import ActivityNotificationOwnerAuctionExtended from "components/pages/activity/notifications/ActivityNotificationOwnerAuctionExtended";
import ActivityNotificationOwnerAuctionSettled from "components/pages/activity/notifications/ActivityNotificationOwnerAuctionSettled";
import ActivityNotificationOwnerEditionSold from "components/pages/activity/notifications/ActivityNotificationOwnerEditionSold";
import ActivityNotificationOwnerEditionsSoldOut from "components/pages/activity/notifications/ActivityNotificationOwnerEditionsSoldOut";
import ActivityNotificationOwnerFirstBidReceived from "components/pages/activity/notifications/ActivityNotificationOwnerFirstBidReceived";
import ActivityNotificationOwnerOfferReceived from "components/pages/activity/notifications/ActivityNotificationOwnerOfferReceived";
import ActivityNotificationOwnerOtherBidReceived from "components/pages/activity/notifications/ActivityNotificationOwnerOtherBidReceived";
import ActivityNotificationOwnerPieceSoldAsInstantSale from "components/pages/activity/notifications/ActivityNotificationOwnerPieceSoldAsInstantSale";
import ActivityNotificationUnlockableDeclinedToSharedInfo from "components/pages/activity/notifications/ActivityNotificationUnlockableDeclinedToSharedInfo";
import ActivityNotificationUnlockableInfoShared from "components/pages/activity/notifications/ActivityNotificationUnlockableInfoShared";
import ActivityNotificationUnlockableShareInfo from "components/pages/activity/notifications/ActivityNotificationUnlockableShareInfo";
import {
  ActivityNotification_ActivityNotificationsEdge$data,
  ActivityNotification_ActivityNotificationsEdge$key,
} from "components/pages/activity/__generated__/ActivityNotification_ActivityNotificationsEdge.graphql";
import useUpdateActivityNotificationTimeSeen from "hooks/useUpdateActivityNotificationTimeSeen";
import { useFragment } from "react-relay";
import styles from "css/pages/activity/ActivityNotification.module.css";
import ActivityNotificationUnseenIndicator from "components/pages/activity/ActivityNotificationUnseenIndicator";
import joinClasses from "utils/joinClasses";
import ActivityNotificationOwnerGenerativeMintSoldOut from "components/pages/activity/notifications/ActivityNotificationOwnerGenerativeMintSoldOut";
import ActivityNotificationCampaignApproved from "components/pages/activity/notifications/ActivityNotificationCampaignApproved";
import ActivityNotificationCampaignRejected from "components/pages/activity/notifications/ActivityNotificationCampaignRejected";
import ActivityNotificationCampaignCommunityNewUpdateShared from "components/pages/activity/notifications/ActivityNotificationCampaignCommunityNewUpdateShared";
import ActivityNotificationCampaignAddedAsTeamMember from "components/pages/activity/notifications/ActivityNotificationCampaignAddedAsTeamMember";
import ActivityNotificationCampaignGoalReachedXPercent from "components/pages/activity/notifications/ActivityNotificationCampaignGoalReachedXPercent";
import ActivityNotificationBonkClaim from "components/pages/activity/notifications/ActivityNotificationBonkClaim";
import ActivityNotificationAirdropCompleted from "components/pages/activity/notifications/ActivityNotificationAirdropCompleted";
import ActivityNotificationAirdropGiftReceived from "components/pages/activity/notifications/ActivityNotificationAirdropGiftReceived";
import ActivityNotificationCampaignRejectedWithFeedback from "components/pages/activity/notifications/ActivityNotificationCampaignRejectedWithFeedback";

const fragment = graphql`
  fragment ActivityNotification_ActivityNotificationsEdge on ActivityNotificationsEdge {
    node {
      __typename
      ... on IActivityNotification {
        id
        timeSeen
      }
      ... on ActivityNotificationAirdropCompleted {
        ...ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted
      }
      ... on ActivityNotificationAirdropGiftReceived {
        ...ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived
      }
      ... on ActivityNotificationBidderAuctionAlmostOver {
        ...ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver
      }
      ... on ActivityNotificationBidderAuctionExtended {
        ...ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended
      }
      ... on ActivityNotificationBidderAuctionSettled {
        ...ActivityNotificationBidderAuctionSettled_ActivityNotificationBidderAuctionSettled
      }
      ... on ActivityNotificationBidderClaimPnft {
        ...ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft
      }
      ... on ActivityNotificationBidderClaimPnftReminder {
        ...ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder
      }
      ... on ActivityNotificationBonkClaim {
        ...ActivityNotificationBonkClaim_ActivityNotificationBonkClaim
      }
      ... on ActivityNotificationCampaignAddedAsTeamMember {
        ...ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember
      }
      ... on ActivityNotificationCampaignFollowersCampaignPublished {
        ...ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished
      }
      ... on ActivityNotificationCampaignGoalReachedXPercent {
        ...ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent
      }
      ... on ActivityNotificationBidderLostAuction {
        ...ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction
      }
      ... on ActivityNotificationBidderOutbid {
        ...ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid
      }
      ... on ActivityNotificationBidderWonAuction {
        ...ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction
      }
      ... on ActivityNotificationBuyerOfferAccepted {
        ...ActivityNotificationBuyerOfferAccepted_ActivityNotificationBuyerOfferAccepted
      }
      ... on ActivityNotificationBuyerOfferExpired {
        ...ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired
      }
      ... on ActivityNotificationCampaignApproved {
        ...ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved
      }
      ... on ActivityNotificationCampaignCommunityNewUpdateShared {
        ...ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared
      }
      ... on ActivityNotificationCampaignRejected {
        ...ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected
      }
      ... on ActivityNotificationCampaignRejectedWithFeedback {
        ...ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback
      }
      ... on ActivityNotificationCollabRequest {
        ...ActivityNotificationCollabRequest_ActivityNotificationCollabRequest
      }
      ... on ActivityNotificationCreatorSecondarySale {
        ...ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale
      }
      ... on ActivityNotificationFollowerAuctionAlmostOver {
        ...ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver
      }
      ... on ActivityNotificationFollowerNewEditionsListed {
        ...ActivityNotificationFollowerNewEditionsListed_ActivityNotificationFollowerNewEditionsListed
      }
      ... on ActivityNotificationFollowerNewPieceListed {
        ...ActivityNotificationFollowerNewPieceListed_ActivityNotificationFollowerNewPieceListed
      }
      ... on ActivityNotificationFollowerNewPieceListedSecondary {
        ...ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary
      }
      ... on ActivityNotificationFollowerNewPieceScheduled {
        ...ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled
      }
      ... on ActivityNotificationFollowerScheduledAuctionIsLive {
        ...ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive
      }
      ... on ActivityNotificationInvitesConvertedToCreator {
        ...ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator
      }
      ... on ActivityNotificationInvitesInviteeAcceptedInvite {
        ...ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite
      }
      ... on ActivityNotificationNewFollower {
        ...ActivityNotificationNewFollower_ActivityNotificationNewFollower
      }
      ... on ActivityNotificationOwnerAuctionEnded {
        ...ActivityNotificationOwnerAuctionEnded_ActivityNotificationOwnerAuctionEnded
      }
      ... on ActivityNotificationOwnerAuctionEndedNoBids {
        ...ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids
      }
      ... on ActivityNotificationOwnerAuctionExtended {
        ...ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended
      }
      ... on ActivityNotificationOwnerAuctionSettled {
        ...ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled
      }
      ... on ActivityNotificationOwnerEditionSold {
        ...ActivityNotificationOwnerEditionSold_ActivityNotificationOwnerEditionSold
      }
      ... on ActivityNotificationOwnerEditionsSoldOut {
        ...ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut
      }
      ... on ActivityNotificationOwnerFirstBidReceived {
        ...ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived
      }
      ... on ActivityNotificationOwnerGenerativeMintSoldOut {
        ...ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut
      }
      ... on ActivityNotificationOwnerOfferReceived {
        ...ActivityNotificationOwnerOfferReceived_ActivityNotificationOwnerOfferReceived
      }
      ... on ActivityNotificationOwnerOtherBidReceived {
        ...ActivityNotificationOwnerOtherBidReceived_ActivityNotificationOwnerOtherBidReceived
      }
      ... on ActivityNotificationOwnerPieceSoldAsInstantSale {
        ...ActivityNotificationOwnerPieceSoldAsInstantSale_ActivityNotificationOwnerPieceSoldAsInstantSale
      }
      ... on ActivityNotificationUnlockableDeclinedToSharedInfo {
        ...ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo
      }
      ... on ActivityNotificationUnlockableInfoShared {
        ...ActivityNotificationUnlockableInfoShared_ActivityNotificationUnlockableInfoShared
      }
      ... on ActivityNotificationUnlockableShareInfo {
        ...ActivityNotificationUnlockableShareInfo_ActivityNotificationUnlockableShareInfo
      }
    }
  }
`;

function Inner({
  notificationData,
}: {
  notificationData: ActivityNotification_ActivityNotificationsEdge$data["node"];
}) {
  switch (notificationData.__typename) {
    case "ActivityNotificationAirdropCompleted":
      return (
        <ActivityNotificationAirdropCompleted notification={notificationData} />
      );
    case "ActivityNotificationAirdropGiftReceived":
      return (
        <ActivityNotificationAirdropGiftReceived
          notification={notificationData}
        />
      );
    case "ActivityNotificationBidderAuctionAlmostOver":
      return (
        <ActivityNotificationBidderAuctionAlmostOver
          notification={notificationData}
        />
      );
    case "ActivityNotificationBidderAuctionExtended":
      return (
        <ActivityNotificationBidderAuctionExtended
          notification={notificationData}
        />
      );
    case "ActivityNotificationBidderAuctionSettled":
      return (
        <ActivityNotificationBidderAuctionSettled
          notification={notificationData}
        />
      );
    case "ActivityNotificationBidderClaimPnft":
      return (
        <ActivityNotificationBidderClaimPnft notification={notificationData} />
      );
    case "ActivityNotificationBidderClaimPnftReminder":
      return (
        <ActivityNotificationBidderClaimPnftReminder
          notification={notificationData}
        />
      );
    case "ActivityNotificationBidderLostAuction":
      return (
        <ActivityNotificationBidderLostAuction
          notification={notificationData}
        />
      );
    case "ActivityNotificationBidderOutbid":
      return (
        <ActivityNotificationBidderOutbid notification={notificationData} />
      );
    case "ActivityNotificationBidderWonAuction":
      return (
        <ActivityNotificationBidderWonAuction notification={notificationData} />
      );
    case "ActivityNotificationBonkClaim":
      return <ActivityNotificationBonkClaim notification={notificationData} />;
    case "ActivityNotificationBuyerOfferAccepted":
      return (
        <ActivityNotificationBuyerOfferAccepted
          notification={notificationData}
        />
      );
    case "ActivityNotificationBuyerOfferExpired":
      return (
        <ActivityNotificationBuyerOfferExpired
          notification={notificationData}
        />
      );
    case "ActivityNotificationCampaignApproved":
      return (
        <ActivityNotificationCampaignApproved notification={notificationData} />
      );
    case "ActivityNotificationCampaignAddedAsTeamMember":
      return (
        <ActivityNotificationCampaignAddedAsTeamMember
          notification={notificationData}
        />
      );
    case "ActivityNotificationCampaignGoalReachedXPercent":
      return (
        <ActivityNotificationCampaignGoalReachedXPercent
          notification={notificationData}
        />
      );
    case "ActivityNotificationFollowersCampaignPublished":
      return (
        <ActivityNotificationFollowerNewPieceListed
          notification={notificationData}
        />
      );
    case "ActivityNotificationCampaignCommunityNewUpdateShared":
      return (
        <ActivityNotificationCampaignCommunityNewUpdateShared
          notification={notificationData}
        />
      );
    case "ActivityNotificationCampaignRejected":
      return (
        <ActivityNotificationCampaignRejected notification={notificationData} />
      );
    case "ActivityNotificationCampaignRejectedWithFeedback":
      return (
        <ActivityNotificationCampaignRejectedWithFeedback
          notification={notificationData}
        />
      );
    case "ActivityNotificationCollabRequest":
      return (
        <ActivityNotificationCollabRequest notification={notificationData} />
      );
    case "ActivityNotificationCreatorSecondarySale":
      return (
        <ActivityNotificationCreatorSecondarySale
          notification={notificationData}
        />
      );
    case "ActivityNotificationFollowerAuctionAlmostOver":
      return (
        <ActivityNotificationFollowerAuctionAlmostOver
          notification={notificationData}
        />
      );
    case "ActivityNotificationFollowerNewEditionsListed":
      return (
        <ActivityNotificationFollowerNewEditionsListed
          notification={notificationData}
        />
      );
    case "ActivityNotificationFollowerNewPieceListed":
      return (
        <ActivityNotificationFollowerNewPieceListed
          notification={notificationData}
        />
      );
    case "ActivityNotificationFollowerNewPieceListedSecondary":
      return (
        <ActivityNotificationFollowerNewPieceListedSecondary
          notification={notificationData}
        />
      );
    case "ActivityNotificationFollowerNewPieceScheduled":
      return (
        <ActivityNotificationFollowerNewPieceScheduled
          notification={notificationData}
        />
      );
    case "ActivityNotificationFollowerScheduledAuctionIsLive":
      return (
        <ActivityNotificationFollowerScheduledAuctionIsLive
          notification={notificationData}
        />
      );
    case "ActivityNotificationInvitesConvertedToCreator":
      return (
        <ActivityNotificationInvitesConvertedToCreator
          notification={notificationData}
        />
      );
    case "ActivityNotificationInvitesInviteeAcceptedInvite":
      return (
        <ActivityNotificationInvitesInviteeAcceptedInvite
          notification={notificationData}
        />
      );
    case "ActivityNotificationNewFollower":
      return (
        <ActivityNotificationNewFollower notification={notificationData} />
      );
    case "ActivityNotificationOwnerAuctionEnded":
      return (
        <ActivityNotificationOwnerAuctionEnded
          notification={notificationData}
        />
      );
    case "ActivityNotificationOwnerAuctionEndedNoBids":
      return (
        <ActivityNotificationOwnerAuctionEndedNoBids
          notification={notificationData}
        />
      );
    case "ActivityNotificationOwnerAuctionExtended":
      return (
        <ActivityNotificationOwnerAuctionExtended
          notification={notificationData}
        />
      );
    case "ActivityNotificationOwnerAuctionSettled":
      return (
        <ActivityNotificationOwnerAuctionSettled
          notification={notificationData}
        />
      );
    case "ActivityNotificationOwnerEditionSold":
      return (
        <ActivityNotificationOwnerEditionSold notification={notificationData} />
      );
    case "ActivityNotificationOwnerEditionsSoldOut":
      return (
        <ActivityNotificationOwnerEditionsSoldOut
          notification={notificationData}
        />
      );
    case "ActivityNotificationOwnerFirstBidReceived":
      return (
        <ActivityNotificationOwnerFirstBidReceived
          notification={notificationData}
        />
      );
    case "ActivityNotificationOwnerGenerativeMintSoldOut":
      return (
        <ActivityNotificationOwnerGenerativeMintSoldOut
          notification={notificationData}
        />
      );
    case "ActivityNotificationOwnerOfferReceived":
      return (
        <ActivityNotificationOwnerOfferReceived
          notification={notificationData}
        />
      );
    case "ActivityNotificationOwnerOtherBidReceived":
      return (
        <ActivityNotificationOwnerOtherBidReceived
          notification={notificationData}
        />
      );
    case "ActivityNotificationOwnerPieceSoldAsInstantSale":
      return (
        <ActivityNotificationOwnerPieceSoldAsInstantSale
          notification={notificationData}
        />
      );
    case "ActivityNotificationUnlockableDeclinedToSharedInfo":
      return (
        <ActivityNotificationUnlockableDeclinedToSharedInfo
          notification={notificationData}
        />
      );
    case "ActivityNotificationUnlockableInfoShared":
      return (
        <ActivityNotificationUnlockableInfoShared
          notification={notificationData}
        />
      );
    case "ActivityNotificationUnlockableShareInfo":
      return (
        <ActivityNotificationUnlockableShareInfo
          notification={notificationData}
        />
      );
    default:
      return null;
  }
}

type Props = {
  activityNotificationsEdge: ActivityNotification_ActivityNotificationsEdge$key;
};

export default function ActivityNotification({
  activityNotificationsEdge,
}: Props) {
  const { node: notificationData } = useFragment(
    fragment,
    activityNotificationsEdge
  );
  const hasBeenSeen = notificationData.timeSeen != null;
  const ref = useUpdateActivityNotificationTimeSeen(
    notificationData.id!,
    !hasBeenSeen
  );

  return (
    <div className={styles.container} ref={ref}>
      <div
        className={joinClasses(
          styles.unseenIndicatorContainer,
          hasBeenSeen ? styles.unseenIndicatorHidden : null
        )}
      >
        <ActivityNotificationUnseenIndicator />
      </div>
      <Inner notificationData={notificationData} />
    </div>
  );
}
