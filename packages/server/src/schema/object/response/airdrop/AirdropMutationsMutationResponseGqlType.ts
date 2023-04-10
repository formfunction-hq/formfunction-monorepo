import { GraphQLObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import CreateAirdropsResponseGqlType from "src/schema/object/response/airdrop/CreateAirdropsResponseGqlType";
import CreateAirdropsInputGqlType from "src/schema/input/airdrop/CreateAirdropsInputGqlType";
import {
  CreateAirdropsInput,
  CreateAirdropsResponse,
} from "src/__generated__/generated";
import MyContext from "src/types/MyContext";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import createAirdropsResolver from "src/resolvers/mutation/airdrop/createAirdropsResolver";

const AirdropMutationsMutationResponseGqlType = new GraphQLObjectType({
  fields: {
    createAirdrops: {
      args: {
        input: { type: gqlNonNull(CreateAirdropsInputGqlType) },
      },
      async resolve(
        _source,
        {
          input,
        }: {
          input: CreateAirdropsInput;
        },
        context: MyContext
      ): Promise<CreateAirdropsResponse> {
        return logErrorsForResolver(context.req, () =>
          createAirdropsResolver(context, input)
        );
      },
      type: gqlNonNull(CreateAirdropsResponseGqlType),
    },
  },
  name: Typename.AirdropMutationsMutationResponse,
});

export default AirdropMutationsMutationResponseGqlType;
