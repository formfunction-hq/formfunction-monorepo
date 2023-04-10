import { Prisma } from "@prisma/client";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";

const NFT_INCLUDE = {
  include: {
    NftMetadata: true,
  },
};
const CONVERT_ACTIVITY_NOTIFICATION_INCLUDE = {
  Nft: NFT_INCLUDE,
  NftTransaction: {
    include: {
      Currency: true,
      Nft: NFT_INCLUDE,
    },
  },
  Notification: {
    include: {
      Receiver: {
        include: CONVERT_USER_INCLUDE,
      },
      Sender: {
        include: CONVERT_USER_INCLUDE,
      },
    },
  },
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.ActivityNotificationInclude;

export default CONVERT_ACTIVITY_NOTIFICATION_INCLUDE;
