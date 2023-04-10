import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import metadataAccountsForCampaignSectionConnectionResolver from "src/resolvers/query/nested/campaign-section/metadataAccountsForCampaignSectionConnectionResolver";
import ICampaignSectionV2GqlType, {
  ICAMPAIGN_SECTION_V2_FIELDS,
} from "src/schema/interface/ICampaignSectionV2GqlType";
import MetadataAccountsConnectionGqlType from "src/schema/object/pagination/MetadataAccountsConnectionGqlType";
import PaginationAmountGqlType from "src/schema/scalar/PaginationAmountGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import { MetadataAccountsConnection } from "src/__generated__/generated";

const CampaignSectionWithNftsGqlType = new GraphQLObjectType({
  description: "Campaign section with NFTs as the funding type",
  fields: {
    ...ICAMPAIGN_SECTION_V2_FIELDS,
    metadataAccounts: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(PaginationAmountGqlType) },
      },
      async resolve(
        source,
        {
          after,
          first,
        }: {
          after?: Maybe<string>;
          first: number;
        },
        context: MyContext
      ): Promise<MetadataAccountsConnection> {
        return logErrorsForResolver<MetadataAccountsConnection>(
          context.req,
          () =>
            metadataAccountsForCampaignSectionConnectionResolver(
              context,
              after ?? null,
              first,
              source.nftMints
            )
        );
      },
      type: MetadataAccountsConnectionGqlType,
    },
  },
  interfaces: [ICampaignSectionV2GqlType],
  name: Typename.CampaignSectionWithNfts,
});

export default CampaignSectionWithNftsGqlType;
