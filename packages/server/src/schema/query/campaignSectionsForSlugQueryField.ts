import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CampaignSectionsForSlugInput,
  CampaignSectionsForSlugResponse,
} from "src/__generated__/generated";
import CampaignSectionsForSlugInputGqlType from "src/schema/input/campaigns/CampaignSectionsForSlugInputGqlType";
import CampaignSectionsForSlugResponseGqlType from "src/schema/object/response/campaigns/CampaignSectionsForSlugResponseGqlType";
import campaignSectionsForSlugResolver from "src/resolvers/query/campaignSectionsForSlugResolver";

const campaignSectionsForSlugQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(CampaignSectionsForSlugInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input: CampaignSectionsForSlugInput },
    context: MyContext
  ): Promise<CampaignSectionsForSlugResponse> {
    return logErrorsForResolver(context.req, () =>
      campaignSectionsForSlugResolver(input)
    );
  },
  type: gqlNonNull(CampaignSectionsForSlugResponseGqlType),
};

export default campaignSectionsForSlugQueryField;
