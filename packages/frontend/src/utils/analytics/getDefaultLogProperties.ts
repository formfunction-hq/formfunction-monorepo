import getApiHeaders from "utils/api/getApiHeaders";

export default function getDefaultLogProperties() {
  return {
    location: window.location.href,
    origin: window.self.origin,
    referrer: document.referrer,
    ...getApiHeaders(),
  };
}
