import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  NftOffersInput,
  NftOffersConnection,
} from "src/__generated__/generated";
import NftOffersInputGqlType from "src/schema/input/NftOffersInputGqlType";
import NftOffersConnectionGqlType from "src/schema/object/pagination/NftOffersConnectionGqlType";
import nftOffersConnectionResolver from "src/resolvers/query/nested/nftOffersConnectionResolver";

const NftOffersResponseGqlType = new GraphQLObjectType({
  fields: {
    nftOffers: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(GraphQLInt) },

        // Application-specific
        input: { type: gqlNonNull(NftOffersInputGqlType) },
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
          input?: NftOffersInput;
        },
        context: MyContext
      ): Promise<NftOffersConnection> {
        return logErrorsForResolver<NftOffersConnection>(context.req, () =>
          nftOffersConnectionResolver(context, after ?? null, first!, input!)
        );
      },
      type: gqlNonNull(NftOffersConnectionGqlType),
    },
  },
  name: Typename.NftOffersResponse,
});

export default NftOffersResponseGqlType;
