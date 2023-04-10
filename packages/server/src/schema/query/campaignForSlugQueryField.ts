import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CampaignForSlugInput,
  CampaignForSlugResponse,
} from "src/__generated__/generated";
import CampaignForSlugInputGqlType from "src/schema/input/campaigns/CampaignForSlugInputGqlType";
import CampaignForSlugResponseGqlType from "src/schema/object/response/campaigns/CampaignForSlugResponseGqlType";
import campaignForSlugResolver from "src/resolvers/query/campaignForSlugResolver";

const campaignForSlugQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(CampaignForSlugInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input: CampaignForSlugInput },
    context: MyContext
  ): Promise<CampaignForSlugResponse> {
    return logErrorsForResolver(context.req, () =>
      campaignForSlugResolver(input)
    );
  },
  type: gqlNonNull(CampaignForSlugResponseGqlType),
};

export default campaignForSlugQueryField;
