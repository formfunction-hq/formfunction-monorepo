import { Dayjs } from "dayjs";
import useNftPageContext from "hooks/useNftPageContext";
import Countdown from "react-countdown";
import AuctionStatus from "types/enums/AuctionStatus";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import joinClasses from "utils/joinClasses";

type Props = {
  auctionEndTime: Dayjs;
  colorClass?: ColorClass;
  fontClass?: FontClass;
  shouldTriggerUpdate: boolean;
};

function getCountdownText(auctionStatus: AuctionStatus) {
  return auctionStatus !== AuctionStatus.Completed
    ? "Finalizing..."
    : "Completed!";
}

export default function AuctionCountdown({
  auctionEndTime,
  shouldTriggerUpdate = false,
  colorClass = ColorClass.Primary,
  fontClass = FontClass.Price,
}: Props): JSX.Element {
  const { auctionStatus, triggerAuctionStatusUpdate } = useNftPageContext();

  return (
    <Countdown
      date={auctionEndTime.toDate()}
      key={auctionEndTime.toString()}
      onComplete={
        shouldTriggerUpdate ? triggerAuctionStatusUpdate : emptyFunction
      }
      renderer={({ days, hours, minutes, seconds, completed }: any) => (
        <div
          className={joinClasses(colorClass, fontClass)}
          style={{ textAlign: "left" }}
        >
          {completed
            ? getCountdownText(auctionStatus)
            : `${days * 24 + hours}h ${minutes}m ${seconds}s`}
        </div>
      )}
    />
  );
}
