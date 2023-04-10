import {
  Currency,
  Nft,
  NftDisclosure,
  NftMetadata,
  NftTransaction,
  Notification,
  User,
} from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import sendBidderAuctionAlmostOverEmail from "src/utils/email/auction-emails/sendBidderAuctionAlmostOverEmail";
import parseNotificationData from "src/utils/notifications/parseNotificationData";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NotificationTypeExpress_Enum,
  SeriesTypeExpress_Enum,
} from "src/__generated__/generated";
import invariant from "tiny-invariant";
import dayjs from "src/utils/dates/dayjsex";
import pluralize from "formfn-shared/dist/utils/pluralize";
import getImageSrcForEmail from "src/utils/getImageSrcForEmail";
import getNftLink from "src/utils/getNftLink";
import formatPrice from "src/utils/price/formatPrice";
import sendBidderAuctionExtendedEmail from "src/utils/email/auction-emails/sendBidderAuctionExtendedEmail";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import sendBidderAuctionSettledEmail from "src/utils/email/auction-emails/sendBidderAuctionSettledEmail";
import sendPnftClaimAvailableEmail from "src/utils/email/auction-emails/sendPnftClaimAvailableEmail";
import formatPnftDropDuration from "formfn-shared/dist/utils/dates/formatPnftDropDuration";
import sendPnftClaimReminderEmail from "src/utils/email/auction-emails/sendPnftClaimReminderEmail";
import sendBidderLostAuctionEmail from "src/utils/email/auction-emails/sendBidderLostAuctionEmail";
import bigintToNumber from "src/utils/bigintToNumber";
import getExplorerTxLink from "src/utils/solana/getExplorerTxLink";
import sendBidderOutbidEmail from "src/utils/email/auction-emails/sendBidderOutbidEmail";
import sendBidderWonAuctionEmail from "src/utils/email/auction-emails/sendBidderWonAuctionEmail";
import sendBuyerOfferAcceptedEmail from "src/utils/email/auction-emails/sendBuyerOfferAcceptedEmail";
import sendBuyerOfferExpiredEmail from "src/utils/email/auction-emails/sendBuyerOfferExpiredEmail";
import sendCollabRequestEmail from "src/utils/email/collab-emails/sendCollabRequestEmail";
import sendCreatorSecondarySaleEmail from "src/utils/email/creator-emails/sendCreatorSecondarySaleEmail";
import sendNewEditionsListedEmail from "src/utils/email/edition-emails/sendNewEditionsListedEmail";
import sendNewPieceListedEmail from "src/utils/email/follow-emails/sendNewPieceListedEmail";
import sendNewPieceListedSecondaryEmail from "src/utils/email/follow-emails/sendNewPieceListedSecondaryEmail";
import sendNewPieceScheduledEmail from "src/utils/email/follow-emails/sendNewPieceScheduledEmail";
import sendScheduledAuctionIsLiveEmail from "src/utils/email/follow-emails/sendScheduledAuctionIsLiveEmail";
import sendInviteReceivedEmail from "src/utils/email/invite-emails/sendInviteReceivedEmail";
import sendConvertedToCreatorEmail from "src/utils/email/invite-emails/sendConvertedToCreatorEmail";
import sendInviteeAcceptedInviteEmail from "src/utils/email/invite-emails/sendInviteeAcceptedInviteEmail";
import sendOwnerAuctionEndedEmail from "src/utils/email/auction-emails/sendOwnerAuctionEndedEmail";
import sendOwnerAuctionEndedNoBidsEmail from "src/utils/email/auction-emails/sendOwnerAuctionEndedNoBidsEmail";
import sendOwnerAuctionExtendedEmail from "src/utils/email/auction-emails/sendOwnerAuctionExtendedEmail";
import sendOwnerAuctionSettledEmail from "src/utils/email/auction-emails/sendOwnerAuctionSettledEmail";
import sendEditionSoldEmail from "src/utils/email/edition-emails/sendEditionSoldEmail";
import sendEditionsSoldOutEmail from "src/utils/email/edition-emails/sendEditionsSoldOutEmail";
import sendOwnerFirstBidReceivedEmail from "src/utils/email/auction-emails/sendOwnerFirstBidReceivedEmail";
import getNftAuctionDuration from "src/utils/auction/getNftAuctionDuration";
import sendOwnerOfferReceivedEmail from "src/utils/email/auction-emails/sendOwnerOfferReceivedEmail";
import sendOwnerOtherBidReceivedEmail from "src/utils/email/auction-emails/sendOwnerOtherBidReceivedEmail";
import sendOwnerPieceSoldAsInstantSaleEmail from "src/utils/email/auction-emails/sendOwnerPieceSoldAsInstantSaleEmail";
import sendPnftDropClosedEmail from "src/utils/email/auction-emails/sendPnftDropClosedEmail";
import sendUnlockableDeclinedToShareInfoEmail from "src/utils/email/unlockable-emails/sendUnlockableDeclinedToShareInfoEmail";
import getImgixUrl from "src/utils/getImgixUrl";
import sendUnlockableInfoSharedEmail from "src/utils/email/unlockable-emails/sendUnlockableInfoSharedEmail";
import sendUnlockableShareInfoEmail from "src/utils/email/unlockable-emails/sendUnlockableShareInfoEmail";
import sendVotingApprovedEmail from "src/utils/email/voting-emails/sendVotingApprovedEmail";
import sendVotingRejectedEmail from "src/utils/email/voting-emails/sendVotingRejectedEmail";
import sendOwnerGenerativeMintSoldOutEmail from "src/utils/email/candy-machine-emails/sendOwnerGenerativeMintSoldOutEmail";
import CONVERT_CANDY_MACHINE_INCLUDE from "src/constants/include/ConvertCandyMachineInclude";
import getSeriesLink from "src/utils/getSeriesLink";
import sendCampaignCommunityNewUpdateSharedEmail from "src/utils/email/campaign-emails/sendCampaignCommunityNewUpdateSharedEmail";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import sendCampaignApprovedEmail from "src/utils/email/campaign-emails/sendCampaignApprovedEmail";
import sendCampaignRejectedEmail from "src/utils/email/campaign-emails/sendCampaignRejectedEmail";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import CampaignUrlParamKey from "formfn-shared/dist/types/enums/CampaignUrlParamKey";
import sendCampaignFollowerCampaignPublishedEmail from "src/utils/email/campaign-emails/sendCampaignFollowerCampaignPublishedEmail";
import sendCampaignAddedAsTeamMemberEmail from "src/utils/email/campaign-emails/sendCampaignAddedAsTeamMemberEmail";
import getCampaignGoalReachedXPercentBodyText from "formfn-shared/dist/utils/campaigns/getCampaignGoalReachedXPercentBodyText";
import sendCampaignGoalReachedXPercentEmail from "src/utils/email/campaign-emails/sendCampaignGoalReachedXPercentEmail";
import sendAirdropCompletedEmail from "src/utils/email/airdrop-emails/sendAirdropCompletedEmail";
import sendAirdropGiftReceivedEmail from "src/utils/email/airdrop-emails/sendAirdropGiftReceivedEmail";
import HelpCenterLink from "formfn-shared/dist/types/enums/HelpCenterLink";
import sendNewFollowerEmail from "src/utils/email/follow-emails/sendNewFollowerEmail";
import getLinkForEnvironment from "src/utils/getLinkForEnvironment";
import getFrontendUrl from "src/utils/getFrontendUrl";
import sendCampaignRejectedWithFeedbackEmail from "src/utils/email/campaign-emails/sendCampaignRejectedWithFeedbackEmail";

