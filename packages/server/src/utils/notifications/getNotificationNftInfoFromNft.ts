import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import convertNftToAsset from "src/utils/convert/convertNftToAsset";
import { ActivityNotificationNftInfo } from "src/__generated__/generated";
import invariant from "tiny-invariant";

export default function getNotificationNftInfoFromNft(
  nft: ConvertActivityNotificationType["Nft"]
): ActivityNotificationNftInfo {
  invariant(nft != null);
  return {
    __typename: Typename.ActivityNotificationNftInfo,
    editionNumber: nft.edition,
    mint: nft.mint,
    name: nft.NftMetadata.name,
    nftAsset: convertNftToAsset(nft),
  };
}
