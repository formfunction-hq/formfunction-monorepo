import { GraphQLID, GraphQLObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CreateSafetyCheckSubmissionResponseGqlType = new GraphQLObjectType({
  fields: {
    id: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.CreateSafetyCheckSubmissionResponse,
});

export default CreateSafetyCheckSubmissionResponseGqlType;