const NFT_INCLUDE = {
  Creator: {
    include: CONVERT_USER_INCLUDE,
  },
  NftDisclosure: true,
  NftListing: {
    include: {
      Unlockable: {
        include: {
          Asset: true,
        },
      },
    },
  },
  NftMetadata: true,
  Owner: true,
};

const NFT_TRANSACTION_INCLUDE = {
  Currency: true,
  From: {
    include: CONVERT_USER_INCLUDE,
  },
  Nft: {
    include: NFT_INCLUDE,
  },
  To: {
    include: CONVERT_USER_INCLUDE,
  },
};

function formatNftTransactionPrice(
  nftTransaction: NftTransaction & {
    Currency: Currency;
  }
) {
  return formatPrice(
    bigintToNumber(nftTransaction.price)!,
    nftTransaction.Currency
  );
}

function getEmailTemplateFieldsForNft(
  nft: Nft & {
    NftDisclosure: Array<NftDisclosure>;
    NftMetadata: NftMetadata;
    Owner: User;
  }
) {
  return {
    imageSrc: getImageSrcForEmail(nft.NftMetadata, nft.NftDisclosure),
    nftLink: getNftLink(nft.Owner.username, nft.mint),
    nftMint: nft.mint,
    nftName: nft.NftMetadata.name,
  };
}

