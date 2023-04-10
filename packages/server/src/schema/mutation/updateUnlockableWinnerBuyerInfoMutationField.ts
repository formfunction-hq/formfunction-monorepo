import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import updateUnlockableWinnerBuyerInfoResolver from "src/resolvers/mutation/updateUnlockableWinnerBuyerInfoResolver";
import UpdateUnlockableWinnerBuyerInfoInputGqlType from "src/schema/input/UpdateUnlockableWinnerBuyerInfoInputGqlType";
import UpdateUnlockableWinnerResponseGqlType from "src/schema/object/response/UpdateUnlockableWinnerResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  UpdateUnlockableWinnerBuyerInfoInput,
  UpdateUnlockableWinnerResponse,
} from "src/__generated__/generated";

const updateUnlockableWinnerBuyerInfoMutationField: GraphQLFieldConfig<
  unknown,
  any
> = {
  args: {
    input: {
      type: gqlNonNull(UpdateUnlockableWinnerBuyerInfoInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input: UpdateUnlockableWinnerBuyerInfoInput },
    context: MyContext
  ): Promise<UpdateUnlockableWinnerResponse> {
    return logErrorsForResolver(context.req, () =>
      updateUnlockableWinnerBuyerInfoResolver(context, input)
    );
  },
  type: gqlNonNull(UpdateUnlockableWinnerResponseGqlType),
};

export default updateUnlockableWinnerBuyerInfoMutationField;
