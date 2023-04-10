import { GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import MetadataAccountsConnectionGqlType from "src/schema/object/pagination/MetadataAccountsConnectionGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  MetadataAccountsConnection,
  MetadataAccountsCreatedInput,
} from "src/__generated__/generated";
import MetadataAccountsCreatedInputGqlType from "src/schema/input/MetadataAccountsCreatedInputGqlType";
import metadataAccountsCreatedConnectionResolver from "src/resolvers/query/nested/metadataAccountsCreatedConnectionResolver";
import PaginationAmountGqlType from "src/schema/scalar/PaginationAmountGqlType";

const MetadataAccountsCreatedResponseGqlType = new GraphQLObjectType({
  fields: {
    metadataAccounts: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(PaginationAmountGqlType) },

        // Application-specific
        input: { type: gqlNonNull(MetadataAccountsCreatedInputGqlType) },
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
          input: MetadataAccountsCreatedInput;
        },
        context: MyContext
      ): Promise<MetadataAccountsConnection> {
        return logErrorsForResolver(context.req, () =>
          metadataAccountsCreatedConnectionResolver(
            context,
            after ?? null,
            first,
            input
          )
        );
      },
      type: gqlNonNull(MetadataAccountsConnectionGqlType),
    },
  },
  name: Typename.MetadataAccountsCreatedResponse,
});

export default MetadataAccountsCreatedResponseGqlType;