async function getNft(mint: string) {
  const nft = await getPrisma().nft.findUnique({
    include: NFT_INCLUDE,
    where: {
      mint,
    },
  });
  invariant(nft != null);
  return nft;
}

async function getNftTransaction(id: string) {
  const nftTransaction = await getPrisma().nftTransaction.findUnique({
    include: NFT_TRANSACTION_INCLUDE,
    where: {
      id,
    },
  });
  invariant(nftTransaction != null);
  return nftTransaction;
}

async function sendEmail(
  notif: Notification & {
    Receiver: Maybe<User>;
    Sender: Maybe<User>;
  },
  receiverEmail: string,
  req: Request
): Promise<boolean> {
  const notifType = notif.type as NotificationTypeExpress_Enum;
  const notifData = notif.data as Record<string, any>;

  switch (notifType) {
    case NotificationTypeExpress_Enum.BidderAuctionAlmostOver: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.BidderAuctionAlmostOver,
        notifData
      );
      const nft = await getNft(parsedNotifData.nftMint);
      const timeLeftInHours = Math.round(
        dayjs
          .duration({
            seconds: parsedNotifData.timeLeftInSeconds,
          })
          .asHours()
      );
      return sendBidderAuctionAlmostOverEmail(
        {
          ...getEmailTemplateFieldsForNft(nft),
          duration: `${timeLeftInHours} ${pluralize("hour", timeLeftInHours)}`,
          price: formatPrice(
            parsedNotifData.price.amount,
            parsedNotifData.price.currencyInfo
          ),
        },
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.BidderAuctionExtended: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.BidderAuctionExtended,
        notifData
      );
      const nft = await getNft(parsedNotifData.nftMint);
      return sendBidderAuctionExtendedEmail(
        {
          ...getEmailTemplateFieldsForNft(nft),
          numMinutes: parsedNotifData.minutesExtendedBy,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.BidderAuctionSettled: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.BidderAuctionSettled,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.nftTransactionId
      );
      return sendBidderAuctionSettledEmail(
        {
          ...getEmailTemplateFieldsForNft(nftTransaction.Nft),
          bidder: nftTransaction.To.username,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.BidderClaimPnft: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.BidderClaimPnft,
        notifData
      );
      const [pnft, auctionNft] = await Promise.all([
        getNft(parsedNotifData.pnftMint),
        getNft(parsedNotifData.auctionNftMint),
      ]);
      return sendPnftClaimAvailableEmail(
        {
          dropDuration: formatPnftDropDuration(
            dayjs.duration({ minutes: parsedNotifData.dropDurationInMinutes })
          ),
          imageSrc: getImageSrcForEmail(pnft.NftMetadata, pnft.NftDisclosure),
          nftLink: getNftLink(auctionNft.Owner.username, auctionNft.mint),
          nftName: auctionNft.NftMetadata.name,
          pnftName: pnft.NftMetadata.name,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.BidderClaimPnftReminder: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.BidderClaimPnftReminder,
        notifData
      );
      const [pnft, auctionNft] = await Promise.all([
        getNft(parsedNotifData.pnftMint),
        getNft(parsedNotifData.auctionNftMint),
      ]);
      return sendPnftClaimReminderEmail(
        {
          auctionNftName: auctionNft.NftMetadata.name,
          imageSrc: getImageSrcForEmail(pnft.NftMetadata, pnft.NftDisclosure),
          nftLink: getNftLink(auctionNft.Owner.username, auctionNft.mint),
          pnftName: pnft.NftMetadata.name,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.BidderLostAuction: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.BidderLostAuction,
        notifData
      );
      const nft = await getNft(parsedNotifData.nftMint);
      invariant(nft != null);
      return sendBidderLostAuctionEmail(
        {
          ...getEmailTemplateFieldsForNft(nft),
          seller: notif.Receiver?.username ?? "",
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.BidderOutbid: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.BidderOutbid,
        notifData
      );
      const higherBidTransaction = await getNftTransaction(
        parsedNotifData.higherBidTransactionId
      );
      return sendBidderOutbidEmail(
        {
          ...getEmailTemplateFieldsForNft(higherBidTransaction.Nft),
          price: formatNftTransactionPrice(higherBidTransaction),
          seller: higherBidTransaction.To.username,
          txLink: getExplorerTxLink(higherBidTransaction.txid!),
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.BidderWonAuction: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.BidderWonAuction,
        notifData
      );
      const nft = await getNft(parsedNotifData.nftMint);
      return sendBidderWonAuctionEmail(
        {
          ...getEmailTemplateFieldsForNft(nft),
          seller: notif.Sender!.username,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.BuyerOfferAccepted: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.BuyerOfferAccepted,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.nftTransactionId
      );
      return sendBuyerOfferAcceptedEmail(
        {
          ...getEmailTemplateFieldsForNft(nftTransaction.Nft),
          priceInSol: formatNftTransactionPrice(nftTransaction),
          seller: nftTransaction.From.username,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.BuyerOfferExpired: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.BuyerOfferExpired,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.offerTransactionId
      );
      return sendBuyerOfferExpiredEmail(
        {
          ...getEmailTemplateFieldsForNft(nftTransaction.Nft),
          priceInSol: formatNftTransactionPrice(nftTransaction),
          txid: parsedNotifData.refundTxid,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.CampaignApproved: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.CampaignApproved,
        notifData
      );
      const { campaignId } = parsedNotifData;
      const campaign = await getPrisma().campaign.findUnique({
        include: { Creator: true, PreviewAsset: true },
        where: { id: campaignId },
      });
      const {
        title,
        slug,
        Creator: { username: creatorUsername },
        PreviewAsset: { downloadUrl },
      } = campaign!;
      return sendCampaignApprovedEmail(
        {
          campaignName: title,
          imageSrc: downloadUrl,
          link: `${getFrontendUrl()}${getCampaignLinkRelative(
            creatorUsername,
            slug
          )}`,
        },
        [receiverEmail]
      );
    }
    case NotificationTypeExpress_Enum.CampaignRejected: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.CampaignRejected,
        notifData
      );
      const { campaignId } = parsedNotifData;
      const campaign = await getPrisma().campaign.findUnique({
        where: { id: campaignId },
      });
      const { title } = campaign!;
      return sendCampaignRejectedEmail(
        {
          campaignName: title,
          link: HelpCenterLink.CampaignGuidelines,
        },
        [receiverEmail]
      );
    }
    case NotificationTypeExpress_Enum.CampaignRejectedWithFeedback: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.CampaignRejectedWithFeedback,
        notifData
      );
      const { campaignId } = parsedNotifData;
      const campaign = await getPrisma().campaign.findUnique({
        include: { Creator: true },
        where: { id: campaignId },
      });
      invariant(campaign != null);
      const { title } = campaign;
      return sendCampaignRejectedWithFeedbackEmail(
        {
          campaignName: title,
          feedback: parsedNotifData.feedback,
          link: getLinkForEnvironment(
            getCampaignLinkRelative(campaign.Creator.username, campaign.slug)
          ),
        },
        [receiverEmail]
      );
    }
    case NotificationTypeExpress_Enum.CampaignCommunityNewUpdateShared: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.CampaignCommunityNewUpdateShared,
        notifData
      );
      const { postId } = parsedNotifData;
      const post = await getPrisma().post.findUnique({
        include: {
          Asset: true,
          Campaign: { include: { Creator: true } },
          Creator: true,
        },
        where: { id: postId },
      });
      if (post == null || post.Campaign == null) {
        return true;
      }

      const { title, body, Asset, Creator, Campaign } = post;
      return sendCampaignCommunityNewUpdateSharedEmail(
        {
          authorName: Creator.username,
          campaignName: Campaign.title,
          description: body,
          image:
            Asset.length > 0
              ? {
                  imageSrc: getImgixUrl(Asset[0].path),
                  // TODO[@bryancho]: support video thumbnails for emails after adding
                  // video support for posts
                  isVideoThumbnail: false,
                }
              : null,
          link: `${getFrontendUrl()}${getCampaignLinkRelative(
            Campaign.Creator.username,
            Campaign.slug,
            {
              [CampaignUrlParamKey.Tab]: CampaignTab.Community,
              [CampaignUrlParamKey.ScrollToContent]: "1",
            }
          )}`,
          title,
        },
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.CampaignAddedAsTeamMember: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.CampaignAddedAsTeamMember,
        notifData
      );
      const { campaignId } = parsedNotifData;
      const campaign = await getPrisma().campaign.findUnique({
        include: {
          Creator: true,
        },
        where: { id: campaignId },
      });
      if (campaign == null) {
        return true;
      }

      const {
        Creator: { username: creatorUsername },
        title,
        slug,
      } = campaign;
      return sendCampaignAddedAsTeamMemberEmail(
        {
          campaignTitle: title,
          creatorUsername,
          link: `${getFrontendUrl()}${getCampaignLinkRelative(
            creatorUsername,
            slug
          )}/dashboard`,
        },
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.CampaignFollowersCampaignPublished: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.CampaignFollowersCampaignPublished,
        notifData
      );
      const { campaignId } = parsedNotifData;
      const campaign = await getPrisma().campaign.findUnique({
        include: {
          Creator: true,
          PreviewAsset: true,
        },
        where: { id: campaignId },
      });
      if (campaign == null) {
        return true;
      }

      const {
        Creator: { username: creatorUsername },
        title,
        tagline,
        PreviewAsset: { downloadUrl: previewImageSrc },
        slug,
      } = campaign;
      return sendCampaignFollowerCampaignPublishedEmail(
        {
          campaignTagline: tagline,
          campaignTitle: title,
          creatorUsername,
          link: `${getFrontendUrl()}${getCampaignLinkRelative(
            creatorUsername,
            slug
          )}`,
          previewImageSrc,
        },
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.CampaignGoalReachedXPercent: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.CampaignGoalReachedXPercent,
        notifData
      );
      const { campaignId, percentAsNumber } = parsedNotifData;
      const campaign = await getPrisma().campaign.findUnique({
        include: {
          Creator: true,
          PreviewAsset: true,
        },
        where: { id: campaignId },
      });
      if (campaign == null) {
        return true;
      }

      return sendCampaignGoalReachedXPercentEmail(
        {
          bodyText: getCampaignGoalReachedXPercentBodyText(
            percentAsNumber as 50 | 100,
            campaign.title
          ),
          link: `${getFrontendUrl()}${getCampaignLinkRelative(
            campaign.Creator.username,
            campaign.slug
          )}`,
          percentAsNumber,
        },
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.CollabRequest: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.CollabRequest,
        notifData
      );
      const nft = await getNft(parsedNotifData.nftMint);
      return sendCollabRequestEmail(
        {
          ...getEmailTemplateFieldsForNft(nft),
          creator:
            nft.Creator.displayName != null && nft.Creator.displayName !== ""
              ? nft.Creator.displayName
              : nft.Creator.username,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.CreatorSecondarySale: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.CreatorSecondarySale,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.nftTransactionId
      );
      return sendCreatorSecondarySaleEmail(
        {
          ...getEmailTemplateFieldsForNft(nftTransaction.Nft),
          price: formatNftTransactionPrice(nftTransaction),
          soldTo: nftTransaction.To.username,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.FollowerAuctionAlmostOver:
      // TODO: implement this, we don't have a Postmark email template yet
      return true;
    case NotificationTypeExpress_Enum.FollowerNewEditionsListed: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.FollowerNewEditionsListed,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.nftTransactionId
      );
      return sendNewEditionsListedEmail(
        {
          ...getEmailTemplateFieldsForNft(nftTransaction.Nft),
          price: formatNftTransactionPrice(nftTransaction),
          seller: nftTransaction.From.username,
        },
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.FollowerNewPieceListed: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.FollowerNewPieceListed,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.nftTransactionId
      );
      const creator = nftTransaction.Nft.Creator;
      const seller = nftTransaction.From;
      return sendNewPieceListedEmail(
        {
          ...getEmailTemplateFieldsForNft(nftTransaction.Nft),
          // If the original creator is not the seller, we want to include the original creator's name in the email
          artist:
            seller.username !== creator.username
              ? creator.displayName || creator.username
              : undefined,
          price: formatNftTransactionPrice(nftTransaction),
          seller: seller.username,
        },
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.FollowerNewPieceListedSecondary: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.FollowerNewPieceListedSecondary,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.nftTransactionId
      );
      const creator = nftTransaction.Nft.Creator;
      return sendNewPieceListedSecondaryEmail(
        {
          ...getEmailTemplateFieldsForNft(nftTransaction.Nft),
          artist: creator.displayName || creator.username,
          price: formatNftTransactionPrice(nftTransaction),
        },
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.FollowerNewPieceScheduled: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.FollowerNewPieceScheduled,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.nftTransactionId
      );
      const creator = nftTransaction.Nft.Creator;
      const seller = nftTransaction.From;
      return sendNewPieceScheduledEmail(
        {
          ...getEmailTemplateFieldsForNft(nftTransaction.Nft),
          // If the original creator is not the seller, we want to include the original creator's name in the email
          artist:
            seller.username !== creator.username
              ? creator.displayName || creator.username
              : undefined,
          price: formatNftTransactionPrice(nftTransaction),
          scheduledAuctionTime: dayjs.unix(
            parsedNotifData.scheduledAuctionTimeUnix
          ),
          seller: seller.username,
        },
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.FollowerScheduledAuctionIsLive: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.FollowerScheduledAuctionIsLive,
        notifData
      );
      const nft = await getNft(parsedNotifData.nftMint);
      const creator = nft.Creator;
      const seller = notif.Sender!;
      return sendScheduledAuctionIsLiveEmail(
        {
          ...getEmailTemplateFieldsForNft(nft),
          // If the original creator is not the seller, we want to include the original creator's name in the email
          artist:
            seller.username !== creator.username &&
            (creator.displayName || creator.username),
          price: formatPrice(
            parsedNotifData.price.amount,
            parsedNotifData.price.currencyInfo
          ),
          seller: seller.username,
        },
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.InviteReceived: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.InviteReceived,
        notifData
      );
      return sendInviteReceivedEmail(
        {
          expiryInDays: parsedNotifData.expiryInDays,
          inviteLink: parsedNotifData.inviteLink,
          senderUsername: notif.Sender!.username,
        },
        [parsedNotifData.inviteeEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.InvitesConvertedToCreator: {
      return sendConvertedToCreatorEmail(
        {
          createLink: `${getFrontendUrl()}/create`,
          senderUsername: notif.Sender!.username,
        },
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.InvitesInviteeAcceptedInvite: {
      const acceptor = notif.Sender!;
      return sendInviteeAcceptedInviteEmail(
        {
          acceptorProfileLink: `${getFrontendUrl()}/@${acceptor.username}`,
          acceptorUsername: acceptor.username,
        },
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.NewFollower: {
      const { username } = notif.Sender!;
      return sendNewFollowerEmail(
        {
          followerLink: getLinkForEnvironment(
            getUserProfileLinkRelative(username)
          ),
          username,
        },
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.OwnerAuctionEnded: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerAuctionEnded,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.winningBidTransactionId
      );
      return sendOwnerAuctionEndedEmail(
        {
          ...getEmailTemplateFieldsForNft(nftTransaction.Nft),
          bidder: nftTransaction.From.username,
          price: formatNftTransactionPrice(nftTransaction),
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.OwnerAuctionEndedNoBids: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerAuctionEndedNoBids,
        notifData
      );
      const nft = await getNft(parsedNotifData.nftMint);
      return sendOwnerAuctionEndedNoBidsEmail(
        getEmailTemplateFieldsForNft(nft),
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.OwnerAuctionExtended: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerAuctionExtended,
        notifData
      );
      const nft = await getNft(parsedNotifData.nftMint);
      return sendOwnerAuctionExtendedEmail(
        {
          ...getEmailTemplateFieldsForNft(nft),
          numMinutes: parsedNotifData.numMinutesExtended,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.OwnerAuctionSettled: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerAuctionSettled,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.nftTransactionId
      );
      return sendOwnerAuctionSettledEmail(
        getEmailTemplateFieldsForNft(nftTransaction.Nft),
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.OwnerEditionSold: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerEditionSold,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.nftTransactionId
      );
      return sendEditionSoldEmail(
        {
          ...getEmailTemplateFieldsForNft(nftTransaction.Nft),
          buyerName: nftTransaction.To.username,
          editionNumber: nftTransaction.Nft.edition!,
          priceInSol: formatNftTransactionPrice(nftTransaction),
        },
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.OwnerEditionsSoldOut: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerEditionsSoldOut,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.nftTransactionId
      );
      return sendEditionsSoldOutEmail(
        getEmailTemplateFieldsForNft(nftTransaction.Nft),
        [receiverEmail],
        req
      );
    }
    case NotificationTypeExpress_Enum.OwnerFirstBidReceived: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerFirstBidReceived,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.nftTransactionId
      );
      return sendOwnerFirstBidReceivedEmail(
        {
          ...getEmailTemplateFieldsForNft(nftTransaction.Nft),
          bidder: nftTransaction.From.username,
          hours: getNftAuctionDuration(nftTransaction.Nft).asHours(),
          price: formatNftTransactionPrice(nftTransaction),
          seller: nftTransaction.To.username,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.OwnerGenerativeMintSoldOut: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerGenerativeMintSoldOut,
        notifData
      );
      const candyMachine = await getPrisma().candyMachine.findUnique({
        include: CONVERT_CANDY_MACHINE_INCLUDE,
        where: { id: parsedNotifData.candyMachineId },
      });
      invariant(candyMachine != null);
      return sendOwnerGenerativeMintSoldOutEmail(
        {
          generativeMintTitle: candyMachine.Series.name,
          imageSrc:
            candyMachine.Series.Photo_PhotoToSeries_avatarPhotoId.photoUrl,
          linkToGenerativeSeries: getSeriesLink(
            candyMachine.Series.User.username,
            candyMachine.Series.slug,
            SeriesTypeExpress_Enum.GenerativeMint
          ),
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.OwnerOfferReceived: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerOfferReceived,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.nftTransactionId
      );
      return sendOwnerOfferReceivedEmail(
        {
          ...getEmailTemplateFieldsForNft(nftTransaction.Nft),
          buyer: nftTransaction.From.username,
          priceInSol: formatNftTransactionPrice(nftTransaction),
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.OwnerOtherBidReceived: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerOtherBidReceived,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.nftTransactionId
      );
      return sendOwnerOtherBidReceivedEmail(
        {
          ...getEmailTemplateFieldsForNft(nftTransaction.Nft),
          bidder: nftTransaction.From.username,
          price: formatNftTransactionPrice(nftTransaction),
          seller: nftTransaction.To.username,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.OwnerPieceSoldAsInstantSale: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerPieceSoldAsInstantSale,
        notifData
      );
      const nftTransaction = await getNftTransaction(
        parsedNotifData.nftTransactionId
      );
      return sendOwnerPieceSoldAsInstantSaleEmail(
        {
          ...getEmailTemplateFieldsForNft(nftTransaction.Nft),
          buyerName: nftTransaction.To.username,
          priceInSol: formatNftTransactionPrice(nftTransaction),
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.PnftDropClosed: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.PnftDropClosed,
        notifData
      );
      const nft = await getNft(parsedNotifData.pnftMint);
      return sendPnftDropClosedEmail(
        {
          imageSrc: getImageSrcForEmail(nft.NftMetadata, nft.NftDisclosure),
          pnftLink: getNftLink(nft.Owner.username, nft.mint),
          pnftName: nft.NftMetadata.name,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.UnlockableDeclinedToSharedInfo: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.UnlockableDeclinedToSharedInfo,
        notifData
      );
      const nft = await getNft(parsedNotifData.nftMint);
      return sendUnlockableDeclinedToShareInfoEmail(
        {
          buyer: notif.Sender!.username,
          nftName: nft.NftMetadata.name,
          unlockableImageSrc: getImageSrcForEmail(
            nft.NftMetadata,
            nft.NftDisclosure
          ),
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.UnlockableInfoShared: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.UnlockableInfoShared,
        notifData
      );
      const nft = await getNft(parsedNotifData.nftMint);
      return sendUnlockableInfoSharedEmail(
        {
          buyer: notif.Sender!.username,
          nftLink: getNftLink(nft.Owner.username, nft.mint),
          nftName: nft.NftMetadata.name,
          unlockableImageSrc: getImageSrcForEmail(
            nft.NftMetadata,
            nft.NftDisclosure
          ),
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.UnlockableShareInfo: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.UnlockableShareInfo,
        notifData
      );
      const nft = await getNft(parsedNotifData.nftMint);
      return sendUnlockableShareInfoEmail(
        {
          creator: nft.Creator.username,
          nftLink: getNftLink(nft.Owner.username, nft.mint),
          nftName: nft.NftMetadata.name,
          unlockableImageSrc: getImageSrcForEmail(
            nft.NftMetadata,
            nft.NftDisclosure
          ),
          unlockableName: nft.NftListing?.Unlockable?.name ?? "",
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.VotingApproved: {
      return sendVotingApprovedEmail(
        {
          walletAddress: notif.Receiver!.id,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.VotingBrokeGuidelines:
    case NotificationTypeExpress_Enum.VotingDuplicate:
    case NotificationTypeExpress_Enum.VotingRejected: {
      return sendVotingRejectedEmail(receiverEmail, notifType, req);
    }
    case NotificationTypeExpress_Enum.AirdropCompleted: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.AirdropCompleted,
        notifData
      );
      const nft = await getNft(parsedNotifData.masterEditionMint);
      return sendAirdropCompletedEmail(
        {
          airdropCreatorUsername: nft.Creator.username,
          airdropNftName: nft.NftMetadata.name,
          imageSrc: getImageSrcForEmail(nft.NftMetadata, nft.NftDisclosure),
          link: getExplorerTxLink(parsedNotifData.txid),
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.AirdropGiftReceived: {
      const { notificationData: parsedNotifData } = parseNotificationData(
        NotificationTypeExpress_Enum.AirdropGiftReceived,
        notifData
      );
      const airdrop = await getPrisma().airdrop.findUnique({
        include: { StandardEditionNft: { include: { Creator: true } } },
        where: { id: parsedNotifData.airdropId },
      });
      const nft = airdrop!.StandardEditionNft;
      return sendAirdropGiftReceivedEmail(
        {
          airdropCreatorUsername: nft!.Creator.username,
          link: getNftLink(nft!.Creator.username, nft!.mint),
          receiverUsername: notif.Receiver!.username,
        },
        receiverEmail,
        req
      );
    }
    case NotificationTypeExpress_Enum.BonkClaim:
      return true;
    default:
      return assertUnreachable(notifType);
  }
}

export default async function sendEmailNotificationWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { id } = req.body.event.data.new;
  const prisma = getPrisma();
  const notif = await prisma.notification.findUnique({
    include: {
      Receiver: true,
      Sender: true,
    },
    where: { id },
  });
  invariant(notif != null);
  // Needed for InviteReceivedNotification—for that notif only, we send an email
  // to someone who is not a user on our platform.
  const inviteeEmail = (notif.data as Maybe<Record<string, any>>)
    ?.inviteeEmail as MaybeUndef<string>;
  const receiverEmail = notif.Receiver?.email ?? inviteeEmail;
  if (receiverEmail == null) {
    res.json({
      message: "receiver email is null, skipping",
      notif,
      skipped: true,
    });
    return;
  }
  const success = await sendEmail(notif, receiverEmail, req);

  if (!success) {
    // Send back 500 status so this webhook can be retried.
    res.status(500).json({ message: "Failed to send email" });
    return;
  }

  res.json({ notif, success: true });
}
