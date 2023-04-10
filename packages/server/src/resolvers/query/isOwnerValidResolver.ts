import {
  IsOwnerValidInput,
  IsOwnerValidResponse,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import isNftOwnerValid from "src/utils/isNftOwnerValid";

async function isOwnerValidResolver(
  input: IsOwnerValidInput
): Promise<IsOwnerValidResponse> {
  const isValid = await isNftOwnerValid(input.mint);

  return {
    __typename: Typename.IsOwnerValidResponse,
    isValid,
  };
}

export default isOwnerValidResolver;
