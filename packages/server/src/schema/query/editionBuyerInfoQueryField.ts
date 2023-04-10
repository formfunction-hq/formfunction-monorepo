import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import EditionBuyerInfoInputGqlType from "src/schema/input/EditionBuyerInfoInputGqlType";
import { GraphQLFieldConfig } from "graphql";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import { EditionBuyerInfoInput } from "src/__generated__/generated";
import editionBuyerInfoResolver from "src/resolvers/query/editionBuyerInfoResolver";
import EditionBuyerInfoResponseGqlType from "src/schema/object/response/EditionBuyerInfoResponseGqlType";

const editionBuyerInfoQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    input: { type: gqlNonNull(EditionBuyerInfoInputGqlType) },
  },
  async resolve(
    _source,
    { input }: { input: EditionBuyerInfoInput },
    context: MyContext
  ): Promise<Maybe<any>> {
    return logErrorsForResolver(context.req, () =>
      editionBuyerInfoResolver(context, input)
    );
  },
  type: gqlNonNull(EditionBuyerInfoResponseGqlType),
};

export default editionBuyerInfoQueryField;
