import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useFlagsTyped, { Flags } from "hooks/useFlagsTyped";

export function getLazyLoadConfig(
  config: Flags["lazyLoadConfig"],
  mediaType: Maybe<string>
) {
  if (config == null) {
    // Needed for localhost
    return {
      enabled: false,
      offset: 0,
      once: false,
      unmountIfInvisible: false,
    };
  }

  if (mediaType?.includes("video")) {
    return config.video;
  }

  return config.default;
}

export default function useLazyLoadConfig(mediaType: Maybe<string>) {
  const { lazyLoadConfig: lazyLoadConfigObject } = useFlagsTyped();
  return getLazyLoadConfig(lazyLoadConfigObject, mediaType);
}
