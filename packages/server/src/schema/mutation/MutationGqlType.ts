import { GraphQLObjectType } from "graphql";
import insertNftMutationField from "src/schema/mutation/insertNftMutationField";
import insertNftTransactionMutationField from "src/schema/mutation/insertNftTransactionMutationField";
import connectSocialNetworkMutationField from "src/schema/mutation/connectSocialNetworkMutationField";
import Typename from "src/types/enums/Typename";
import disconnectSocialNetworkMutationField from "src/schema/mutation//disconnectSocialNetworkMutationField";
import refreshMetadataMutationField from "src/schema/mutation/refreshMetadataMutationField";
import uploadNftToArweaveMutationField from "src/schema/mutation/uploadNftToArweaveMutationField";
import updateSeriesIdForNftsMutationField from "src/schema/mutation//updateSeriesIdForNftsMutationField";
import importNftsMutationField from "src/schema/mutation/importNftsMutationField";
import insertPnftMutationField from "src/schema/mutation/insertPnftMutationField";
import updateDiscordRolesForUserMutationField from "src/schema/mutation/updateDiscordRolesForUserMutationField";
import sendCreatorInvitesMutationField from "src/schema/mutation/sendCreatorInvitesMutationField";
import acceptCreatorInviteMutationField from "src/schema/mutation/acceptCreatorInviteMutationField";
import dismissUnlockableWinnerBuyerShareInfoCtaMutationField from "src/schema/mutation/dismissUnlockableWinnerBuyerShareInfoCtaMutationField";
import dismissUnlockableWinnerCreatorSeeInfoCtaMutationField from "src/schema/mutation/dismissUnlockableWinnerCreatorSeeInfoCtaMutationField";
import updateUnlockableWinnerBuyerInfoMutationField from "src/schema/mutation/updateUnlockableWinnerBuyerInfoMutationField";
import campaignsNamespaceMutationField from "src/schema/mutation/campaignsNamespaceMutationField";
import postsNamespaceMutationField from "src/schema/mutation/postsNamespaceMutationField";
import reactionMutationsMutationField from "src/schema/mutation/reactionMutationsMutationField";
import commentMutationsMutationField from "src/schema/mutation/commentMutationsMutationField";
import deleteNftMutationField from "src/schema/mutation/deleteNftMutationField";
import airdropMutationsMutationField from "src/schema/mutation/airdropMutationsMutationField";
import safetyCheckMutationsMutationField from "src/schema/mutation/safetyCheckMutationsMutationField";
import editionsMutationsMutationField from "src/schema/mutation/editionsMutationsMutationField";
import shareInfoAndSwapForTooniesMutationField from "src/schema/mutation/shareInfoAndSwapForTooniesMutationField";

const MutationGqlType = new GraphQLObjectType({
  fields: {
    AirdropMutations: airdropMutationsMutationField,
    CampaignsNamespace: campaignsNamespaceMutationField,
    CommentMutations: commentMutationsMutationField,
    EditionsMutations: editionsMutationsMutationField,
    PostNamespace: postsNamespaceMutationField,
    ReactionMutations: reactionMutationsMutationField,
    SafetyCheckMutations: safetyCheckMutationsMutationField,
    acceptCreatorInvite: acceptCreatorInviteMutationField,
    connectSocialNetwork: connectSocialNetworkMutationField,
    deleteNft: deleteNftMutationField,
    disconnectSocialNetwork: disconnectSocialNetworkMutationField,
    dismissUnlockableWinnerBuyerShareInfoCta:
      dismissUnlockableWinnerBuyerShareInfoCtaMutationField,
    dismissUnlockableWinnerCreatorSeeInfoCta:
      dismissUnlockableWinnerCreatorSeeInfoCtaMutationField,
    importNfts: importNftsMutationField,
    insertNft: insertNftMutationField,
    insertNftTransaction: insertNftTransactionMutationField,
    insertPnft: insertPnftMutationField,
    refreshMetadata: refreshMetadataMutationField,
    sendCreatorInvites: sendCreatorInvitesMutationField,
    shareInfoAndSwapForToonies: shareInfoAndSwapForTooniesMutationField,
    updateDiscordRolesForUser: updateDiscordRolesForUserMutationField,
    updateSeriesIdForNfts: updateSeriesIdForNftsMutationField,
    updateUnlockableWinnerBuyerInfo:
      updateUnlockableWinnerBuyerInfoMutationField,
    uploadNftToArweave: uploadNftToArweaveMutationField,
  },
  name: Typename.Mutation,
});

export default MutationGqlType;
