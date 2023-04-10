import { NextFunction, Request, Response } from "express";
import getTwitterClient from "src/utils/social/getTwitterClient";

/**
 * Gets Twitter user by username
 */
export default async function getTwitterUserByUsername(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { username } = req.params;

  const client = getTwitterClient(process.env.TWITTER_BEARER_TOKEN);

  const user = await client.v2.userByUsername(username, {
    "user.fields": ["created_at", "public_metrics"],
  });
  res.json({ user });
}
