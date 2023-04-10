import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import dismissUnlockableWinnerCreatorSeeInfoCtaResolver from "src/resolvers/mutation/dismissUnlockableWinnerCreatorSeeInfoCtaResolver";
import DismissUnlockableWinnerCreatorSeeInfoCtaInputGqlType from "src/schema/input/DismissUnlockableWinnerCreatorSeeInfoCtaInputGqlType";
import UpdateUnlockableWinnerResponseGqlType from "src/schema/object/response/UpdateUnlockableWinnerResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  DismissUnlockableWinnerCreatorSeeInfoCtaInput,
  UpdateUnlockableWinnerResponse,
} from "src/__generated__/generated";

const dismissUnlockableWinnerCreatorSeeInfoCtaMutationField: GraphQLFieldConfig<
  unknown,
  any
> = {
  args: {
    input: {
      type: gqlNonNull(DismissUnlockableWinnerCreatorSeeInfoCtaInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input: DismissUnlockableWinnerCreatorSeeInfoCtaInput },
    context: MyContext
  ): Promise<UpdateUnlockableWinnerResponse> {
    return logErrorsForResolver(context.req, () =>
      dismissUnlockableWinnerCreatorSeeInfoCtaResolver(context, input)
    );
  },
  type: gqlNonNull(UpdateUnlockableWinnerResponseGqlType),
};

export default dismissUnlockableWinnerCreatorSeeInfoCtaMutationField;
