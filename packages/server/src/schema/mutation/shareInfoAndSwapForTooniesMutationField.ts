import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import shareInfoAndSwapForTooniesResolver from "src/resolvers/mutation/shareInfoAndSwapForTooniesResolver";
import ShareInfoAndSwapForTooniesInputGqlType from "src/schema/input/ShareInfoAndSwapForTooniesInputGqlType";
import ShareInfoAndSwapForTooniesResponseGqlType from "src/schema/object/response/ShareInfoAndSwapForTooniesResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  ShareInfoAndSwapForTooniesInput,
  ShareInfoAndSwapForTooniesResponse,
} from "src/__generated__/generated";

const shareInfoAndSwapForTooniesMutationField: GraphQLFieldConfig<
  unknown,
  any
> = {
  args: {
    input: {
      type: gqlNonNull(ShareInfoAndSwapForTooniesInputGqlType),
    },
  },
  async resolve(
    _source,
    {
      input,
    }: {
      input?: ShareInfoAndSwapForTooniesInput;
    },
    context: MyContext
  ): Promise<ShareInfoAndSwapForTooniesResponse> {
    return logErrorsForResolver(context.req, () =>
      shareInfoAndSwapForTooniesResolver(context, input!)
    );
  },
  type: gqlNonNull(ShareInfoAndSwapForTooniesResponseGqlType),
};

export default shareInfoAndSwapForTooniesMutationField;
