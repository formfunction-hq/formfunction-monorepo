import SvgSquareIconProps from "types/SvgSquareIconProps";

export default function ArrowLeftIcon({
  colorValue,
  size,
}: SvgSquareIconProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.833 10H4.16634"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 4.16699L4.16667 10.0003L10 15.8337"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
