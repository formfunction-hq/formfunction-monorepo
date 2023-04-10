import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import MetadataAccountsConnectionGqlType from "src/schema/object/pagination/MetadataAccountsConnectionGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  MetadataAccountsCollectedInput,
  MetadataAccountsConnection,
} from "src/__generated__/generated";
import MetadataAccountsCollectedInputGqlType from "src/schema/input/MetadataAccountsCollectedInputGqlType";
import metadataAccountsCollectedConnectionResolver from "src/resolvers/query/nested/metadataAccountsCollectedConnectionResolver";
import metadataAccountsCollectedAndListedConnectionResolver from "src/resolvers/query/nested/metadataAccountsCollectedAndListedConnectionResolver";

const MetadataAccountsCollectedResponseGqlType = new GraphQLObjectType({
  fields: {
    metadataAccounts: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(GraphQLInt) },

        // Application-specific
        input: { type: gqlNonNull(MetadataAccountsCollectedInputGqlType) },
      },
      description:
        "Returns the union of the following: " +
        "1) The user collected the NFT (won an auction, instant sale, etc.) and " +
        "2) The user currently owns the NFT.",
      async resolve(
        _source,
        {
          after,
          first,
          input,
        }: {
          after?: Maybe<string>;
          first: number;
          input: MetadataAccountsCollectedInput;
        },
        context: MyContext
      ): Promise<MetadataAccountsConnection> {
        return logErrorsForResolver(context.req, () =>
          metadataAccountsCollectedConnectionResolver(
            context,
            after ?? null,
            first,
            input
          )
        );
      },
      type: gqlNonNull(MetadataAccountsConnectionGqlType),
    },
    metadataAccountsListedByUser: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(GraphQLInt) },

        // Application-specific
        input: { type: gqlNonNull(MetadataAccountsCollectedInputGqlType) },
      },
      description:
        "Returns the NFTs that the user owns and that are currently listed.",
      async resolve(
        _source,
        {
          after,
          first,
          input,
        }: {
          after?: Maybe<string>;
          first: number;
          input: MetadataAccountsCollectedInput;
        },
        context: MyContext
      ): Promise<MetadataAccountsConnection> {
        return logErrorsForResolver(context.req, () =>
          metadataAccountsCollectedAndListedConnectionResolver(
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
  name: Typename.MetadataAccountsCollectedResponse,
});

export default MetadataAccountsCollectedResponseGqlType;
