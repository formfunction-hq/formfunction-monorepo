import SvgSquareIconProps from "types/SvgSquareIconProps";

export default function UsersIcon({
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
      <g clip-path="url(#clip0_4468_37092)">
        <path
          d="M22.6663 28V25.3333C22.6663 23.9188 22.1044 22.5623 21.1042 21.5621C20.1041 20.5619 18.7475 20 17.333 20H6.66634C5.25185 20 3.8953 20.5619 2.89511 21.5621C1.89491 22.5623 1.33301 23.9188 1.33301 25.3333V28"
          stroke={colorValue}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0003 14.6667C14.9458 14.6667 17.3337 12.2789 17.3337 9.33333C17.3337 6.38781 14.9458 4 12.0003 4C9.05481 4 6.66699 6.38781 6.66699 9.33333C6.66699 12.2789 9.05481 14.6667 12.0003 14.6667Z"
          stroke={colorValue}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30.667 28V25.3333C30.6661 24.1516 30.2728 23.0037 29.5488 22.0698C28.8248 21.1358 27.8112 20.4688 26.667 20.1733"
          stroke={colorValue}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.333 4.17334C22.4802 4.46707 23.4971 5.13427 24.2232 6.06975C24.9493 7.00523 25.3435 8.15578 25.3435 9.34001C25.3435 10.5242 24.9493 11.6748 24.2232 12.6103C23.4971 13.5457 22.4802 14.2129 21.333 14.5067"
          stroke={colorValue}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_4468_37092"
          x1="4.92377"
          y1="23.0145"
          x2="21.0612"
          y2="24.4888"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4468_37092"
          x1="8.46237"
          y1="8.01932"
          x2="16.5889"
          y2="8.29773"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4468_37092"
          x1="27.3403"
          y1="23.1225"
          x2="30.3903"
          y2="23.1759"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_4468_37092"
          x1="22.008"
          y1="8.06706"
          x2="25.0665"
          y2="8.10772"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
        <clipPath id="clip0_4468_37092">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
