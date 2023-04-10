import LocalStorageKey from "types/enums/LocalStorageKey";
import getLdBootstrap from "utils/launch-darkly/getLdBootstrap";
import getLocalStorage from "utils/local-storage/getLocalStorage";
import getSignature from "utils/local-storage/getSignature";

export default function getApiHeaders(): {
  "X-Solana-Public-Key"?: string;
  "X-Solana-Sig"?: string;
} {
  const publicKey = getLocalStorage(LocalStorageKey.PublicKey) ?? "";
  const stellateHeaders = getLdBootstrap()?.stellateHeaders ?? {};

  return {
    "X-Solana-Public-Key": publicKey,
    ...(getSignature(publicKey) == null
      ? {}
      : { "X-Solana-Sig": getSignature(publicKey)! }),
    ...stellateHeaders,
  };
}
