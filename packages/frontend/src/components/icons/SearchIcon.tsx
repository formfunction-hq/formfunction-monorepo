import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ColorValue from "types/enums/ColorValue";
import SvgSquareIconProps from "types/SvgSquareIconProps";

function Size20({ colorValue }: { colorValue: ColorValue }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
        stroke={colorValue}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5005 17.5L13.8755 13.875"
        stroke={colorValue}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Size24({ colorValue }: { colorValue: ColorValue }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.0004 20.9999L16.6504 16.6499"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SearchIcon({
  colorValue,
  size,
}: SvgSquareIconProps<20 | 24>): JSX.Element {
  switch (size) {
    case 20:
      return <Size20 colorValue={colorValue} />;
    case 24:
      return <Size24 colorValue={colorValue} />;
    default:
      return assertUnreachable(size);
  }
}
