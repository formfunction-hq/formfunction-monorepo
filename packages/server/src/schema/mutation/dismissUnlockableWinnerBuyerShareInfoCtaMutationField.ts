import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import dismissUnlockableWinnerBuyerShareInfoCtaResolver from "src/resolvers/mutation/dismissUnlockableWinnerBuyerShareInfoCtaResolver";
import DismissUnlockableWinnerBuyerShareInfoCtaInputGqlType from "src/schema/input/DismissUnlockableWinnerBuyerShareInfoCtaInputGqlType";
import UpdateUnlockableWinnerResponseGqlType from "src/schema/object/response/UpdateUnlockableWinnerResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  DismissUnlockableWinnerBuyerShareInfoCtaInput,
  UpdateUnlockableWinnerResponse,
} from "src/__generated__/generated";

const dismissUnlockableWinnerBuyerShareInfoCtaMutationField: GraphQLFieldConfig<
  unknown,
  any
> = {
  args: {
    input: {
      type: gqlNonNull(DismissUnlockableWinnerBuyerShareInfoCtaInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input: DismissUnlockableWinnerBuyerShareInfoCtaInput },
    context: MyContext
  ): Promise<UpdateUnlockableWinnerResponse> {
    return logErrorsForResolver(context.req, () =>
      dismissUnlockableWinnerBuyerShareInfoCtaResolver(context, input)
    );
  },
  type: gqlNonNull(UpdateUnlockableWinnerResponseGqlType),
};

export default dismissUnlockableWinnerBuyerShareInfoCtaMutationField;
