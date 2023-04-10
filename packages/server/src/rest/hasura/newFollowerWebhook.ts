import { NextFunction, Request, Response } from "express";
import createNewFollowerNotification from "src/utils/notifications/create/createNewFollowerNotification";
import getPrisma from "src/utils/prisma/getPrisma";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";

export default async function newFollowerWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { id } = req.body.event.data.new as {
    id: string;
  };

  const prisma = getPrisma();
  const userFollows = await prisma.userFollows.findUnique({
    where: {
      id,
    },
  });
  if (userFollows == null) {
    // If the follower unfollowed right after following, this may be null
    res.json({ message: "no-op, userFollows row does not exist" });
    return;
  }

  // To account for users following, then unfollowing, then following again, we only
  // want to create one of these notifs for a unique follower/followed pair
  const existingNotif = await prisma.notification.findFirst({
    where: {
      receiver: userFollows.followedId,
      sender: userFollows.followerId,
      type: NotificationTypeExpress_Enum.NewFollower,
    },
  });
  if (existingNotif != null) {
    res.json({
      message:
        "no-op, notification for this pair of follower/followed has been created before",
    });
    return;
  }

  await createNewFollowerNotification(
    {},
    userFollows.followedId,
    userFollows.followerId
  );

  res.sendStatus(200);
}
