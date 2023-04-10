import SvgSquareIconProps from "types/SvgSquareIconProps";

export default function ChargingBatteryIcon({
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
      <g clip-path="url(#clip0_4468_37119)">
        <path
          d="M6.66634 24H3.99967C3.29243 24 2.61415 23.719 2.11406 23.219C1.61396 22.7189 1.33301 22.0406 1.33301 21.3333V10.6667C1.33301 9.95942 1.61396 9.28115 2.11406 8.78105C2.61415 8.28095 3.29243 8 3.99967 8H8.25301M19.9997 8H22.6663C23.3736 8 24.0519 8.28095 24.552 8.78105C25.0521 9.28115 25.333 9.95942 25.333 10.6667V21.3333C25.333 22.0406 25.0521 22.7189 24.552 23.219C24.0519 23.719 23.3736 24 22.6663 24H18.413"
          stroke={colorValue}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30.667 17.3334V14.6667"
          stroke={colorValue}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.6663 8L9.33301 16H17.333L11.9997 24"
          stroke={colorValue}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_4468_37119"
          x1="5.37261"
          y1="14.029"
          x2="23.6305"
          y2="14.9672"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4468_37119"
          x1="30.8353"
          y1="15.6715"
          x2="31.5979"
          y2="15.6813"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4468_37119"
          x1="10.6795"
          y1="14.029"
          x2="16.7798"
          y2="14.1335"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
        <clipPath id="clip0_4468_37119">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
