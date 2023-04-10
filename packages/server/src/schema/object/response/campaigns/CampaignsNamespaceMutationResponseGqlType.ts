import { GraphQLObjectType } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import createCampaignFundingTierStandardResolver from "src/resolvers/mutation/campaigns/createCampaignFundingTierStandardResolver";
import createCampaignResolver from "src/resolvers/mutation/campaigns/createCampaignResolver";
import deleteCampaignFundingTierResolver from "src/resolvers/mutation/campaigns/deleteCampaignFundingTierResolver";
import publishCampaignResolver from "src/resolvers/mutation/campaigns/publishCampaignResolver";
import submitCampaignForApprovalResolver from "src/resolvers/mutation/campaigns/submitCampaignForApprovalResolver";
import updateCampaignAboutResolver from "src/resolvers/mutation/campaigns/updateCampaignAboutResolver";
import updateCampaignBasicInfoResolver from "src/resolvers/mutation/campaigns/updateCampaignBasicInfoResolver";
import updateCampaignFundingTierStandardResolver from "src/resolvers/mutation/campaigns/updateCampaignFundingTierStandardResolver";
import upsertCampaignGalleryResolver from "src/resolvers/mutation/campaigns/upsertCampaignGalleryResolver";
import CreateCampaignInputGqlType from "src/schema/input/campaigns/CreateCampaignInputGqlType";
import DeleteCampaignFundingTierInputGqlType from "src/schema/input/campaigns/DeleteCampaignFundingTierInputGqlType";
import PublishCampaignInputGqlType from "src/schema/input/campaigns/PublishCampaignInputGqlType";
import SubmitCampaignForApprovalInputGqlType from "src/schema/input/campaigns/SubmitCampaignForApprovalInputGqlType";
import UpdateCampaignAboutInputGqlType from "src/schema/input/campaigns/UpdateCampaignAboutInputGqlType";
import UpdateCampaignBasicInfoInputGqlType from "src/schema/input/campaigns/UpdateCampaignBasicInfoInputGqlType";
import UpdateCampaignFundingTierStandardInputGqlType from "src/schema/input/campaigns/UpdateCampaignFundingTierStandardInputGqlType";
import UpsertCampaignGalleryInputGqlType from "src/schema/input/campaigns/UpsertCampaignGalleryInputGqlType";
import CreateCampaignFundingTierStandardResponseGqlType from "src/schema/object/response/campaigns/CreateCampaignFundingTierStandardResponseGqlType";
import CreateCampaignResponseGqlType from "src/schema/object/response/campaigns/CreateCampaignResponseGqlType";
import DeleteCampaignFundingTierResponseGqlType from "src/schema/object/response/campaigns/DeleteCampaignFundingTierResponseGqlType";
import PublishCampaignResponseGqlType from "src/schema/object/response/campaigns/PublishCampaignResponseGqlType";
import SubmitCampaignForApprovalResponseGqlType from "src/schema/object/response/campaigns/SubmitCampaignForApprovalResponseGqlType";
import UpdateCampaignAboutResponseGqlType from "src/schema/object/response/campaigns/UpdateCampaignAboutResponseGqlType";
import UpdateCampaignBasicInfoResponseGqlType from "src/schema/object/response/campaigns/UpdateCampaignBasicInfoResponseGqlType";
import UpdateCampaignFundingTierStandardResponseGqlType from "src/schema/object/response/campaigns/UpdateCampaignFundingTierStandardResponseGqlType";
import UpsertCampaignGalleryResponseGqlType from "src/schema/object/response/campaigns/UpsertCampaignGalleryResponseGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CreateCampaignFundingTierStandardInput,
  CreateCampaignFundingTierStandardResponse,
  CreateCampaignInput,
  CreateCampaignResponse,
  DeleteCampaignFundingTierInput,
  DeleteCampaignFundingTierResponse,
  PublishCampaignInput,
  PublishCampaignResponse,
  SubmitCampaignForApprovalInput,
  SubmitCampaignForApprovalResponse,
  UpdateCampaignAboutInput,
  UpdateCampaignAboutResponse,
  UpdateCampaignBasicInfoInput,
  UpdateCampaignBasicInfoResponse,
  UpdateCampaignFundingTierNftsInput,
  UpdateCampaignFundingTierNftsResponse,
  UpsertCampaignGalleryInput,
  UpsertCampaignGalleryResponse,
  UpdateCampaignFundingTierStandardInput,
  UpdateCampaignFundingTierStandardResponse,
  UpdateCampaignFundingTierOrderInput,
  UpdateCampaignFundingTierOrderResponse,
  ConcludeCampaignInput,
  ConcludeCampaignResponse,
  RemoveUserAsTeamMemberFromCampaignInput,
  RemoveUserAsTeamMemberFromCampaignResponse,
  CreateAirdropsForCampaignInput,
  CreateAirdropsForCampaignResponse,
  ApproveCampaignInput,
  ApproveCampaignResponse,
  RejectCampaignResponse,
  RejectCampaignInput,
} from "src/__generated__/generated";
import UpdateCampaignFundingTierNftsInputGqlType from "src/schema/input/campaigns/UpdateCampaignFundingTierNftsInputGqlType";
import UpdateCampaignFundingTierNftsResponseGqlType from "src/schema/object/response/campaigns/UpdateCampaignFundingTierNftsResponseGqlType";
import updateCampaignFundingTierNftsResolver from "src/resolvers/mutation/campaigns/updateCampaignFundingTierNftsResolver";
import CreateCampaignFundingTierStandardInputGqlType from "src/schema/input/campaigns/CreateCampaignFundingTierStandardInputGqlType";
import UpdateCampaignFundingTierOrderInputGqlType from "src/schema/input/campaigns/UpdateCampaignFundingTierOrderInputGqlType";
import UpdateCampaignFundingTierOrderResponseGqlType from "src/schema/object/response/campaigns/UpdateCampaignFundingTierOrderResponseGqlType";
import updateCampaignFundingTierOrderResolver from "src/resolvers/mutation/campaigns/updateCampaignFundingTierOrderResolver";
import ConcludeCampaignInputGqlType from "src/schema/input/campaigns/ConcludeCampaignInputGqlType";
import ConcludeCampaignResponseGqlType from "src/schema/object/response/campaigns/ConcludeCampaignResponseGqlType";
import concludeCampaignResolver from "src/resolvers/mutation/campaigns/concludeCampaignResolver";
import RemoveUserAsTeamMemberFromCampaignInputGqlType from "src/schema/input/campaigns/RemoveUserAsTeamMemberFromCampaignInputGqlType";
import RemoveUserAsTeamMemberFromCampaignResponseGqlType from "src/schema/object/response/campaigns/RemoveUserAsTeamMemberFromCampaignResponseGqlType";
import removeUserAsTeamMemberFromCampaignResolver from "src/resolvers/mutation/campaigns/removeUserAsTeamMemberFromCampaignResolver";
import CreateAirdropsForCampaignInputGqlType from "src/schema/input/campaigns/CreateAirdropsForCampaignInputGqlType";
import CreateAirdropsForCampaignResponseGqlType from "src/schema/object/response/campaigns/CreateAirdropsForCampaignResponseGqlType";
import createAirdropsForCampaignResolver from "src/resolvers/mutation/campaigns/createAirdropsForCampaignResolver";
import ApproveCampaignInputGqlType from "src/schema/input/campaigns/ApproveCampaignInputGqlType";
import ApproveCampaignResponseGqlType from "src/schema/object/response/campaigns/ApproveCampaignResponseGqlType";
import approveCampaignResolver from "src/resolvers/mutation/campaigns/approveCampaignResolver";
import RejectCampaignInputGqlType from "src/schema/input/campaigns/RejectCampaignInputGqlType";
import RejectCampaignResponseGqlType from "src/schema/object/response/campaigns/RejectCampaignResponseGqlType";
import rejectCampaignResolver from "src/resolvers/mutation/campaigns/rejectCampaignResolver";

