/**
 * @generated SignedSource<<4c796951f067c2c6950fcd273c29ddbf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotification_ActivityNotificationsEdge$data = {
  readonly node: {
    readonly __typename: string;
    readonly id?: string;
    readonly timeSeen?: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted" | "ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived" | "ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver" | "ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended" | "ActivityNotificationBidderAuctionSettled_ActivityNotificationBidderAuctionSettled" | "ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder" | "ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft" | "ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction" | "ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid" | "ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction" | "ActivityNotificationBonkClaim_ActivityNotificationBonkClaim" | "ActivityNotificationBuyerOfferAccepted_ActivityNotificationBuyerOfferAccepted" | "ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired" | "ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember" | "ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved" | "ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared" | "ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished" | "ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent" | "ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback" | "ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected" | "ActivityNotificationCollabRequest_ActivityNotificationCollabRequest" | "ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale" | "ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver" | "ActivityNotificationFollowerNewEditionsListed_ActivityNotificationFollowerNewEditionsListed" | "ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary" | "ActivityNotificationFollowerNewPieceListed_ActivityNotificationFollowerNewPieceListed" | "ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled" | "ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive" | "ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator" | "ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite" | "ActivityNotificationNewFollower_ActivityNotificationNewFollower" | "ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids" | "ActivityNotificationOwnerAuctionEnded_ActivityNotificationOwnerAuctionEnded" | "ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended" | "ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled" | "ActivityNotificationOwnerEditionSold_ActivityNotificationOwnerEditionSold" | "ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut" | "ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived" | "ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut" | "ActivityNotificationOwnerOfferReceived_ActivityNotificationOwnerOfferReceived" | "ActivityNotificationOwnerOtherBidReceived_ActivityNotificationOwnerOtherBidReceived" | "ActivityNotificationOwnerPieceSoldAsInstantSale_ActivityNotificationOwnerPieceSoldAsInstantSale" | "ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo" | "ActivityNotificationUnlockableInfoShared_ActivityNotificationUnlockableInfoShared" | "ActivityNotificationUnlockableShareInfo_ActivityNotificationUnlockableShareInfo">;
  };
  readonly " $fragmentType": "ActivityNotification_ActivityNotificationsEdge";
};
export type ActivityNotification_ActivityNotificationsEdge$key = {
  readonly " $data"?: ActivityNotification_ActivityNotificationsEdge$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotification_ActivityNotificationsEdge">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotification_ActivityNotificationsEdge",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "timeSeen",
              "storageKey": null
            }
          ],
          "type": "IActivityNotification",
          "abstractKey": "__isIActivityNotification"
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted"
            }
          ],
          "type": "ActivityNotificationAirdropCompleted",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived"
            }
          ],
          "type": "ActivityNotificationAirdropGiftReceived",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver"
            }
          ],
          "type": "ActivityNotificationBidderAuctionAlmostOver",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended"
            }
          ],
          "type": "ActivityNotificationBidderAuctionExtended",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationBidderAuctionSettled_ActivityNotificationBidderAuctionSettled"
            }
          ],
          "type": "ActivityNotificationBidderAuctionSettled",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft"
            }
          ],
          "type": "ActivityNotificationBidderClaimPnft",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder"
            }
          ],
          "type": "ActivityNotificationBidderClaimPnftReminder",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationBonkClaim_ActivityNotificationBonkClaim"
            }
          ],
          "type": "ActivityNotificationBonkClaim",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember"
            }
          ],
          "type": "ActivityNotificationCampaignAddedAsTeamMember",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished"
            }
          ],
          "type": "ActivityNotificationCampaignFollowersCampaignPublished",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent"
            }
          ],
          "type": "ActivityNotificationCampaignGoalReachedXPercent",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction"
            }
          ],
          "type": "ActivityNotificationBidderLostAuction",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid"
            }
          ],
          "type": "ActivityNotificationBidderOutbid",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction"
            }
          ],
          "type": "ActivityNotificationBidderWonAuction",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationBuyerOfferAccepted_ActivityNotificationBuyerOfferAccepted"
            }
          ],
          "type": "ActivityNotificationBuyerOfferAccepted",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired"
            }
          ],
          "type": "ActivityNotificationBuyerOfferExpired",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved"
            }
          ],
          "type": "ActivityNotificationCampaignApproved",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared"
            }
          ],
          "type": "ActivityNotificationCampaignCommunityNewUpdateShared",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected"
            }
          ],
          "type": "ActivityNotificationCampaignRejected",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback"
            }
          ],
          "type": "ActivityNotificationCampaignRejectedWithFeedback",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationCollabRequest_ActivityNotificationCollabRequest"
            }
          ],
          "type": "ActivityNotificationCollabRequest",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale"
            }
          ],
          "type": "ActivityNotificationCreatorSecondarySale",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver"
            }
          ],
          "type": "ActivityNotificationFollowerAuctionAlmostOver",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationFollowerNewEditionsListed_ActivityNotificationFollowerNewEditionsListed"
            }
          ],
          "type": "ActivityNotificationFollowerNewEditionsListed",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationFollowerNewPieceListed_ActivityNotificationFollowerNewPieceListed"
            }
          ],
          "type": "ActivityNotificationFollowerNewPieceListed",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary"
            }
          ],
          "type": "ActivityNotificationFollowerNewPieceListedSecondary",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled"
            }
          ],
          "type": "ActivityNotificationFollowerNewPieceScheduled",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive"
            }
          ],
          "type": "ActivityNotificationFollowerScheduledAuctionIsLive",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator"
            }
          ],
          "type": "ActivityNotificationInvitesConvertedToCreator",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite"
            }
          ],
          "type": "ActivityNotificationInvitesInviteeAcceptedInvite",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationNewFollower_ActivityNotificationNewFollower"
            }
          ],
          "type": "ActivityNotificationNewFollower",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationOwnerAuctionEnded_ActivityNotificationOwnerAuctionEnded"
            }
          ],
          "type": "ActivityNotificationOwnerAuctionEnded",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids"
            }
          ],
          "type": "ActivityNotificationOwnerAuctionEndedNoBids",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended"
            }
          ],
          "type": "ActivityNotificationOwnerAuctionExtended",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled"
            }
          ],
          "type": "ActivityNotificationOwnerAuctionSettled",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationOwnerEditionSold_ActivityNotificationOwnerEditionSold"
            }
          ],
          "type": "ActivityNotificationOwnerEditionSold",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut"
            }
          ],
          "type": "ActivityNotificationOwnerEditionsSoldOut",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived"
            }
          ],
          "type": "ActivityNotificationOwnerFirstBidReceived",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut"
            }
          ],
          "type": "ActivityNotificationOwnerGenerativeMintSoldOut",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationOwnerOfferReceived_ActivityNotificationOwnerOfferReceived"
            }
          ],
          "type": "ActivityNotificationOwnerOfferReceived",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationOwnerOtherBidReceived_ActivityNotificationOwnerOtherBidReceived"
            }
          ],
          "type": "ActivityNotificationOwnerOtherBidReceived",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationOwnerPieceSoldAsInstantSale_ActivityNotificationOwnerPieceSoldAsInstantSale"
            }
          ],
          "type": "ActivityNotificationOwnerPieceSoldAsInstantSale",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo"
            }
          ],
          "type": "ActivityNotificationUnlockableDeclinedToSharedInfo",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationUnlockableInfoShared_ActivityNotificationUnlockableInfoShared"
            }
          ],
          "type": "ActivityNotificationUnlockableInfoShared",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationUnlockableShareInfo_ActivityNotificationUnlockableShareInfo"
            }
          ],
          "type": "ActivityNotificationUnlockableShareInfo",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ActivityNotificationsEdge",
  "abstractKey": null
};

(node as any).hash = "6a629ea21f6ba2a5f20a3dd6059ba5fa";

export default node;
