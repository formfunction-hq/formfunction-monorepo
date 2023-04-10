import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  NftOffersForUserConnection,
  NftOffersForUserInput,
} from "src/__generated__/generated";
import NftOffersForUserInputGqlType from "src/schema/input/NftOffersForUserInputGqlType";
import nftOffersForUserConnectionResolver from "src/resolvers/query/nested/nftOffersForUserConnectionResolver";
import NftOffersForUserConnectionGqlType from "src/schema/object/pagination/NftOffersForUserConnectionGqlType";

const NftOffersForUserResponseGqlType = new GraphQLObjectType({
  fields: {
    nftOffers: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(GraphQLInt) },

        // Application-specific
        input: { type: gqlNonNull(NftOffersForUserInputGqlType) },
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
          input?: NftOffersForUserInput;
        },
        context: MyContext
      ): Promise<NftOffersForUserConnection> {
        return logErrorsForResolver<NftOffersForUserConnection>(
          context.req,
          () =>
            nftOffersForUserConnectionResolver(
              context,
              after ?? null,
              first!,
              input!
            )
        );
      },
      type: gqlNonNull(NftOffersForUserConnectionGqlType),
    },
  },
  name: Typename.NftOffersForUserResponse,
});

export default NftOffersForUserResponseGqlType;
