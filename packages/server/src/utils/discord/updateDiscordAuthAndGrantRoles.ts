import { DiscordAuth } from "@prisma/client";
import DiscordRoleId from "formfn-shared/dist/types/enums/DiscordRoleId";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import { DiscordUserDetail } from "src/utils/discord/discordApiClient";
import grantDiscordUserRole from "src/utils/discord/grantDiscordUserRole";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function updateDiscordAuthAndGrantRoles({
  discordAuth,
  guildMember,
  isWhitelisted,
}: {
  discordAuth: DiscordAuth;
  guildMember: DiscordUserDetail;
  isWhitelisted: boolean;
}): Promise<Array<DiscordRoleId>> {
  const prisma = getPrisma();
  await prisma.discordAuth.update({
    data: {
      User: {
        update: {
          shouldSeeDiscordOnboardingPrompt: false,
        },
      },
      authorizationNonce: null,
      discordHandle: guildMember.user.username,
      discordUserId: guildMember.user.id,
      hasConnectedDiscordAccount: true,
      hasJoinedDiscordServer: true,
    },
    where: {
      userId: discordAuth.userId,
    },
  });

  const rolesAdded = await Promise.all(
    Object.values(DiscordRoleId).map(async (role) => {
      switch (role) {
        case DiscordRoleId.VerifiedArtist:
          if (isWhitelisted) {
            await grantDiscordUserRole(discordAuth, guildMember, role);
            return role;
          }

          return null;
        default:
          return assertUnreachable(role);
      }
    })
  );

  return filterNulls(rolesAdded);
}
