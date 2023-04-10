import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import SvgSquareIconProps from "types/SvgSquareIconProps";

export default function FilterIcon({
  colorValue,
  size,
}: SvgSquareIconProps<20 | 24>): JSX.Element {
  switch (size) {
    case 20:
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.3332 3.33325H1.6665L8.33317 11.2166V16.6666L11.6665 18.3333V11.2166L18.3332 3.33325Z"
            stroke={colorValue}
            strokeWidth="1.5"
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
            d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
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
