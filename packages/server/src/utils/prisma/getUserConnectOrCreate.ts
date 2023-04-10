export default function getUserConnectOrCreate(userId: string) {
  return {
    connectOrCreate: {
      create: {
        id: userId,
        username: userId,
      },
      where: {
        id: userId,
      },
    },
  };
}
