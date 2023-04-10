import { GraphQLBoolean, GraphQLObjectType } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import viewerHasOpenOffersResolver from "src/resolvers/query/nested/nftPageExtras/viewerHasOpenOffersResolver";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const NftPageExtrasResponseGqlType = new GraphQLObjectType({
  fields: {
    viewerHasOpenOffersPlaced: {
      async resolve(
        source: { mint: string },
        _args,
        context: MyContext
      ): Promise<boolean> {
        return logErrorsForResolver<boolean>(context.req, () =>
          viewerHasOpenOffersResolver(context, source.mint)
        );
      },
      type: gqlNonNull(GraphQLBoolean),
    },
  },
  name: Typename.NftPageExtrasResponse,
});

export default NftPageExtrasResponseGqlType;
