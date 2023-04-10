import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import bidToCancelResolver from "src/resolvers/query/bidToCancelResolver";
import BidToCancelInputGqlType from "src/schema/input/BidToCancelInputGqlType";
import NftTransactionGqlType from "src/schema/object/NftTransactionGqlType";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  BidToCancelInput,
  NftTransactionExpress,
} from "src/__generated__/generated";

const bidToCancelQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(BidToCancelInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input?: BidToCancelInput },
    context: MyContext
  ): Promise<Maybe<NftTransactionExpress>> {
    return logErrorsForResolver(context.req, () => bidToCancelResolver(input!));
  },
  type: NftTransactionGqlType,
};

export default bidToCancelQueryField;
