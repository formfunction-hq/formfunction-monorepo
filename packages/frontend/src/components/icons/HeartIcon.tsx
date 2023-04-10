import SvgSquareIconProps from "types/SvgSquareIconProps";

export default function HeartIcon({
  colorValue,
  size,
}: SvgSquareIconProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.7871 6.14666C27.1061 5.46533 26.2976 4.92485 25.4076 4.5561C24.5177 4.18735 23.5638 3.99756 22.6005 3.99756C21.6372 3.99756 20.6833 4.18735 19.7933 4.5561C18.9034 4.92485 18.0948 5.46533 17.4138 6.14666L16.0005 7.55999L14.5871 6.14666C13.2116 4.77107 11.3459 3.99827 9.40048 3.99827C7.45511 3.99827 5.58941 4.77107 4.21382 6.14666C2.83823 7.52225 2.06543 9.38795 2.06543 11.3333C2.06543 13.2787 2.83823 15.1444 4.21382 16.52L5.62715 17.9333L16.0005 28.3067L26.3738 17.9333L27.7871 16.52C28.4685 15.839 29.009 15.0304 29.3777 14.1405C29.7465 13.2505 29.9362 12.2966 29.9362 11.3333C29.9362 10.37 29.7465 9.41613 29.3777 8.52619C29.009 7.63624 28.4685 6.82767 27.7871 6.14666V6.14666Z"
        stroke={colorValue}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4468_37086"
          x1="6.75656"
          y1="13.1575"
          x2="27.9824"
          y2="13.9912"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
