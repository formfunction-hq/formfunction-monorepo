import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import campaignNftAssetsResolver from "src/resolvers/query/nested/campaigns/campaignNftAssetsResolver";
import CampaignCategoryGqlType from "src/schema/enum/campaigns/CampaignCategoryGqlType";
import CampaignColorSchemeGqlType from "src/schema/enum/campaigns/CampaignColorSchemeGqlType";
import CampaignStatusGqlType from "src/schema/enum/campaigns/CampaignStatusGqlType";
import NftAssetsForCampaignInputGqlType from "src/schema/input/NftAssetsForCampaignInputGqlType";
import AssetGqlType from "src/schema/object/AssetGqlType";
import CampaignAboutGqlType from "src/schema/object/campaigns/CampaignAboutGqlType";
import CampaignSocialLinksGqlType from "src/schema/object/campaigns/CampaignSocialLinksGqlType";
import CampaignTeamMemberGqlType from "src/schema/object/campaigns/CampaignTeamMemberGqlType";
import NftAssetGqlType from "src/schema/object/NftAssetGqlType";
import UserGqlType from "src/schema/object/UserGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import CampaignFundingTierGqlType from "src/schema/union/CampaignFundingTierGqlType";
import CampaignGoalGqlType from "src/schema/union/CampaignGoalGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import {
  CampaignV2,
  NftAssetsForCampaignInput,
} from "src/__generated__/generated";

const CampaignV2GqlType = new GraphQLObjectType({
  fields: {
    about: {
      type: gqlNonNull(CampaignAboutGqlType),
    },
    category: { type: gqlNonNull(CampaignCategoryGqlType) },
    colorScheme: { type: gqlNonNull(CampaignColorSchemeGqlType) },
    creator: { type: gqlNonNull(UserGqlType) },
    endTime: { type: TimestamptzScalarGqlType },
    fundingTierOrder: { type: gqlListOfNonNull(GraphQLID) },
    fundingTiers: { type: gqlListOfNonNull(CampaignFundingTierGqlType) },
    galleryAssets: { type: gqlListOfNonNull(AssetGqlType) },
    goal: { type: gqlNonNull(CampaignGoalGqlType) },
    goalProgressSymbol: {
      description: "How progress is marked on the campaign progress bar",
      type: gqlNonNull(GraphQLString),
    },
    id: { type: gqlNonNull(GraphQLID) },
    isViewerHolder: {
      type: GraphQLBoolean,
    },
    logoAsset: {
      type: AssetGqlType,
    },
    nftAssets: {
      args: {
        input: { type: gqlNonNull(NftAssetsForCampaignInputGqlType) },
      },
      resolve: (
        source: CampaignV2,
        { input }: { input: NftAssetsForCampaignInput },
        context: MyContext
      ) =>
        logErrorsForResolver(context.req, () =>
          campaignNftAssetsResolver(source.id, input)
        ),
      type: gqlNonNullListOfNonNull(NftAssetGqlType),
    },
    previewAsset: {
      type: gqlNonNull(AssetGqlType),
    },
    slug: {
      type: gqlNonNull(GraphQLString),
    },
    socialLinks: {
      type: CampaignSocialLinksGqlType,
    },
    status: { type: gqlNonNull(CampaignStatusGqlType) },
    tagline: {
      description: "A short description of the campaign",
      type: gqlNonNull(GraphQLString),
    },
    teamMembers: { type: gqlListOfNonNull(CampaignTeamMemberGqlType) },
    timeCreated: {
      type: gqlNonNull(TimestamptzScalarGqlType),
    },
    title: {
      type: gqlNonNull(GraphQLString),
    },
    youtubeVideoHref: {
      type: GraphQLString,
    },
  },
  name: Typename.CampaignV2,
});

export default CampaignV2GqlType;
