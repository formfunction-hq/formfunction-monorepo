import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import metadataAccountsForCampaignFundingTierStandardConnectionResolver from "src/resolvers/query/nested/campaigns/metadataAccountsForCampaignFundingTierStandardConnectionResolver";
import ICampaignFundingTierGqlType, {
  ICAMPAIGN_FUNDING_TIER_FIELDS,
} from "src/schema/interface/ICampaignFundingTierGqlType";
import MetadataAccountsConnectionGqlType from "src/schema/object/pagination/MetadataAccountsConnectionGqlType";
import PaginationAmountGqlType from "src/schema/scalar/PaginationAmountGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import { MetadataAccountsConnection } from "src/__generated__/generated";

const CampaignFundingTierStandardGqlType = new GraphQLObjectType({
  fields: {
    ...ICAMPAIGN_FUNDING_TIER_FIELDS,
    metadataAccounts: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(PaginationAmountGqlType) },
      },
      async resolve(
        source,
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          after,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          first,
        }: {
          after?: Maybe<string>;
          first: number;
        },
        context: MyContext
      ): Promise<Maybe<MetadataAccountsConnection>> {
        return logErrorsForResolver<Maybe<MetadataAccountsConnection>>(
          context.req,
          () =>
            metadataAccountsForCampaignFundingTierStandardConnectionResolver(
              context,
              after ?? null,
              first,
              source.id
            )
        );
      },
      type: MetadataAccountsConnectionGqlType,
    },
    nftOrder: { type: gqlListOfNonNull(GraphQLString) },
  },
  interfaces: [ICampaignFundingTierGqlType],
  name: Typename.CampaignFundingTierStandard,
});

export default CampaignFundingTierStandardGqlType;
