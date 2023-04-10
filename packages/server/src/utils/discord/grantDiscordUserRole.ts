import { Prisma, DiscordAuth } from "@prisma/client";
import DiscordRoleId from "formfn-shared/dist/types/enums/DiscordRoleId";
import {
  addRoleToDiscordUser,
  DiscordUserDetail,
} from "src/utils/discord/discordApiClient";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function grantDiscordUserRole(
  discordAuth: DiscordAuth,
  guildMember: DiscordUserDetail,
  roleId: DiscordRoleId
): Promise<void> {
  if (!new Set(guildMember.roles).has(roleId)) {
    await addRoleToDiscordUser(guildMember.user.id, roleId);
  }

  const prisma = getPrisma();
  const txInput: Prisma.DiscordAuthToDiscordRoleDiscordRoleIdDiscordAuthIdCompoundUniqueInput =
    {
      discordAuthId: discordAuth.id,
      discordRoleId: roleId,
    };

  await prisma.discordAuthToDiscordRole.upsert({
    create: txInput,
    update: txInput,
    where: {
      discordRoleId_discordAuthId: txInput,
    },
  });
}
