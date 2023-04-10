import { useCallback } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import getBottomScrollOffset from "utils/getBottomScrollOffset";

export default function useLoadNextOnBottomScroll(
  shouldLoadNext: boolean,
  loadNext: (count: number) => any,
  count: number
) {
  const scrollBottomCallback = useCallback(() => {
    if (shouldLoadNext) {
      loadNext(count);
    }
  }, [count, shouldLoadNext, loadNext]);

  useBottomScrollListener(scrollBottomCallback, {
    offset: getBottomScrollOffset(),
  });
}
