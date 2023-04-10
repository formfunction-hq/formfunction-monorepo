import axios from "axios";
import getRestUrl from "utils/env/getRestUrl";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import logEvent from "utils/analytics/logEvent";
import getApiHeaders from "utils/api/getApiHeaders";

export default async function loginFirebase(publicKey: string) {
  try {
    const loginResponse = await axios.post(
      getRestUrl("firebase/login"),
      {},
      { headers: getApiHeaders() }
    );

    const { firebaseToken } = loginResponse.data;
    if (firebaseToken == null) {
      logError(AnalyticsEvent.LoginFirebaseError, "firebaseToken is null", {
        publicKey,
        responseData: loginResponse.data,
        responseStatus: loginResponse.status,
      });
      return false;
    }

    const auth = getAuth();
    await signInWithCustomToken(auth, firebaseToken);
    logEvent(AnalyticsEvent.LoginFirebaseSuccess, { publicKey });
    return true;
  } catch (e) {
    logError(AnalyticsEvent.LoginFirebaseError, e as Error, {
      publicKey,
    });
    return false;
  }
}
