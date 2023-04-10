import ColorValue from "types/enums/ColorValue";

type Props = {
  colorValue: ColorValue;
};

export default function ChevronUpIcon({ colorValue }: Props): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 15L12 9L6 15"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
