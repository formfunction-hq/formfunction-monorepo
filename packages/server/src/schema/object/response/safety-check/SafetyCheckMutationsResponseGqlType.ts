import { GraphQLObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CreateSafetyCheckSubmissionInput,
  CreateSafetyCheckSubmissionResponse,
} from "src/__generated__/generated";
import MyContext from "src/types/MyContext";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import CreateSafetyCheckSubmissionInputGqlType from "src/schema/input/safety-check/CreateSafetyCheckSubmissionInputGqlType";
import CreateSafetyCheckSubmissionResponseGqlType from "src/schema/object/response/safety-check/CreateSafetyCheckSubmissionResponseGqlType";
import createSafetyCheckSubmissionResolver from "src/resolvers/mutation/safety-check/createSafetyCheckSubmissionResolver";

const SafetyCheckMutationsResponseGqlType = new GraphQLObjectType({
  fields: {
    createSafetyCheckSubmission: {
      args: {
        input: { type: gqlNonNull(CreateSafetyCheckSubmissionInputGqlType) },
      },
      resolve(
        _source,
        {
          input,
        }: {
          input: CreateSafetyCheckSubmissionInput;
        },
        context: MyContext
      ): Promise<CreateSafetyCheckSubmissionResponse> {
        return logErrorsForResolver(context.req, () =>
          createSafetyCheckSubmissionResolver(context, input)
        );
      },
      type: gqlNonNull(CreateSafetyCheckSubmissionResponseGqlType),
    },
  },
  name: Typename.SafetyCheckMutationsResponse,
});

export default SafetyCheckMutationsResponseGqlType;
