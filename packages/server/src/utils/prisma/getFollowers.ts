import { User } from "@prisma/client";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function getFollowers(
  followedId: string
): Promise<Array<User>> {
  const prisma = getPrisma();
  const followers = await prisma.userFollows.findMany({
    include: {
      User_UserToUserFollows_followerId: true,
    },
    where: { followedId },
  });
  return followers.map(
    (follower) => follower.User_UserToUserFollows_followerId
  );
}
