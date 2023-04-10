import { Dayjs } from "dayjs";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import DateAndTimePicker from "components/time/DateAndTimePicker";

type Props = {
  scheduledAuctionDate: Dayjs;
  scheduledAuctionTime: Maybe<Dayjs>;
  setScheduledAuctionDate: (val: Dayjs) => void;
  setScheduledAuctionTime: (val: Maybe<Dayjs>) => void;
  setTzCode: (val: string) => void;
  showErrors: boolean;
  tzCode: string;
};

export default function ListingScheduledAuctionInputs({
  scheduledAuctionDate,
  scheduledAuctionTime,
  setScheduledAuctionDate,
  setScheduledAuctionTime,
  setTzCode,
  showErrors,
  tzCode,
}: Props) {
  return (
    <DateAndTimePicker
      date={scheduledAuctionDate}
      maxDaysAhead={14}
      time={scheduledAuctionTime}
      setDate={setScheduledAuctionDate}
      setTime={setScheduledAuctionTime}
      showErrors={showErrors}
      tzCode={tzCode}
      setTzCode={setTzCode}
    />
  );
}
