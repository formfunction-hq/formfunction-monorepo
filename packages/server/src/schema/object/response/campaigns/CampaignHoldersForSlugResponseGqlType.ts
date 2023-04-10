import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { GraphQLObjectType } from "graphql";
import DEFAULT_CONNECTION_PARAMS_V2 from "src/constants/graphql/DefaultConnectionParamsV2";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import campaignHoldersForSlugResolver from "src/resolvers/query/nested/campaigns/campaignHoldersForSlugResolver";
import CampaignHoldersForSlugInputGqlType from "src/schema/input/campaigns/CampaignHoldersForSlugInputGqlType";
import CampaignFundingTierHoldersGqlType from "src/schema/object/campaigns/CampaignHoldersInfo";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CampaignHoldersForSlugInput,
  HolderConnection,
} from "src/__generated__/generated";
import campaignHoldersByFundingTierForSlugResolver from "src/resolvers/query/nested/campaigns/campaignHoldersByFundingTierForSlugResolver";
import HolderConnectionGqlType from "src/schema/object/pagination/HolderConnectionGqlType";

const CampaignHoldersForSlugResponseGqlType = new GraphQLObjectType({
  fields: {
    holders: {
      args: {
        ...DEFAULT_CONNECTION_PARAMS_V2,
        input: { type: gqlNonNull(CampaignHoldersForSlugInputGqlType) },
      },
      async resolve(
        _source,
        {
          after,
          first,
          input,
        }: {
          after?: Maybe<string>;
          first: number;
          input: CampaignHoldersForSlugInput;
        },
        context: MyContext
      ): Promise<HolderConnection> {
        return logErrorsForResolver(context.req, () =>
          campaignHoldersForSlugResolver(context, after ?? null, first, input)
        );
      },
      type: gqlNonNull(HolderConnectionGqlType),
    },
    holdersByFundingTier: {
      args: {
        input: { type: gqlNonNull(CampaignHoldersForSlugInputGqlType) },
      },
      resolve: (
        _source,
        { input }: { input: CampaignHoldersForSlugInput },
        context: MyContext
      ) =>
        logErrorsForResolver(context.req, () =>
          campaignHoldersByFundingTierForSlugResolver(input, context)
        ),
      type: gqlListOfNonNull(CampaignFundingTierHoldersGqlType),
    },
  },
  name: Typename.CampaignHoldersForSlugResponse,
});

export default CampaignHoldersForSlugResponseGqlType;
