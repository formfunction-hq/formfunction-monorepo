import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import MetadataAccountsConnectionGqlType from "src/schema/object/pagination/MetadataAccountsConnectionGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  MetadataAccountsConnection,
  MetadataAccountsForSeriesInput,
} from "src/__generated__/generated";
import metadataAccountsForSeriesConnectionResolver from "src/resolvers/query/nested/metadataAccountsForSeriesConnectionResolver";
import MetadataAccountForSeriesInputGqlType from "src/schema/input/MetadataAccountsForSeriesInputGqlType";

const MetadataAccountsForSeriesResponseGqlType = new GraphQLObjectType({
  fields: {
    metadataAccounts: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(GraphQLInt) },

        // Application-specific
        input: { type: gqlNonNull(MetadataAccountForSeriesInputGqlType) },
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
          input: MetadataAccountsForSeriesInput;
        },
        context: MyContext
      ): Promise<MetadataAccountsConnection> {
        return logErrorsForResolver(context.req, () =>
          metadataAccountsForSeriesConnectionResolver(
            context,
            after ?? null,
            first!,
            input
          )
        );
      },
      type: gqlNonNull(MetadataAccountsConnectionGqlType),
    },
  },
  name: Typename.MetadataAccountsForSeriesResponse,
});

export default MetadataAccountsForSeriesResponseGqlType;
