import ColorValue from "types/enums/ColorValue";

type Props = {
  colorValue: ColorValue;
};

export default function VerticalEllipsisIcon({
  colorValue,
}: Props): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 13C13.0523 13 13.5 12.5523 13.5 12C13.5 11.4477 13.0523 11 12.5 11C11.9477 11 11.5 11.4477 11.5 12C11.5 12.5523 11.9477 13 12.5 13Z"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 6C13.0523 6 13.5 5.55228 13.5 5C13.5 4.44772 13.0523 4 12.5 4C11.9477 4 11.5 4.44772 11.5 5C11.5 5.55228 11.9477 6 12.5 6Z"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 20C13.0523 20 13.5 19.5523 13.5 19C13.5 18.4477 13.0523 18 12.5 18C11.9477 18 11.5 18.4477 11.5 19C11.5 19.5523 11.9477 20 12.5 20Z"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