const CampaignsNamespaceMutationResponseGqlType = new GraphQLObjectType({
  fields: {
    approveCampaign: {
      args: {
        input: { type: gqlNonNull(ApproveCampaignInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: ApproveCampaignInput },
        context: MyContext
      ): Promise<ApproveCampaignResponse> {
        return logErrorsForResolver(context.req, () =>
          approveCampaignResolver(context, input)
        );
      },
      type: gqlNonNull(ApproveCampaignResponseGqlType),
    },
    concludeCampaign: {
      args: {
        input: { type: gqlNonNull(ConcludeCampaignInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: ConcludeCampaignInput },
        context: MyContext
      ): Promise<ConcludeCampaignResponse> {
        return logErrorsForResolver(context.req, () =>
          concludeCampaignResolver(context, input)
        );
      },
      type: gqlNonNull(ConcludeCampaignResponseGqlType),
    },
    createAirdropsForCampaign: {
      args: {
        input: { type: gqlNonNull(CreateAirdropsForCampaignInputGqlType) },
      },
      async resolve(
        _source,
        {
          input,
        }: {
          input: CreateAirdropsForCampaignInput;
        },
        context: MyContext
      ): Promise<CreateAirdropsForCampaignResponse> {
        return logErrorsForResolver(context.req, () =>
          createAirdropsForCampaignResolver(context, input)
        );
      },
      type: gqlNonNull(CreateAirdropsForCampaignResponseGqlType),
    },
    createCampaign: {
      args: {
        input: { type: gqlNonNull(CreateCampaignInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: CreateCampaignInput },
        context: MyContext
      ): Promise<CreateCampaignResponse> {
        return logErrorsForResolver(context.req, () =>
          createCampaignResolver(context, input)
        );
      },
      type: gqlNonNull(CreateCampaignResponseGqlType),
    },
    createCampaignFundingTierStandard: {
      args: {
        input: {
          type: gqlNonNull(CreateCampaignFundingTierStandardInputGqlType),
        },
      },
      async resolve(
        _source,
        { input }: { input: CreateCampaignFundingTierStandardInput },
        context: MyContext
      ): Promise<CreateCampaignFundingTierStandardResponse> {
        return logErrorsForResolver(context.req, () =>
          createCampaignFundingTierStandardResolver(context, input)
        );
      },
      type: gqlNonNull(CreateCampaignFundingTierStandardResponseGqlType),
    },
    deleteCampaignFundingTier: {
      args: {
        input: { type: gqlNonNull(DeleteCampaignFundingTierInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: DeleteCampaignFundingTierInput },
        context: MyContext
      ): Promise<DeleteCampaignFundingTierResponse> {
        return logErrorsForResolver(context.req, () =>
          deleteCampaignFundingTierResolver(context, input)
        );
      },
      type: gqlNonNull(DeleteCampaignFundingTierResponseGqlType),
    },
    publishCampaign: {
      args: {
        input: { type: gqlNonNull(PublishCampaignInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: PublishCampaignInput },
        context: MyContext
      ): Promise<PublishCampaignResponse> {
        return logErrorsForResolver(context.req, () =>
          publishCampaignResolver(context, input)
        );
      },
      type: gqlNonNull(PublishCampaignResponseGqlType),
    },
    rejectCampaign: {
      args: {
        input: { type: gqlNonNull(RejectCampaignInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: RejectCampaignInput },
        context: MyContext
      ): Promise<RejectCampaignResponse> {
        return logErrorsForResolver(context.req, () =>
          rejectCampaignResolver(context, input)
        );
      },
      type: gqlNonNull(RejectCampaignResponseGqlType),
    },
    removeUserAsTeamMemberFromCampaign: {
      args: {
        input: {
          type: gqlNonNull(RemoveUserAsTeamMemberFromCampaignInputGqlType),
        },
      },
      async resolve(
        _source,
        { input }: { input: RemoveUserAsTeamMemberFromCampaignInput },
        context: MyContext
      ): Promise<RemoveUserAsTeamMemberFromCampaignResponse> {
        return logErrorsForResolver(context.req, () =>
          removeUserAsTeamMemberFromCampaignResolver(context, input)
        );
      },
      type: gqlNonNull(RemoveUserAsTeamMemberFromCampaignResponseGqlType),
    },
    submitCampaignForApproval: {
      args: {
        input: { type: gqlNonNull(SubmitCampaignForApprovalInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: SubmitCampaignForApprovalInput },
        context: MyContext
      ): Promise<SubmitCampaignForApprovalResponse> {
        return logErrorsForResolver(context.req, () =>
          submitCampaignForApprovalResolver(context, input)
        );
      },
      type: gqlNonNull(SubmitCampaignForApprovalResponseGqlType),
    },
    updateCampaignAbout: {
      args: {
        input: { type: gqlNonNull(UpdateCampaignAboutInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: UpdateCampaignAboutInput },
        context: MyContext
      ): Promise<UpdateCampaignAboutResponse> {
        return logErrorsForResolver(context.req, () =>
          updateCampaignAboutResolver(context, input)
        );
      },
      type: gqlNonNull(UpdateCampaignAboutResponseGqlType),
    },
    updateCampaignBasicInfo: {
      args: {
        input: { type: gqlNonNull(UpdateCampaignBasicInfoInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: UpdateCampaignBasicInfoInput },
        context: MyContext
      ): Promise<UpdateCampaignBasicInfoResponse> {
        return logErrorsForResolver(context.req, () =>
          updateCampaignBasicInfoResolver(context, input)
        );
      },
      type: gqlNonNull(UpdateCampaignBasicInfoResponseGqlType),
    },
    updateCampaignFundingTierNfts: {
      args: {
        input: { type: gqlNonNull(UpdateCampaignFundingTierNftsInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: UpdateCampaignFundingTierNftsInput },
        context: MyContext
      ): Promise<UpdateCampaignFundingTierNftsResponse> {
        return logErrorsForResolver(context.req, () =>
          updateCampaignFundingTierNftsResolver(context, input)
        );
      },
      type: gqlNonNull(UpdateCampaignFundingTierNftsResponseGqlType),
    },
    updateCampaignFundingTierOrder: {
      args: {
        input: {
          type: gqlNonNull(UpdateCampaignFundingTierOrderInputGqlType),
        },
      },
      async resolve(
        _source,
        { input }: { input: UpdateCampaignFundingTierOrderInput },
        context: MyContext
      ): Promise<UpdateCampaignFundingTierOrderResponse> {
        return logErrorsForResolver(context.req, () =>
          updateCampaignFundingTierOrderResolver(context, input)
        );
      },
      type: gqlNonNull(UpdateCampaignFundingTierOrderResponseGqlType),
    },
    updateCampaignFundingTierStandard: {
      args: {
        input: {
          type: gqlNonNull(UpdateCampaignFundingTierStandardInputGqlType),
        },
      },
      async resolve(
        _source,
        { input }: { input: UpdateCampaignFundingTierStandardInput },
        context: MyContext
      ): Promise<UpdateCampaignFundingTierStandardResponse> {
        return logErrorsForResolver(context.req, () =>
          updateCampaignFundingTierStandardResolver(context, input)
        );
      },
      type: gqlNonNull(UpdateCampaignFundingTierStandardResponseGqlType),
    },
    upsertCampaignGallery: {
      args: {
        input: { type: gqlNonNull(UpsertCampaignGalleryInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: UpsertCampaignGalleryInput },
        context: MyContext
      ): Promise<UpsertCampaignGalleryResponse> {
        return logErrorsForResolver(context.req, () =>
          upsertCampaignGalleryResolver(context, input)
        );
      },
      type: gqlNonNull(UpsertCampaignGalleryResponseGqlType),
    },
  },
  name: Typename.CampaignsNamespaceMutationResponse,
});

export default CampaignsNamespaceMutationResponseGqlType;
