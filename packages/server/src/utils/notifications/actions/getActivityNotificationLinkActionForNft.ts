import { Nft, NftMetadata } from "@prisma/client";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import getActivityNotificationLinkAction from "src/utils/notifications/actions/getActivityNotificationLinkAction";
import { ActivityNotificationLinkAction } from "src/__generated__/generated";

export default function getActivityNotificationLinkActionForNft(
  nft: Nft & { NftMetadata: NftMetadata },
  text: string,
  username: MaybeUndef<string>
): ActivityNotificationLinkAction {
  return getActivityNotificationLinkAction(
    getNftLinkRelative(
      username,
      nft.id,
      nft.NftMetadata.assetWidth,
      nft.NftMetadata.assetHeight
    ),
    text
  );
}
