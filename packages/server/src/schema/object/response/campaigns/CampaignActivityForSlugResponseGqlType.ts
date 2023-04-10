import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import nftTransactionsForCampaignActivityConnectionResolver from "src/resolvers/query/nested/campaign-activity/nftTransactionsForCampaignActivityConnectionResolver";
import CampaignActivityForSlugInputGqlType from "src/schema/input/campaigns/CampaignActivityForSlugInputGqlType";
import NftTransactionsConnectionGqlType from "src/schema/object/pagination/NftTransactionsConnectionGqlType";
import PaginationAmountGqlType from "src/schema/scalar/PaginationAmountGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CampaignActivityForSlugInput,
  NftTransactionsConnection,
} from "src/__generated__/generated";

const CampaignActivityForSlugResponseGqlType = new GraphQLObjectType({
  fields: {
    campaignActivity: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(PaginationAmountGqlType) },

        // Application-specific
        input: { type: gqlNonNull(CampaignActivityForSlugInputGqlType) },
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
          input: CampaignActivityForSlugInput;
        },
        context: MyContext
      ): Promise<NftTransactionsConnection> {
        return logErrorsForResolver<NftTransactionsConnection>(
          context.req,
          () =>
            nftTransactionsForCampaignActivityConnectionResolver(
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
  name: Typename.CampaignActivityForSlugResponse,
});

export default CampaignActivityForSlugResponseGqlType;
