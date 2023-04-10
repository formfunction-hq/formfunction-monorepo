import { GraphQLFieldConfig } from "graphql";
import NftPageExtrasInputGqlType from "src/schema/input/NftPageExtrasInputGqlType";
import NftPageExtrasResponseGqlType from "src/schema/object/response/NftPageExtrasResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import { NftPageExtrasInput } from "src/__generated__/generated";

const nftPageExtrasQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(NftPageExtrasInputGqlType),
    },
  },
  resolve: async (_source, { input }: { input: NftPageExtrasInput }) => ({
    mint: input.mint,
  }),
  type: gqlNonNull(NftPageExtrasResponseGqlType),
};

export default nftPageExtrasQueryField;
