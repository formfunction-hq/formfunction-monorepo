import { RecordSourceSelectorProxy } from "relay-runtime";
import getNftExpressDataId from "utils/relay/getNftExpressDataId";
import { Duration } from "dayjs/plugin/duration";
import { Dayjs } from "dayjs";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default function updateNftAuctionSettings<T>(
  store: RecordSourceSelectorProxy<T>,
  mint: string,
  auctionTime: Duration,
  endTime: Duration,
  tickSizeConstantInLamports: Maybe<number>,
  scheduledAuctionTime?: Dayjs
): void {
  const nftRecord = store.get(getNftExpressDataId(mint));
  nftRecord?.setValue(auctionTime.asSeconds(), "auctionDurationInSeconds");
  nftRecord?.setValue(endTime.asSeconds(), "timeExtensionDurationInSeconds");
  nftRecord
    ?.getLinkedRecord("tickSizeInfo")
    ?.setValue(tickSizeConstantInLamports, "tickSizeConstantInLamports");
  if (scheduledAuctionTime != null) {
    nftRecord?.setValue(
      scheduledAuctionTime.toString(),
      "scheduledAuctionTime"
    );
  }
}
