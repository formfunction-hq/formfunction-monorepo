import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  AirdropTypeExpress_Enum,
  CreateAirdropsInput,
  CreateAirdropsResponse,
} from "src/__generated__/generated";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import convertUser from "src/utils/convert/convertUser";
import createAirdrops from "src/utils/airdrop/createAirdrops";

export default async function createAirdropsResolver(
  context: MyContext,
  input: CreateAirdropsInput
): Promise<CreateAirdropsResponse> {
  const verifiedPublicKey = assertUserSignedRequest(context);
  const { masterEditionMint, toAddresses, type } = input;

  const airdrops = await createAirdrops(
    context.req,
    masterEditionMint,
    verifiedPublicKey.toString(),
    toAddresses,
    type
  );

  return {
    __typename: Typename.CreateAirdropsResponse,
    airdrops: airdrops.map((airdrop) => ({
      __typename: Typename.Airdrop,
      id: airdrop.id,
      toUser: convertUser(airdrop.ToUser),
      type: airdrop.type as AirdropTypeExpress_Enum,
    })),
  };
}
