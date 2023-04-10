
CREATE TABLE "public"."NotificationType" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "public"."NotificationType"("value") VALUES (E'BidderAuctionAlmostOver');

INSERT INTO "public"."NotificationType"("value") VALUES (E'BidderAuctionExtended');

INSERT INTO "public"."NotificationType"("value") VALUES (E'BidderAuctionSettled');

INSERT INTO "public"."NotificationType"("value") VALUES (E'BidderClaimPnft');

INSERT INTO "public"."NotificationType"("value") VALUES (E'BidderClaimPnftReminder');

INSERT INTO "public"."NotificationType"("value") VALUES (E'BidderLostAuction');

INSERT INTO "public"."NotificationType"("value") VALUES (E'BidderOutbid');

INSERT INTO "public"."NotificationType"("value") VALUES (E'BidderWonAuction');

INSERT INTO "public"."NotificationType"("value") VALUES (E'BuyerOfferAccepted');

INSERT INTO "public"."NotificationType"("value") VALUES (E'BuyerOfferExpired');

INSERT INTO "public"."NotificationType"("value") VALUES (E'CollabRequest');

INSERT INTO "public"."NotificationType"("value") VALUES (E'CreatorSecondarySale');

INSERT INTO "public"."NotificationType"("value") VALUES (E'FollowerAuctionAlmostOver');

INSERT INTO "public"."NotificationType"("value") VALUES (E'FollowerNewEditionsListed');

INSERT INTO "public"."NotificationType"("value") VALUES (E'FollowerNewPieceListed');

INSERT INTO "public"."NotificationType"("value") VALUES (E'FollowerNewPieceListedSecondary');

INSERT INTO "public"."NotificationType"("value") VALUES (E'FollowerNewPieceScheduled');

INSERT INTO "public"."NotificationType"("value") VALUES (E'FollowerScheduledAuctionIsLive');

INSERT INTO "public"."NotificationType"("value") VALUES (E'InviteReceived');

INSERT INTO "public"."NotificationType"("value") VALUES (E'InvitesConvertedToCreator');

INSERT INTO "public"."NotificationType"("value") VALUES (E'InvitesInviteeAcceptedInvite');

INSERT INTO "public"."NotificationType"("value") VALUES (E'NewFollower');

INSERT INTO "public"."NotificationType"("value") VALUES (E'OwnerAuctionEnded');

INSERT INTO "public"."NotificationType"("value") VALUES (E'OwnerAuctionEndedNoBids');

INSERT INTO "public"."NotificationType"("value") VALUES (E'OwnerAuctionExtended');

INSERT INTO "public"."NotificationType"("value") VALUES (E'OwnerAuctionSettled');

INSERT INTO "public"."NotificationType"("value") VALUES (E'OwnerEditionSold');

INSERT INTO "public"."NotificationType"("value") VALUES (E'OwnerEditionsSoldOut');

INSERT INTO "public"."NotificationType"("value") VALUES (E'OwnerFirstBidReceived');

INSERT INTO "public"."NotificationType"("value") VALUES (E'OwnerOfferReceived');

INSERT INTO "public"."NotificationType"("value") VALUES (E'OwnerOtherBidReceived');

INSERT INTO "public"."NotificationType"("value") VALUES (E'OwnerPieceSoldAsInstantSale');

INSERT INTO "public"."NotificationType"("value") VALUES (E'PnftDropClosed');

INSERT INTO "public"."NotificationType"("value") VALUES (E'UnlockableDeclinedToSharedInfo');

INSERT INTO "public"."NotificationType"("value") VALUES (E'UnlockableInfoShared');

INSERT INTO "public"."NotificationType"("value") VALUES (E'UnlockableShareInfo');

INSERT INTO "public"."NotificationType"("value") VALUES (E'VotingApproved');

INSERT INTO "public"."NotificationType"("value") VALUES (E'VotingBrokeGuidelines');

INSERT INTO "public"."NotificationType"("value") VALUES (E'VotingDuplicate');

INSERT INTO "public"."NotificationType"("value") VALUES (E'VotingRejected');
