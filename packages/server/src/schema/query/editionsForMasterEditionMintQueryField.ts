import { GraphQLFieldConfig } from "graphql";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import EditionsForMasterEditionMintResponseGqlType from "src/schema/object/response/EditionsForMasterEditionMintResponseGqlType";

const editionsForMasterEditionMintQueryField: GraphQLFieldConfig<unknown, any> =
  {
    resolve: () => ({}),
    type: gqlNonNull(EditionsForMasterEditionMintResponseGqlType),
  };

export default editionsForMasterEditionMintQueryField;
