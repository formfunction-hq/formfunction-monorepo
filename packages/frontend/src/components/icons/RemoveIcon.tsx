import ColorValue from "types/enums/ColorValue";

type Props = {
  fillColorValue: ColorValue;
  strokeColorValue: ColorValue;
};

export default function RemoveIcon({
  strokeColorValue,
  fillColorValue,
}: Props): JSX.Element {
  return (
    <svg
      width="27"
      height="26"
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="13.5"
        cy="13"
        r="12"
        fill={fillColorValue}
        stroke={strokeColorValue}
        strokeWidth="2"
      />
      <path
        d="M16.5 10L10.5 16"
        stroke={strokeColorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 10L16.5 16"
        stroke={strokeColorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
