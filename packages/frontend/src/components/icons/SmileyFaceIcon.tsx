import SvgSquareIconProps from "types/SvgSquareIconProps";

export default function SmileyFaceIcon({
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
        d="M16.0003 29.3334C23.3641 29.3334 29.3337 23.3638 29.3337 16C29.3337 8.63622 23.3641 2.66669 16.0003 2.66669C8.63653 2.66669 2.66699 8.63622 2.66699 16C2.66699 23.3638 8.63653 29.3334 16.0003 29.3334Z"
        stroke={colorValue}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.667 18.6667C10.667 18.6667 12.667 21.3334 16.0003 21.3334C19.3337 21.3334 21.3337 18.6667 21.3337 18.6667"
        stroke={colorValue}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12H12.0138"
        stroke={colorValue}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12H20.0138"
        stroke={colorValue}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4468_37110"
          x1="7.15544"
          y1="12.715"
          x2="27.4718"
          y2="13.411"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4468_37110"
          x1="12.4624"
          y1="19.6715"
          x2="20.4485"
          y2="20.7659"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4468_37110"
          x1="12.0023"
          y1="12.3768"
          x2="12.0128"
          y2="12.3768"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_4468_37110"
          x1="20.0023"
          y1="12.3768"
          x2="20.0128"
          y2="12.3768"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
