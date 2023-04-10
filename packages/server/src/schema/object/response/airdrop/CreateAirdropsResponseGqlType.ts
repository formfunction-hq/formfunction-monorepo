import { GraphQLObjectType } from "graphql";
import AirdropGqlType from "src/schema/object/airdrop/AirdropGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const CreateAirdropsResponseGqlType = new GraphQLObjectType({
  fields: {
    airdrops: { type: gqlNonNullListOfNonNull(AirdropGqlType) },
  },
  name: Typename.CreateAirdropsResponse,
});

export default CreateAirdropsResponseGqlType;
