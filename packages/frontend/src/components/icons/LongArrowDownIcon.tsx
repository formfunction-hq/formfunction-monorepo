import ColorValue from "types/enums/ColorValue";

type Props = {
  colorValue: ColorValue;
};

export default function LongArrowDownIcon({ colorValue }: Props): JSX.Element {
  return (
    <svg
      width="16"
      height="35"
      viewBox="0 0 16 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1C9 0.447715 8.55228 2.41411e-08 8 0C7.44772 -2.41411e-08 7 0.447715 7 1L9 1ZM7.29289 34.7071C7.68342 35.0976 8.31658 35.0976 8.70711 34.7071L15.0711 28.3431C15.4616 27.9526 15.4616 27.3195 15.0711 26.9289C14.6805 26.5384 14.0474 26.5384 13.6569 26.9289L8 32.5858L2.34314 26.9289C1.95262 26.5384 1.31946 26.5384 0.928931 26.9289C0.538407 27.3195 0.538407 27.9526 0.928931 28.3431L7.29289 34.7071ZM7 1L7 34L9 34L9 1L7 1Z"
        fill={colorValue}
      />
    </svg>
  );
}
