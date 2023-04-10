import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import invariant from "tiny-invariant";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import getPrisma from "src/utils/prisma/getPrisma";
import validateUserIdInputForRequest from "src/utils/social/validateUserIdInputForRequest";
import {
  DisconnectSocialNetworkInput,
  SocialNetworkType_Enum,
  SocialNetwork,
} from "src/__generated__/generated";

async function disconnectTwitter(userId: string): Promise<void> {
  const prisma = getPrisma();
  await prisma.$transaction([
    prisma.user.update({
      data: { twitterName: null },
      where: { id: userId },
    }),
    prisma.twitterAuth.delete({
      where: { userId },
    }),
  ]);
}

async function disconnectInstagram(userId: string): Promise<void> {
  const prisma = getPrisma();
  await prisma.$transaction([
    prisma.user.update({
      data: { instagramName: null },
      where: { id: userId },
    }),
    prisma.instagramAuth.delete({
      where: { userId },
    }),
  ]);
}

async function disconnectDiscord(userId: string): Promise<void> {
  const prisma = getPrisma();
  const discordAuth = await prisma.discordAuth.findUnique({
    include: {
      DiscordAuthToDiscordRole: {},
    },
    where: { userId },
  });

  invariant(discordAuth != null);

  await prisma.$transaction([
    prisma.user.update({
      data: {
        shouldSeeDiscordOnboardingPrompt: false,
      },
      where: {
        id: userId,
      },
    }),
    prisma.discordAuthToDiscordRole.deleteMany({
      where: {
        id: {
          in: discordAuth.DiscordAuthToDiscordRole.map((val) => val.id),
        },
      },
    }),
    prisma.discordAuth.delete({
      where: { id: discordAuth.id },
    }),
  ]);
}

async function disconnectSocialNetworkResolver(
  context: MyContext,
  input: DisconnectSocialNetworkInput
): Promise<SocialNetwork> {
  validateUserIdInputForRequest(context.req, input.userId);

  const { userId, socialNetworkType } = input;
  switch (socialNetworkType) {
    case SocialNetworkType_Enum.Twitter: {
      await disconnectTwitter(userId);
      return { __typename: Typename.SocialNetwork, authLink: "" };
    }
    case SocialNetworkType_Enum.Instagram: {
      await disconnectInstagram(userId);
      return { __typename: Typename.SocialNetwork, authLink: "" };
    }
    case SocialNetworkType_Enum.Discord: {
      await disconnectDiscord(userId);
      return { __typename: Typename.SocialNetwork, authLink: "" };
    }
    default:
      return assertUnreachable(socialNetworkType);
  }
}

export default disconnectSocialNetworkResolver;
