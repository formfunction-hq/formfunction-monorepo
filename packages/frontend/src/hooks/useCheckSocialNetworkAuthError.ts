import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function useCheckSocialNetworkAuthError() {
  const [searchParams, _] = useSearchParams();
  useEffect(() => {
    const twitterAuthError = searchParams.get("twitterAuthError");
    const instagramAuthError = searchParams.get("instagramAuthError");
    if (twitterAuthError === "1" || instagramAuthError === "1") {
      notifyUnexpectedError();
    }
  }, [searchParams]);
}
