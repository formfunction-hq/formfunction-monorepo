import ColorValue from "types/enums/ColorValue";

type Props = {
  colorValue: ColorValue;
};

export default function VolumeOnIcon({ colorValue }: Props): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 5L6 9H2V15H6L11 19V5Z"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.0691 4.93018C20.9438 6.80545 21.9969 9.34853 21.9969 12.0002C21.9969 14.6518 20.9438 17.1949 19.0691 19.0702M15.5391 8.46018C16.4764 9.39781 17.003 10.6694 17.003 11.9952C17.003 13.321 16.4764 14.5925 15.5391 15.5302"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
