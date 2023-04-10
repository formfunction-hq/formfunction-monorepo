import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import AuctionDurationSelect from "components/select/AuctionDurationSelect";
import TimeExtensionDurationSelect from "components/select/TimeExtensionDurationSelect";
import { Duration } from "dayjs/plugin/duration";
import dayjs from "utils/dates/dayjsex";

type Props = {
  auctionTime: Duration;
  endTime: Duration;
  setAuctionTime: (duration: Duration) => void;
  setEndTime: (duration: Duration) => void;
};

export default function AuctionTimeSection({
  auctionTime,
  endTime,
  setAuctionTime,
  setEndTime,
}: Props) {
  return (
    <>
      <InputWithLabel
        label={
          <InputLabel
            label="Auction duration"
            subLabel="This will be the length of the auction that starts once the reserve price is met. The default is 24 hours."
          />
        }
        input={
          <AuctionDurationSelect
            defaultValue={auctionTime.asHours().toString()}
            onChange={(val) =>
              setAuctionTime(dayjs.duration(Number(val), "hours"))
            }
          />
        }
      />
      <InputWithLabel
        label={
          <InputLabel
            label="Ending period"
            subLabel="Any bids placed during this ending period will reset the countdown to this time, to give collectors a chance to place a final bid. The default is 5 minutes."
          />
        }
        input={
          <TimeExtensionDurationSelect
            defaultValue={endTime.asMinutes().toString()}
            onChange={(val) =>
              setEndTime(dayjs.duration(Number(val), "minutes"))
            }
          />
        }
      />
    </>
  );
}
