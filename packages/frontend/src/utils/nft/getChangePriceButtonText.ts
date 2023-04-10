import NftStatusExpress_enum from "types/relay/NftStatusExpress_enum";
import isListedForAuction from "utils/nft/isListedForAuction";

export default function getChangePriceButtonText(
  status: NftStatusExpress_enum
) {
  return isListedForAuction(status) ? "Change reserve price" : "Change price";
}
