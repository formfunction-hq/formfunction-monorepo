import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import campaignV2ActivityForSlugConnectionResolver from "src/resolvers/query/nested/campaign-activity/campaignV2ActivityForSlugConnectionResolver";
import CampaignV2ActivityForSlugInputGqlType from "src/schema/input/campaigns/CampaignV2ActivityForSlugInputGqlType";
import NftTransactionsConnectionGqlType from "src/schema/object/pagination/NftTransactionsConnectionGqlType";
import PaginationAmountGqlType from "src/schema/scalar/PaginationAmountGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CampaignV2ActivityForSlugInput,
  NftTransactionsConnection,
} from "src/__generated__/generated";

const CampaignV2ActivityForSlugResponseGqlType = new GraphQLObjectType({
  fields: {
    campaignActivity: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(PaginationAmountGqlType) },

        // Application-specific
        input: { type: gqlNonNull(CampaignV2ActivityForSlugInputGqlType) },
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
          input: CampaignV2ActivityForSlugInput;
        },
        context: MyContext
      ): Promise<NftTransactionsConnection> {
        return logErrorsForResolver<NftTransactionsConnection>(
          context.req,
          () =>
            campaignV2ActivityForSlugConnectionResolver(
              context,
              after ?? null,
              first,
              input
            )
        );
      },
      type: NftTransactionsConnectionGqlType,
    },
  },
  name: Typename.CampaignV2ActivityForSlugResponse,
});

export default CampaignV2ActivityForSlugResponseGqlType;
