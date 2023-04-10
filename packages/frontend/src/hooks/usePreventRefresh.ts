import { useEffect } from "react";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";

export default function usePreventRefresh(shouldPrevent: boolean) {
  useEffect(() => {
    if (shouldPrevent) {
      window.onbeforeunload = (e) => {
        e.preventDefault();
        // Custom message is not supported, see https://stackoverflow.com/questions/38879742/is-it-possible-to-display-a-custom-message-in-the-beforeunload-popup
        return "";
      };
    }

    return () => {
      window.onbeforeunload = emptyFunction;
    };
  }, [shouldPrevent]);
}
