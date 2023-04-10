import { UserForIdInput, UserForIdResponse } from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import getPrisma from "src/utils/prisma/getPrisma";
import convertUser from "src/utils/convert/convertUser";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";

export default async function userForIdResolver(
  _context: MyContext,
  input: UserForIdInput
): Promise<UserForIdResponse> {
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    include: CONVERT_USER_INCLUDE,
    where: {
      id: input.id,
    },
  });

  return {
    __typename: Typename.UserForIdResponse,
    user: user == null ? null : convertUser(user),
  };
}
