import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import refundableAmountsResolver from "src/resolvers/query/refundableAmountsResolver";
import RefundableAmountsInputGqlType from "src/schema/input/RefundableAmountsInputGqlType";
import RefundableAmountsResponseGqlType from "src/schema/object/response/RefundableAmountsResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  OpenBidsInput,
  RefundableAmountsResponse,
} from "src/__generated__/generated";

const refundableAmountsQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(RefundableAmountsInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input?: OpenBidsInput },
    context: MyContext
  ): Promise<RefundableAmountsResponse> {
    return logErrorsForResolver(context.req, () =>
      refundableAmountsResolver(context, input!)
    );
  },
  type: gqlNonNull(RefundableAmountsResponseGqlType),
};

export default refundableAmountsQueryField;
