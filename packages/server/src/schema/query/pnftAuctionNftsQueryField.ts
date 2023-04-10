import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import pnftAuctionNftsResolver from "src/resolvers/query/pnftAuctionNftsResolver";
import PnftAuctionNftsInputGqlType from "src/schema/input/PnftAuctionNftsInputGqlType";
import PnftAuctionNftsResponseGqlType from "src/schema/object/response/PnftAuctionNftsResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  PnftAuctionNftsInput,
  PnftAuctionNftsResponse,
} from "src/__generated__/generated";

const pnftAuctionNftsQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(PnftAuctionNftsInputGqlType),
    },
  },
  description:
    "This query returns a list of MetadataAccounts of all the NFTs which have listed the input masterEditionPnftId as a participation NFT in an auction.",
  async resolve(
    _source,
    { input }: { input: PnftAuctionNftsInput },
    context: MyContext
  ): Promise<PnftAuctionNftsResponse> {
    return logErrorsForResolver(context.req, () =>
      pnftAuctionNftsResolver(input)
    );
  },
  type: gqlNonNull(PnftAuctionNftsResponseGqlType),
};

export default pnftAuctionNftsQueryField;
