import { GraphQLFieldConfig, GraphQLString } from "graphql";
import getPrisma from "src/utils/prisma/getPrisma";

const test2QueryField: GraphQLFieldConfig<unknown, any> = {
  async resolve(_source, _args): Promise<string> {
    const prisma = getPrisma();

    const nft = await prisma.nft.findFirst();
    return nft?.id ?? "no nfts";
  },
  type: GraphQLString,
};

export default test2QueryField;
