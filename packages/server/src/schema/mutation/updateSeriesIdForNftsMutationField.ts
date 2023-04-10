import { GraphQLFieldConfig, GraphQLInt, GraphQLString } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import updateSeriesIdForNftsResolver from "src/resolvers/mutation/updateSeriesIdForNftsResolver";
import UpdateSeriesIdForNftsInputGqlType from "src/schema/input/UpdateSeriesIdForNftsInputGqlType";
import UpdateSeriesIdForNftsResponseGqlType from "src/schema/object/response/UpdateSeriesIdForNftsResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  UpdateSeriesIdForNftsInput,
  UpdateSeriesIdForNftsResponse,
} from "src/__generated__/generated";

const updateSeriesIdForNftsMutationField: GraphQLFieldConfig<unknown, any> = {
  args: {
    // Connection-specific
    after: { type: GraphQLString },
    first: { type: gqlNonNull(GraphQLInt) },

    input: {
      type: gqlNonNull(UpdateSeriesIdForNftsInputGqlType),
    },
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
      input?: UpdateSeriesIdForNftsInput;
    },
    context: MyContext
  ): Promise<UpdateSeriesIdForNftsResponse> {
    return logErrorsForResolver(context.req, () =>
      updateSeriesIdForNftsResolver(context, after ?? null, first!, input!)
    );
  },
  type: UpdateSeriesIdForNftsResponseGqlType,
};

export default updateSeriesIdForNftsMutationField;
