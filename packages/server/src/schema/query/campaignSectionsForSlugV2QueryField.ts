import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CampaignSectionsForSlugV2Input,
  CampaignSectionsForSlugV2Response,
} from "src/__generated__/generated";
import CampaignSectionsForSlugV2InputGqlType from "src/schema/input/campaigns/CampaignSectionsForSlugV2InputGqlType";
import CampaignSectionsForSlugV2ResponseGqlType from "src/schema/object/response/campaigns/CampaignSectionsForSlugV2ResponseGqlType";
import campaignSectionsForSlugV2Resolver from "src/resolvers/query/campaignSectionsForSlugV2Resolver";

const campaignSectionsForSlugV2QueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(CampaignSectionsForSlugV2InputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input: CampaignSectionsForSlugV2Input },
    context: MyContext
  ): Promise<CampaignSectionsForSlugV2Response> {
    return logErrorsForResolver(context.req, () =>
      campaignSectionsForSlugV2Resolver(input)
    );
  },
  type: gqlNonNull(CampaignSectionsForSlugV2ResponseGqlType),
};

export default campaignSectionsForSlugV2QueryField;
