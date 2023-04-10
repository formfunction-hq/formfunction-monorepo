import { GraphQLFieldConfig } from "graphql";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  UploadNftToArweaveInput,
  UploadNftToArweaveResponse,
} from "src/__generated__/generated";
import uploadNftToArweaveResolver from "src/resolvers/mutation/uploadNftToArweaveResolver";
import MyContext from "src/types/MyContext";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import UploadNftToArweaveInputGqlType from "src/schema/input/UploadNftToArweaveInputGqlType";
import UploadNftToArweaveResponseGqlType from "src/schema/object/UploadNftToArweaveResponseGqlType";

const uploadNftToArweaveMutationField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(UploadNftToArweaveInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input?: UploadNftToArweaveInput },
    context: MyContext
  ): Promise<UploadNftToArweaveResponse> {
    return logErrorsForResolver(context.req, () =>
      uploadNftToArweaveResolver(context, input!)
    );
  },
  type: gqlNonNull(UploadNftToArweaveResponseGqlType),
};

export default uploadNftToArweaveMutationField;
