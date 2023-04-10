import getPrisma from "src/utils/prisma/getPrisma";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";

export default async function createNotifications(
  data: Array<{
    data: Prisma.InputJsonObject;
    receiverId: Maybe<string>;
    senderId: Maybe<string>;
    type: NotificationTypeExpress_Enum;
  }>
): Promise<void> {
  const enabled = await getLdFlag(
    LaunchDarklyFlag.EnableNotificationCreation,
    false
  );
  if (!enabled) {
    return;
  }

  const prisma = getPrisma();
  await prisma.notification.createMany({
    data: data.map((datum) => ({
      data: datum.data,
      receiver: datum.receiverId,
      sender: datum.senderId,
      type: datum.type,
    })),
  });
}
