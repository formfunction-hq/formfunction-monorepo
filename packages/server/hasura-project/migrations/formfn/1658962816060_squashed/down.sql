
DELETE FROM "public"."NotificationType" WHERE "value" = 'VotingRejected';

DELETE FROM "public"."NotificationType" WHERE "value" = 'VotingDuplicate';

DELETE FROM "public"."NotificationType" WHERE "value" = 'VotingBrokeGuidelines';

DELETE FROM "public"."NotificationType" WHERE "value" = 'VotingApproved';

DELETE FROM "public"."NotificationType" WHERE "value" = 'UnlockableShareInfo';

DELETE FROM "public"."NotificationType" WHERE "value" = 'UnlockableInfoShared';

DELETE FROM "public"."NotificationType" WHERE "value" = 'UnlockableDeclinedToSharedInfo';

DELETE FROM "public"."NotificationType" WHERE "value" = 'PnftDropClosed';

DELETE FROM "public"."NotificationType" WHERE "value" = 'OwnerPieceSoldAsInstantSale';

DELETE FROM "public"."NotificationType" WHERE "value" = 'OwnerOtherBidReceived';

DELETE FROM "public"."NotificationType" WHERE "value" = 'OwnerOfferReceived';

DELETE FROM "public"."NotificationType" WHERE "value" = 'OwnerFirstBidReceived';

DELETE FROM "public"."NotificationType" WHERE "value" = 'OwnerEditionsSoldOut';

DELETE FROM "public"."NotificationType" WHERE "value" = 'OwnerEditionSold';

DELETE FROM "public"."NotificationType" WHERE "value" = 'OwnerAuctionSettled';

DELETE FROM "public"."NotificationType" WHERE "value" = 'OwnerAuctionExtended';

DELETE FROM "public"."NotificationType" WHERE "value" = 'OwnerAuctionEndedNoBids';

DELETE FROM "public"."NotificationType" WHERE "value" = 'OwnerAuctionEnded';

DELETE FROM "public"."NotificationType" WHERE "value" = 'NewFollower';

DELETE FROM "public"."NotificationType" WHERE "value" = 'InvitesInviteeAcceptedInvite';

DELETE FROM "public"."NotificationType" WHERE "value" = 'InvitesConvertedToCreator';

DELETE FROM "public"."NotificationType" WHERE "value" = 'InviteReceived';

DELETE FROM "public"."NotificationType" WHERE "value" = 'FollowerScheduledAuctionIsLive';

DELETE FROM "public"."NotificationType" WHERE "value" = 'FollowerNewPieceScheduled';

DELETE FROM "public"."NotificationType" WHERE "value" = 'FollowerNewPieceListedSecondary';

DELETE FROM "public"."NotificationType" WHERE "value" = 'FollowerNewPieceListed';

DELETE FROM "public"."NotificationType" WHERE "value" = 'FollowerNewEditionsListed';

DELETE FROM "public"."NotificationType" WHERE "value" = 'FollowerAuctionAlmostOver';

DELETE FROM "public"."NotificationType" WHERE "value" = 'CreatorSecondarySale';

DELETE FROM "public"."NotificationType" WHERE "value" = 'CollabRequest';

DELETE FROM "public"."NotificationType" WHERE "value" = 'BuyerOfferExpired';

DELETE FROM "public"."NotificationType" WHERE "value" = 'BuyerOfferAccepted';

DELETE FROM "public"."NotificationType" WHERE "value" = 'BidderWonAuction';

DELETE FROM "public"."NotificationType" WHERE "value" = 'BidderOutbid';

DELETE FROM "public"."NotificationType" WHERE "value" = 'BidderLostAuction';

DELETE FROM "public"."NotificationType" WHERE "value" = 'BidderClaimPnftReminder';

DELETE FROM "public"."NotificationType" WHERE "value" = 'BidderClaimPnft';

DELETE FROM "public"."NotificationType" WHERE "value" = 'BidderAuctionSettled';

DELETE FROM "public"."NotificationType" WHERE "value" = 'BidderAuctionExtended';

DELETE FROM "public"."NotificationType" WHERE "value" = 'BidderAuctionAlmostOver';

DROP TABLE "public"."NotificationType";
