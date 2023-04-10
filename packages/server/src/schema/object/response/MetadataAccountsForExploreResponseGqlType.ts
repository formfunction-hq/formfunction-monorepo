import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import metadataAccountsForExploreConnectionResolver from "src/resolvers/query/nested/explore/metadataAccountsForExploreConnectionResolver";
import MetadataAccountsForExploreInputGqlType from "src/schema/input/MetadataAccountsForExploreInputGqlType";
import MetadataAccountsConnectionGqlType from "src/schema/object/pagination/MetadataAccountsConnectionGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  MetadataAccountsConnection,
  MetadataAccountsForExploreInput,
} from "src/__generated__/generated";

const MetadataAccountsForExploreResponseGqlType = new GraphQLObjectType({
  fields: {
    metadataAccounts: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(GraphQLInt) },

        // Application-specific
        input: { type: gqlNonNull(MetadataAccountsForExploreInputGqlType) },
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
          input?: MetadataAccountsForExploreInput;
        },
        context: MyContext
      ): Promise<MetadataAccountsConnection> {
        return logErrorsForResolver(context.req, () =>
          metadataAccountsForExploreConnectionResolver(
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
  name: Typename.MetadataAccountsForExploreResponse,
});

export default MetadataAccountsForExploreResponseGqlType;
