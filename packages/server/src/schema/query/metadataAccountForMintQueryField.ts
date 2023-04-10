import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import metadataAccountForMintResolver from "src/resolvers/query/metadataAccountForMintResolver";
import MetadataAccountForMintInputGqlType from "src/schema/input/MetadataAccountForMintInputGqlType";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  MetadataAccount,
  MetadataAccountForMintInput,
} from "src/__generated__/generated";

const metadataAccountForMintQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: {
      type: gqlNonNull(MetadataAccountForMintInputGqlType),
    },
  },
  async resolve(
    _source,
    { input }: { input?: MetadataAccountForMintInput },
    context: MyContext
  ): Promise<Maybe<MetadataAccount>> {
    return logErrorsForResolver(context.req, () =>
      metadataAccountForMintResolver(context, input!)
    );
  },
  type: MetadataAccountGqlType,
};

export default metadataAccountForMintQueryField;
