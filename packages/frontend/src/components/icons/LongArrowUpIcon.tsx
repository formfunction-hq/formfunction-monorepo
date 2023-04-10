import ColorValue from "types/enums/ColorValue";

type Props = {
  colorValue: ColorValue;
};

export default function LongArrowUpIcon({ colorValue }: Props): JSX.Element {
  return (
    <svg
      width="16"
      height="35"
      viewBox="0 0 16 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM7 34C7 34.5523 7.44772 35 8 35C8.55229 35 9 34.5523 9 34L7 34ZM7 1L7 34L9 34L9 1L7 1Z"
        fill={colorValue}
      />
    </svg>
  );
}
