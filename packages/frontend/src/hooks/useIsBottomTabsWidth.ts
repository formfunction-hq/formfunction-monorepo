import useWindowDimensions from "hooks/useWindowDimensions";
import isBottomTabsWidth from "utils/isBottomTabsWidth";

export default function useIsBottomTabsWidth(): boolean {
  const { width } = useWindowDimensions();

  return isBottomTabsWidth(width);
}
