import { GraphQLObjectType } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import editionsMerkleAllowlistInfoForMintResolver from "src/resolvers/query/nested/nft-queries/editionsMerkleAllowlistInfoForMintResolver";
import EditionsMerkleAllowlistInfoForMintInputGqlType from "src/schema/input/nft/EditionsMerkleAllowlistInfoForMintInputGqlType";
import EditionsMerkleAllowlistInfoForMintResponseGqlType from "src/schema/object/response/nft/EditionsMerkleAllowlistInfoForMintResponseGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  EditionsMerkleAllowlistInfoForMintInput,
  EditionsMerkleAllowlistInfoForMintResponse,
} from "src/__generated__/generated";

const NftQueriesResponseGqlType = new GraphQLObjectType({
  fields: {
    editionsMerkleAllowlistInfoForMint: {
      args: {
        input: {
          type: gqlNonNull(EditionsMerkleAllowlistInfoForMintInputGqlType),
        },
      },
      async resolve(
        _source,
        { input }: { input: EditionsMerkleAllowlistInfoForMintInput },
        context: MyContext
      ): Promise<EditionsMerkleAllowlistInfoForMintResponse> {
        return logErrorsForResolver(context.req, () =>
          editionsMerkleAllowlistInfoForMintResolver(context, input)
        );
      },
      type: gqlNonNull(EditionsMerkleAllowlistInfoForMintResponseGqlType),
    },
  },
  name: Typename.NftQueriesResponse,
});

export default NftQueriesResponseGqlType;
