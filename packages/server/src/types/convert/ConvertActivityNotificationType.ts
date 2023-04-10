import {
  ActivityNotification,
  Currency,
  Nft,
  NftMetadata,
  NftTransaction,
  Notification,
} from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertUserType from "src/types/convert/ConvertUserType";

type ConvertActivityNotificationType = ActivityNotification & {
  Nft: Maybe<
    Nft & {
      NftMetadata: NftMetadata;
    }
  >;
  NftTransaction: Maybe<
    NftTransaction & {
      Currency: Currency;
      Nft: Nft & { NftMetadata: NftMetadata };
    }
  >;
  Notification: Notification & {
    Receiver: ConvertUserType;
    Sender: Maybe<ConvertUserType>;
  };
};

export default ConvertActivityNotificationType;
