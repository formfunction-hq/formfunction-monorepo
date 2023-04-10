import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import usersFeaturedResolver from "src/resolvers/query/usersFeaturedResolver";
import UserAndMetadataAccountsGqlType from "src/schema/object/UserAndMetadataAccountsGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import { UserAndMetadataAccounts } from "src/__generated__/generated";

const usersFeaturedQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {},
  async resolve(
    _source,
    _args,
    context: MyContext
  ): Promise<Array<UserAndMetadataAccounts>> {
    return logErrorsForResolver(context.req, () => usersFeaturedResolver());
  },
  type: gqlNonNullListOfNonNull(UserAndMetadataAccountsGqlType),
};

export default usersFeaturedQueryField;
