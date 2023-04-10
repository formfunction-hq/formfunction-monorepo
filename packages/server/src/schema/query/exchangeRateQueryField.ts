import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import exchangeRateResolver from "src/resolvers/query/exchangeRateResolver";
import ExchangeRateInputGqlType from "src/schema/input/ExchangeRateInputGqlType";
import ExchangeRateResponseGqlType from "src/schema/object/response/ExchangeRateResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  ExchangeRateInput,
  ExchangeRateResponse,
} from "src/__generated__/generated";

const exchangeRateQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(ExchangeRateInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input: ExchangeRateInput },
    context: MyContext
  ): Promise<ExchangeRateResponse> {
    return logErrorsForResolver(context.req, () =>
      exchangeRateResolver(context, input)
    );
  },
  type: gqlNonNull(ExchangeRateResponseGqlType),
};

export default exchangeRateQueryField;
