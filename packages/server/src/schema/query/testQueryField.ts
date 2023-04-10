import { GraphQLFieldConfig } from "graphql";
import NftStatusGqlType from "src/schema/enum/NftStatusGqlType";
import { NftStatusExpress_Enum } from "src/__generated__/generated";

const testQueryField: GraphQLFieldConfig<unknown, any> = {
  async resolve(_source, _args): Promise<NftStatusExpress_Enum> {
    return NftStatusExpress_Enum.Auction;
  },
  type: NftStatusGqlType,
};

export default testQueryField;
