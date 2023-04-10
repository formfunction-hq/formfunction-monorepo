import ColorValue from "types/enums/ColorValue";

type Props = {
  colorValue: ColorValue;
};

export default function AwardIcon({ colorValue }: Props): JSX.Element {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.0002 40.0013C42.3095 40.0013 50.6668 31.6439 50.6668 21.3346C50.6668 11.0253 42.3095 2.66797 32.0002 2.66797C21.6908 2.66797 13.3335 11.0253 13.3335 21.3346C13.3335 31.6439 21.6908 40.0013 32.0002 40.0013Z"
        stroke={colorValue}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.8932 37.0403L18.6665 61.3337L31.9998 53.3337L45.3332 61.3337L42.1065 37.0137"
        stroke={colorValue}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
