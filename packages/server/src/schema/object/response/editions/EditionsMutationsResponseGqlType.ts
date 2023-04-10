import { GraphQLObjectType } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import addAllowlistAddressesResolver from "src/resolvers/mutation/editions/addAllowlistAddressesResolver";
import AddAllowlistAddressesInputGqlType from "src/schema/input/editions/AddAllowlistAddressesInputGqlType";
import AddAllowlistAddressesResponseGqlType from "src/schema/object/response/editions/AddAllowlistAddressesResponseGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  AddAllowlistAddressesInput,
  AddAllowlistAddressesResponse,
} from "src/__generated__/generated";

const EditionsMutationsResponseGqlType = new GraphQLObjectType({
  fields: {
    addAllowlistAddresses: {
      args: {
        input: { type: gqlNonNull(AddAllowlistAddressesInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: AddAllowlistAddressesInput },
        context: MyContext
      ): Promise<AddAllowlistAddressesResponse> {
        return logErrorsForResolver(context.req, () =>
          addAllowlistAddressesResolver(context, input)
        );
      },
      type: gqlNonNull(AddAllowlistAddressesResponseGqlType),
    },
  },
  name: Typename.EditionsMutationsResponse,
});

export default EditionsMutationsResponseGqlType;
