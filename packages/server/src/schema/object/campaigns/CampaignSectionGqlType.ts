import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import metadataAccountsForCampaignSectionConnectionResolver from "src/resolvers/query/nested/campaign-section/metadataAccountsForCampaignSectionConnectionResolver";
import MetadataAccountsConnectionGqlType from "src/schema/object/pagination/MetadataAccountsConnectionGqlType";
import PaginationAmountGqlType from "src/schema/scalar/PaginationAmountGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import { MetadataAccountsConnection } from "src/__generated__/generated";

const CampaignSectionGqlType = new GraphQLObjectType({
  fields: {
    benefits: {
      description:
        "A list of benefits collectors receive for supporting the campaign " +
        "via this section",
      type: gqlNonNullListOfNonNull(GraphQLString),
    },
    description: { type: gqlNonNull(GraphQLString) },
    id: { type: gqlNonNull(GraphQLID) },
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
    title: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.CampaignSection,
});

export default CampaignSectionGqlType;
