import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import EditionsForMasterEditionMintInputGqlType from "src/schema/input/EditionsForMasterEditionMintInputGqlType";
import editionsForMasterEditionMintConnectionResolver from "src/resolvers/query/nested/editionsForMasterEditionMintConnectionResolver";
import {
  EditionsForMasterEditionMintInput,
  MetadataAccountsConnection,
} from "src/__generated__/generated";
import MetadataAccountsConnectionGqlType from "src/schema/object/pagination/MetadataAccountsConnectionGqlType";

const EditionsForMasterEditionMintResponseGqlType = new GraphQLObjectType({
  fields: {
    editions: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(GraphQLInt) },

        // Application-specific
        input: { type: gqlNonNull(EditionsForMasterEditionMintInputGqlType) },
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
          input: EditionsForMasterEditionMintInput;
        },
        context: MyContext
      ): Promise<MetadataAccountsConnection> {
        return logErrorsForResolver<MetadataAccountsConnection>(
          context.req,
          () =>
            editionsForMasterEditionMintConnectionResolver(
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
  name: Typename.EditionsForMasterEditionMintResponse,
});

export default EditionsForMasterEditionMintResponseGqlType;
