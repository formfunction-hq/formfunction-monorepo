import { GraphQLID, GraphQLInputObjectType } from "graphql";
import AirdropTypeGqlType from "src/schema/enum/AirdropTypeGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

export const CREATE_AIRDROPS_COMMON_INPUT_FIELDS = {
  masterEditionMint: { type: gqlNonNull(GraphQLID) },
  type: { type: gqlNonNull(AirdropTypeGqlType) },
};

const CreateAirdropsInputGqlType = new GraphQLInputObjectType({
  fields: {
    ...CREATE_AIRDROPS_COMMON_INPUT_FIELDS,
    toAddresses: { type: gqlNonNullListOfNonNull(GraphQLID) },
  },
  name: Typename.CreateAirdropsInput,
});

export default CreateAirdropsInputGqlType;
