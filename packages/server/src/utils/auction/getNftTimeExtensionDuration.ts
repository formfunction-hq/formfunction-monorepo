import dayjs from "src/utils/dates/dayjsex";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";

export default function getNftTimeExtensionDuration(
  nft: ConvertNftToMetadataAccountType
) {
  return dayjs.duration({
    seconds: nft.NftListing!.timeExtensionDurationInSeconds,
  });
}
