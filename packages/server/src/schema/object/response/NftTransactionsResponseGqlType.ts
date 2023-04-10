import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import nftTransactionsConnectionResolver from "src/resolvers/query/nested/nftTransactionsConnectionResolver";
import NftTransactionsInputGqlType from "src/schema/input/NftTransactionsInputGqlType";
import NftTransactionsConnectionGqlType from "src/schema/object/pagination/NftTransactionsConnectionGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  NftTransactionsConnection,
  NftTransactionsInput,
} from "src/__generated__/generated";

const NftTransactionsResponseGqlType = new GraphQLObjectType({
  fields: {
    nftTransactions: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(GraphQLInt) },

        // Application-specific
        input: { type: gqlNonNull(NftTransactionsInputGqlType) },
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
          input?: NftTransactionsInput;
        },
        context: MyContext
      ): Promise<NftTransactionsConnection> {
        return logErrorsForResolver<NftTransactionsConnection>(
          context.req,
          () =>
            nftTransactionsConnectionResolver(
              context,
              after ?? null,
              first!,
              input!
            )
        );
      },
      type: gqlNonNull(NftTransactionsConnectionGqlType),
    },
  },
  name: Typename.NftTransactionsResponse,
});

export default NftTransactionsResponseGqlType;
