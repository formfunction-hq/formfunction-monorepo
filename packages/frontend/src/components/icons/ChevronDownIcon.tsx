import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import SvgSquareIconProps from "types/SvgSquareIconProps";

export default function ChevronDownIcon({
  colorValue,
  size,
}: SvgSquareIconProps<16 | 24>): JSX.Element {
  switch (size) {
    case 16:
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke={colorValue}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 24:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke={colorValue}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return assertUnreachable(size);
  }
}
