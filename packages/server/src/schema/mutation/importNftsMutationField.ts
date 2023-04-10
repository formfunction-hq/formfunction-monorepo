import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import importNftsResolver from "src/resolvers/mutation/importNftsResolver";
import ImportNftsInputGqlType from "src/schema/input/ImportNftsInputGqlType";
import ImportNftsResponseGqlType from "src/schema/object/response/ImportNftsResponseGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  ImportNftsInput,
  ImportNftsResponse,
} from "src/__generated__/generated";

const importNftsMutationField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(ImportNftsInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input?: ImportNftsInput },
    context: MyContext
  ): Promise<ImportNftsResponse> {
    return logErrorsForResolver(context.req, () =>
      importNftsResolver(context, input!)
    );
  },
  type: gqlNonNull(ImportNftsResponseGqlType),
};

export default importNftsMutationField;
