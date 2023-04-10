import { Reaction } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import groupBy from "formfn-shared/dist/utils/array/groupBy";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import getLinkWithoutProtocol from "formfn-shared/dist/utils/links/getLinkWithoutProtocol";
import getStringWithoutTrailingCharacter from "formfn-shared/dist/utils/string/getStringWithoutTrailingCharacter";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import CONVERT_CAMPAIGN_FUNDING_TIER_INCLUDE from "src/constants/include/ConvertCampaignFundingTierInclude";
import ConvertPostType from "src/types/convert/ConvertPostType";
import Typename from "src/types/enums/Typename";
import convertAsset from "src/utils/convert/convertAsset";
import convertCampaignFundingTier from "src/utils/convert/convertCampaignFundingTier";
import convertComment from "src/utils/convert/convertComment";
import convertNftToAsset from "src/utils/convert/convertNftToAsset";
import convertPoll from "src/utils/convert/convertPoll";
import convertReactionCount from "src/utils/convert/convertReaction";
import convertUser from "src/utils/convert/convertUser";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  PostExpress,
  PostVisibilityExpress_Enum,
  ReactionTypeExpress_Enum,
} from "src/__generated__/generated";

export default async function convertPost(
  post: ConvertPostType,
  viewerId: Maybe<string>
): Promise<PostExpress> {
  const {
    id,
    title,
    body,
    timeCreated,
    Asset: assets,
    Creator,
    link,
    visibility,
    Reaction: reactions,
    _count,
    Comment,
    Poll,
    visibilityFundingTierIds,
    AirdropMasterEdition,
  } = post;

  const visibilityFundingTiers =
    ((visibilityFundingTierIds as Maybe<Array<string>>)?.length ?? 0) === 0
      ? null
      : await getPrisma().campaignFundingTier.findMany({
          include: CONVERT_CAMPAIGN_FUNDING_TIER_INCLUDE,
          where: { id: { in: visibilityFundingTierIds as Array<string> } },
        });
  const reactionsGroupedByType = groupBy(reactions, (r: Reaction) => r.type);
  const viewerReaction = reactions.find(
    (reaction) => reaction.fromUserId === viewerId
  );
  const convertedReactions = {
    __typename: Typename.Reactions as const,
    reactionCounts: Object.values(reactionsGroupedByType).map(
      (reactionsByType) =>
        convertReactionCount(
          reactionsByType.length,
          reactionsByType[0].type as ReactionTypeExpress_Enum
        )
    ),
    totalCount: reactions.length,
    viewerReactionType:
      (viewerReaction?.type as Maybe<ReactionTypeExpress_Enum>) ?? null,
  };

  const convertedComments = {
    __typename: Typename.PostComments as const,
    previewComments: Comment.map((comment) => convertComment(comment)),
    totalCount: _count.Comment,
  };

  const commonPostFields = {
    comments: convertedComments,
    creator: convertUser(Creator),
    id,
    reactions: convertedReactions,
    timeCreated,
    title,
    visibility: visibility as PostVisibilityExpress_Enum,
    visibilityFundingTiers:
      visibilityFundingTiers != null
        ? visibilityFundingTiers.map((fundingTier) =>
            convertCampaignFundingTier(fundingTier)
          )
        : null,
  };
  const convertedLink =
    link != null && !isEmptyString(link)
      ? {
          __typename: Typename.Link as const,
          href: link,
          text: getStringWithoutTrailingCharacter(
            getLinkWithoutProtocol(link),
            "/"
          ),
        }
      : null;

  if (AirdropMasterEdition != null) {
    // NOTE: visibility should be controlled by the caller, not this function
    const standardEditionAirdrop =
      viewerId != null
        ? await getPrisma().airdrop.findUnique({
            include: { StandardEditionNft: { include: { NftMetadata: true } } },
            where: {
              toAddress_masterEditionMint: {
                masterEditionMint: AirdropMasterEdition.mint,
                toAddress: viewerId,
              },
            },
          })
        : null;
    const standardEditionNft = standardEditionAirdrop?.StandardEditionNft;
    const standardEditionMetadata = standardEditionNft?.NftMetadata;
    const masterEditionMetadata = AirdropMasterEdition.NftMetadata;

    return {
      ...commonPostFields,
      __typename: Typename.PostWithAirdrop,
      link: {
        __typename: Typename.Link as const,
        href: getNftLinkRelative(
          standardEditionNft?.ownerId ?? AirdropMasterEdition.Owner.id,
          standardEditionNft?.mint ?? AirdropMasterEdition.mint,
          standardEditionMetadata?.assetWidth ??
            masterEditionMetadata.assetWidth,
          standardEditionMetadata?.assetHeight ??
            masterEditionMetadata.assetHeight
        ),
        text:
          standardEditionNft != null ? "See airdropped piece" : "See airdrop",
      },
      nftAsset: {
        __typename: Typename.NftAsset,
        asset: convertNftToAsset(AirdropMasterEdition),
        nftInfo: {
          __typename: Typename.NftAssetNftInfo,
          mint: standardEditionNft?.mint ?? AirdropMasterEdition.mint,
        },
      },
    };
  }

  if (Poll != null) {
    return {
      ...commonPostFields,
      __typename: Typename.PostWithPoll,
      asset:
        assets == null || assets.length === 0 ? null : convertAsset(assets[0]),
      poll: convertPoll(Poll, viewerId),
    };
  }

  if (assets == null || assets.length === 0) {
    return {
      ...commonPostFields,
      __typename: Typename.PostTextOnly,
      body,
      link: convertedLink,
    };
  }

  return {
    ...commonPostFields,
    __typename: Typename.PostWithSingleAsset,
    asset: convertAsset(assets[0]),
    body,
    link: convertedLink,
  };
}
