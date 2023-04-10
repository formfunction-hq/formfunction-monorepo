import { Notification, Prisma } from "@prisma/client";
import getPrisma from "src/utils/prisma/getPrisma";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";

export default async function createNotification(
  data: Prisma.InputJsonObject,
  receiverId: Maybe<string>,
  senderId: Maybe<string>,
  type: NotificationTypeExpress_Enum
): Promise<Maybe<Notification>> {
  const enabled = await getLdFlag(
    LaunchDarklyFlag.EnableNotificationCreation,
    false
  );
  if (!enabled) {
    return null;
  }

  const prisma = getPrisma();
  return prisma.notification.create({
    data: {
      data,
      receiver: receiverId,
      sender: senderId,
      type,
    },
  });
}
