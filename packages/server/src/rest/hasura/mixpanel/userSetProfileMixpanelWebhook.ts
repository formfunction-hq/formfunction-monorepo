import { NextFunction, Request, Response } from "express";
import getEnvironment from "src/utils/getEnvironment";
import getMixpanelClient from "src/utils/mixpanel/getMixpanelClient";

export default async function userSetProfileMixpanelWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const {
    bio,
    discordHandle,
    displayName,
    email,
    id,
    instagramName,
    isWhitelisted: isCreator,
    timeCreated,
    username,
  } = req.body.event.data.new;

  const environment = getEnvironment();
  const mixpanelClient = getMixpanelClient();

  mixpanelClient.people.set(id, {
    $email: email,
    $insert_id: id,
    $name: username,
    bio,
    discordHandle,
    displayName,
    email,
    environment,
    id,
    instagramName,
    isCreator,
    timeCreated,
    username,
  });

  res.json({ success: true });
}
