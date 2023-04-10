import getTwitterClient from "src/utils/social/getTwitterClient";
import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  ConnectSocialNetworkInput,
  SocialNetworkType_Enum,
  SocialNetwork,
  RedirectLocation_Enum,
} from "src/__generated__/generated";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import DISCORD_AUTH_CONFIG from "src/constants/DiscordAuthConfig";
import createDiscordAuthorizationNonce from "src/utils/discord/createDiscordAuthorizationNonce";
import MyContext from "src/types/MyContext";
import validateUserIdInputForRequest from "src/utils/social/validateUserIdInputForRequest";
import invariant from "tiny-invariant";

function getRedirectQuery(input: ConnectSocialNetworkInput): string {
  const { redirectLocation } = input;
  if (redirectLocation == null) {
    return "";
  }

  switch (redirectLocation) {
    case RedirectLocation_Enum.Apply:
    case RedirectLocation_Enum.Profile:
    case RedirectLocation_Enum.EditProfile:
      return `?redirect=${redirectLocation}`;
    default:
      return assertUnreachable(redirectLocation);
  }
}

async function getTwitterAuthLink(
  input: ConnectSocialNetworkInput
): Promise<string> {
  const { userId } = input;
  const client = getTwitterClient();
  const response = await client.generateAuthLink(
    `${process.env.API_URL}/social/twitterCallback${getRedirectQuery(input)}`
  );

  const prisma = getPrisma();
  await prisma.twitterAuth.upsert({
    create: {
      requestToken: response.oauth_token,
      requestTokenSecret: response.oauth_token_secret,
      userId,
    },
    update: {
      accessToken: null,
      accessTokenSecret: null,
      requestToken: response.oauth_token,
      requestTokenSecret: response.oauth_token_secret,
    },
    where: { userId },
  });

  return response.url;
}

async function getInstagramAuthLink(
  input: ConnectSocialNetworkInput
): Promise<string> {
  const { userId } = input;
  const prisma = getPrisma();
  await prisma.instagramAuth.upsert({
    create: {
      userId,
    },
    update: {
      accessToken: null,
    },
    where: { userId },
  });

  const appId = process.env.INSTAGRAM_APP_ID;
  const redirectUri = `${process.env.API_URL}/social/instagramCallback`;
  return (
    `https://api.instagram.com/oauth/authorize` +
    `?client_id=${appId}` +
    `&redirect_uri=${redirectUri}` +
    `&scope=user_profile` +
    `&response_type=code` +
    `&state=${input.userId},${input.redirectLocation}`
  );
}

async function getDiscordAuthLink(
  input: ConnectSocialNetworkInput
): Promise<string> {
  const { userId, redirectLocation } = input;
  invariant(redirectLocation != null);

  const authorizationNonce = createDiscordAuthorizationNonce(redirectLocation);
  const prisma = getPrisma();
  await prisma.discordAuth.upsert({
    create: {
      authorizationNonce,
      discordHandle: null,
      discordUserId: null,
      hasConnectedDiscordAccount: false,
      hasJoinedDiscordServer: null,
      userId,
    },
    update: {
      authorizationNonce,
    },
    where: { userId },
  });

  return (
    `https://discord.com/api/oauth2/authorize` +
    `?client_id=${DISCORD_AUTH_CONFIG.clientId}` +
    `&redirect_uri=${process.env.API_URL}/social/discordCallback` +
    `&scope=identify` +
    `&response_type=code` +
    `&state=${authorizationNonce}`
  );
}

async function connectSocialNetworkResolver(
  context: MyContext,
  input: ConnectSocialNetworkInput
): Promise<SocialNetwork> {
  validateUserIdInputForRequest(context.req, input.userId);

  const { socialNetworkType } = input;
  switch (socialNetworkType) {
    case SocialNetworkType_Enum.Twitter: {
      const authLink = await getTwitterAuthLink(input);
      return { __typename: Typename.SocialNetwork, authLink };
    }
    case SocialNetworkType_Enum.Instagram: {
      const authLink = await getInstagramAuthLink(input);
      return { __typename: Typename.SocialNetwork, authLink };
    }
    case SocialNetworkType_Enum.Discord: {
      const authLink = await getDiscordAuthLink(input);
      return { __typename: Typename.SocialNetwork, authLink };
    }
    default:
      return assertUnreachable(socialNetworkType);
  }
}

export default connectSocialNetworkResolver;
