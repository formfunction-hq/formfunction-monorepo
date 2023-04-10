import useBreakpoint from "hooks/useBreakpoint";

export default function useNftGridFullWidthColumnCount(multiple = 1) {
  const {
    isNftGridFullWidthOneColumnBreakpoint,
    isNftGridFullWidthTwoColumnsBreakpoint,
    isNftGridFullWidthThreeColumnsBreakpoint,
  } = useBreakpoint();

  if (isNftGridFullWidthOneColumnBreakpoint) {
    return 1 * multiple;
  }

  if (isNftGridFullWidthTwoColumnsBreakpoint) {
    return 2 * multiple;
  }

  if (isNftGridFullWidthThreeColumnsBreakpoint) {
    return 3 * multiple;
  }

  return 4 * multiple;
}
