import { GraphQLObjectType } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import campaignForNftResolver from "src/resolvers/query/nested/campaigns/campaignForNftResolver";
import campaignFundingTiersForSlugResolver from "src/resolvers/query/nested/campaigns/campaignFundingTiersForSlugResolver";
import campaignsFeaturedResolver from "src/resolvers/query/nested/campaigns/campaignsFeaturedResolver";
import campaignsForHeroResolver from "src/resolvers/query/nested/campaigns/campaignsForHeroResolver";
import campaignV2ForSlugResolver from "src/resolvers/query/nested/campaigns/campaignV2ForSlugResolver";
import CampaignForNftInputGqlType from "src/schema/input/campaigns/CampaignForNftInputGqlType";
import CampaignFundingTiersForSlugInputGqlType from "src/schema/input/campaigns/CampaignFundingTiersForSlugInputGqlType";
import CampaignsFeaturedInputGqlType from "src/schema/input/campaigns/CampaignsFeaturedInputGqlType";
import CampaignsForExploreInputGqlType from "src/schema/input/campaigns/CampaignsForExploreInputGqlType";
import CampaignsForUserInputGqlType from "src/schema/input/campaigns/CampaignsForUserInputGqlType";
import CampaignsWhereUserIsActiveSupporterInputGqlType from "src/schema/input/campaigns/CampaignsWhereUserIsActiveSupporterInputGqlType";
import CampaignV2ActivityForSlugInputGqlType from "src/schema/input/campaigns/CampaignV2ActivityForSlugInputGqlType";
import CampaignV2ForSlugInputGqlType from "src/schema/input/campaigns/CampaignV2ForSlugInputGqlType";
import CampaignForNftResponseGqlType from "src/schema/object/response/campaigns/CampaignForNftResponseGqlType";
import CampaignFundingTiersForSlugResponseGqlType from "src/schema/object/response/campaigns/CampaignFundingTiersForSlugResponseGqlType";
import CampaignHoldersForSlugResponseGqlType from "src/schema/object/response/campaigns/CampaignHoldersForSlugResponseGqlType";
import CampaignsFeaturedResponseGqlType from "src/schema/object/response/campaigns/CampaignsFeaturedResponseGqlType";
import CampaignsForExploreResponseGqlType from "src/schema/object/response/campaigns/CampaignsForExploreResponseGqlType";
import CampaignsForHeroResponseGqlType from "src/schema/object/response/campaigns/CampaignsForHeroResponseGqlType";
import CampaignsForUserResponseGqlType from "src/schema/object/response/campaigns/CampaignsForUserResponseGqlType";
import CampaignsWhereUserIsActiveSupporterResponseGqlType from "src/schema/object/response/campaigns/CampaignsWhereUserIsActiveSupporterResponseGqlType";
import CampaignV2ActivityForSlugResponseGqlType from "src/schema/object/response/campaigns/CampaignV2ActivityForSlugResponseGqlType";
import CampaignV2ForSlugResponseGqlType from "src/schema/object/response/campaigns/CampaignV2ForSlugResponseGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CampaignForNftInput,
  CampaignForNftResponse,
  CampaignFundingTiersForSlugInput,
  CampaignFundingTiersForSlugResponse,
  CampaignsFeaturedInput,
  CampaignsFeaturedResponse,
  CampaignsForHeroResponse,
  CampaignV2ForSlugInput,
  CampaignV2ForSlugResponse,
} from "src/__generated__/generated";

const CampaignsNamespaceQueryResponseGqlType = new GraphQLObjectType({
  fields: {
    campaignForNft: {
      args: {
        input: { type: gqlNonNull(CampaignForNftInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: CampaignForNftInput },
        context: MyContext
      ): Promise<CampaignForNftResponse> {
        return logErrorsForResolver(context.req, () =>
          campaignForNftResolver(context, input)
        );
      },
      type: gqlNonNull(CampaignForNftResponseGqlType),
    },
    campaignFundingTiersForSlug: {
      args: {
        input: { type: gqlNonNull(CampaignFundingTiersForSlugInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: CampaignFundingTiersForSlugInput },
        context: MyContext
      ): Promise<CampaignFundingTiersForSlugResponse> {
        return logErrorsForResolver(context.req, () =>
          campaignFundingTiersForSlugResolver(context, input)
        );
      },
      type: gqlNonNull(CampaignFundingTiersForSlugResponseGqlType),
    },
    campaignHoldersForSlug: {
      resolve: () => ({}),
      type: gqlNonNull(CampaignHoldersForSlugResponseGqlType),
    },
    campaignV2ActivityForSlug: {
      args: {
        input: { type: gqlNonNull(CampaignV2ActivityForSlugInputGqlType) },
      },
      resolve: () => ({}),
      type: gqlNonNull(CampaignV2ActivityForSlugResponseGqlType),
    },
    campaignV2ForSlug: {
      args: {
        input: { type: gqlNonNull(CampaignV2ForSlugInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: CampaignV2ForSlugInput },
        context: MyContext
      ): Promise<CampaignV2ForSlugResponse> {
        return logErrorsForResolver(context.req, () =>
          campaignV2ForSlugResolver(context, input)
        );
      },
      type: gqlNonNull(CampaignV2ForSlugResponseGqlType),
    },
    campaignsFeatured: {
      args: {
        input: { type: gqlNonNull(CampaignsFeaturedInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: CampaignsFeaturedInput },
        context: MyContext
      ): Promise<CampaignsFeaturedResponse> {
        return logErrorsForResolver(context.req, () =>
          campaignsFeaturedResolver(context, input)
        );
      },
      type: gqlNonNull(CampaignsFeaturedResponseGqlType),
    },
    campaignsForExplore: {
      args: {
        input: { type: gqlNonNull(CampaignsForExploreInputGqlType) },
      },
      resolve: () => ({}),
      type: gqlNonNull(CampaignsForExploreResponseGqlType),
    },
    campaignsForHero: {
      async resolve(
        _source,
        _args,
        context: MyContext
      ): Promise<CampaignsForHeroResponse> {
        return logErrorsForResolver(context.req, () =>
          campaignsForHeroResolver(context)
        );
      },
      type: gqlNonNull(CampaignsForHeroResponseGqlType),
    },
    campaignsForUser: {
      args: {
        input: { type: gqlNonNull(CampaignsForUserInputGqlType) },
      },
      description:
        "Name is a bit misleading—these are the campaigns the user has created",
      resolve: () => ({}),
      type: gqlNonNull(CampaignsForUserResponseGqlType),
    },
    campaignsWhereUserIsActiveSupporter: {
      args: {
        input: {
          type: gqlNonNull(CampaignsWhereUserIsActiveSupporterInputGqlType),
        },
      },
      description:
        "Campaigns the user is an active supporter of, i.e. campaigns the user is currently a part of " +
        "(a user is part of a campaign if they hold one of the campaign's NFTs). " +
        "A user is NOT an active supporter if they initially supported a campaign by buying " +
        "an NFT, but later sold or transferred the NFT.",
      resolve: () => ({}),
      type: gqlNonNull(CampaignsWhereUserIsActiveSupporterResponseGqlType),
    },
  },
  name: Typename.CampaignsNamespaceQueryResponse,
});

export default CampaignsNamespaceQueryResponseGqlType;
