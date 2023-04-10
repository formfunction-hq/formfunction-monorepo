import { GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import MetadataAccountsConnectionGqlType from "src/schema/object/pagination/MetadataAccountsConnectionGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  MetadataAccountsAvailableToAddToCampaignInput,
  MetadataAccountsConnection,
} from "src/__generated__/generated";
import MetadataAccountsAvailableToAddToCampaignInputGqlType from "src/schema/input/MetadataAccountsAvailableToAddToCampaignInputGqlType";
import metadataAccountsAvailableToAddToCampaignConnectionResolver from "src/resolvers/query/nested/metadataAccountsAvailableToAddToCampaignConnectionResolver";
import PaginationAmountGqlType from "src/schema/scalar/PaginationAmountGqlType";

const MetadataAccountsAvailableToAddToCampaignResponseGqlType =
  new GraphQLObjectType({
    fields: {
      metadataAccounts: {
        args: {
          // Connection-specific
          after: { type: GraphQLString },
          first: { type: gqlNonNull(PaginationAmountGqlType) },

          // Application-specific
          input: {
            type: gqlNonNull(
              MetadataAccountsAvailableToAddToCampaignInputGqlType
            ),
          },
        },
        async resolve(
          _source,
          {
            after,
            first,
            input,
          }: {
            after?: Maybe<string>;
            first?: number;
            input?: MetadataAccountsAvailableToAddToCampaignInput;
          },
          context: MyContext
        ): Promise<MetadataAccountsConnection> {
          return logErrorsForResolver(context.req, () =>
            metadataAccountsAvailableToAddToCampaignConnectionResolver(
              context,
              after ?? null,
              first!,
              input!
            )
          );
        },
        type: gqlNonNull(MetadataAccountsConnectionGqlType),
      },
    },
    name: Typename.MetadataAccountsAvailableToAddToCampaignResponse,
  });

export default MetadataAccountsAvailableToAddToCampaignResponseGqlType;
