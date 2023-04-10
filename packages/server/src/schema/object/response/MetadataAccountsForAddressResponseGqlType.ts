import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import metadataAccountsForAddressConnectionResolver from "src/resolvers/query/nested/metadataAccountsForAddressConnectionResolver";
import NftStatusGqlType from "src/schema/enum/NftStatusGqlType";
import MetadataAccountsConnectionGqlType from "src/schema/object/pagination/MetadataAccountsConnectionGqlType";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  MetadataAccountsConnection,
  NftStatusExpress_Enum,
} from "src/__generated__/generated";

const MetadataAccountsForAddressResponseGqlType = new GraphQLObjectType({
  fields: {
    metadataAccounts: {
      args: {
        // Application-specific
        address: { type: gqlNonNull(PublicKeyScalarGqlType) },
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(GraphQLInt) },
        status: { type: NftStatusGqlType },
      },
      async resolve(
        _source,
        {
          after,
          first,
          address,
          status,
        }: {
          address?: string;
          after?: Maybe<string>;
          first?: number;
          status?: Maybe<NftStatusExpress_Enum>;
        },
        context: MyContext
      ): Promise<MetadataAccountsConnection> {
        return logErrorsForResolver(context.req, () =>
          metadataAccountsForAddressConnectionResolver(
            context,
            after ?? null,
            first!,
            address!,
            status ?? null
          )
        );
      },
      type: gqlNonNull(MetadataAccountsConnectionGqlType),
    },
  },
  name: Typename.MetadataAccountsForAddressResponse,
});

export default MetadataAccountsForAddressResponseGqlType;
