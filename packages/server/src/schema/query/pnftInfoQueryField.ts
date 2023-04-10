import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import pnftInfoResolver from "src/resolvers/query/pnftInfoResolver";
import PnftInfoInputGqlType from "src/schema/input/PnftInfoInputGqlType";
import PnftInfoResponseGqlType from "src/schema/object/response/PnftInfoResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import { PnftInfoInput, PnftInfoResponse } from "src/__generated__/generated";

const pnftInfoQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(PnftInfoInputGqlType),
    },
  },
  description:
    "This is a convenience query which lets you fetch a pNFT MetadataAccount given the original auction NFT mint.",
  async resolve(
    _source,
    { input }: { input: PnftInfoInput },
    context: MyContext
  ): Promise<PnftInfoResponse> {
    return logErrorsForResolver(context.req, () => pnftInfoResolver(input));
  },
  type: gqlNonNull(PnftInfoResponseGqlType),
};

export default pnftInfoQueryField;
