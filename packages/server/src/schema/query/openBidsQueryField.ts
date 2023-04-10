import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import openBidsResolver from "src/resolvers/query/openBidsResolver";
import OpenBidsInputGqlType from "src/schema/input/OpenBidsInputGqlType";
import OpenBidGqlType from "src/schema/object/OpenBidGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import { OpenBid, OpenBidsInput } from "src/__generated__/generated";

const openBidsQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(OpenBidsInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input?: OpenBidsInput },
    context: MyContext
  ): Promise<Array<OpenBid>> {
    return logErrorsForResolver(context.req, () => openBidsResolver(input!));
  },
  type: gqlNonNullListOfNonNull(OpenBidGqlType),
};

export default openBidsQueryField;
