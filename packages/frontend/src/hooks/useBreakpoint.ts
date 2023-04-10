import { useEffect, useState } from "react";
import useWindowDimensions from "hooks/useWindowDimensions";
import Breakpoints from "constants/Breakpoints";

type BreakpointKey = keyof typeof Breakpoints;
type BreakpointConfigKey = `is${BreakpointKey}Breakpoint`;
type BreakpointConfig = {
  [key in BreakpointConfigKey]: boolean;
};

const BreakpointList = Object.entries(Breakpoints) as Array<
  [BreakpointKey, number]
>;

function getBreakpointsFromWindow(): BreakpointConfig {
  return BreakpointList.reduce((result, [breakpoint, size]) => {
    const { matches } = (!breakpoint.includes("Height") &&
      window.matchMedia(`(max-width: ${size}px)`)) ||
      (breakpoint.includes("Height") &&
        window.matchMedia(`(max-height: ${size}px)`)) || { matches: false };
    const key: BreakpointConfigKey = `is${breakpoint}Breakpoint`;
    return {
      ...result,
      [key]: matches,
    };
  }, {} as BreakpointConfig);
}

export default function useBreakpoint() {
  const { width, height } = useWindowDimensions();
  const [breakpoints, setBreakpoints] = useState(getBreakpointsFromWindow());

  useEffect(() => {
    setBreakpoints(getBreakpointsFromWindow());
  }, [width, height]);

  return breakpoints;
}
