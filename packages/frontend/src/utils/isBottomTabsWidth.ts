import { HEADER_BREAKPOINT } from "constants/Breakpoints";

export default function isBottomTabsWidth(width: number) {
  return width <= HEADER_BREAKPOINT;
}
