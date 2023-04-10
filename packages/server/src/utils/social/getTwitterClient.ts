import { TwitterApi } from "twitter-api-v2";

export const TOKENS = {
  appKey: String(process.env.TWITTER_APP_KEY),
  appSecret: String(process.env.TWITTER_APP_KEY_SECRET),
};

// Create client used to generate auth links only
function getTwitterClient(
  bearerToken?: string,
  tokens?: {
    accessSecret: string;
    accessToken: string;
  }
) {
  if (bearerToken != null) {
    return new TwitterApi(bearerToken);
  }

  const { accessToken, accessSecret } = tokens ?? {};
  if (accessToken != null && accessSecret != null) {
    return new TwitterApi({ ...TOKENS, accessSecret, accessToken });
  }

  return new TwitterApi({ ...TOKENS });
}

export default getTwitterClient;
