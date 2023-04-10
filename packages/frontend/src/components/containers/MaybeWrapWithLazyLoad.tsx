import { Flags } from "hooks/useFlagsTyped";
import LazyLoad from "react-lazyload";

type Props = {
  children: JSX.Element;
  lazyLoadConfig: Flags["lazyLoadConfig"]["default"];
};

export default function MaybeWrapWithLazyLoad({
  children,
  lazyLoadConfig,
}: Props): JSX.Element {
  if (!lazyLoadConfig.enabled) {
    return children;
  }

  return (
    <LazyLoad
      offset={lazyLoadConfig.offset}
      once={lazyLoadConfig.once}
      unmountIfInvisible={lazyLoadConfig.unmountIfInvisible}
    >
      {children}
    </LazyLoad>
  );
}
