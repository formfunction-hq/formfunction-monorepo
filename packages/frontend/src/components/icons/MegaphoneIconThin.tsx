import ColorValue from "types/enums/ColorValue";

export default function MegaphoneIconThin({
  colorValue,
}: {
  colorValue: ColorValue;
}): JSX.Element {
  return (
    <svg
      width="57"
      height="56"
      viewBox="0 0 57 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.7743 7.17685C33.1709 7.45812 33.4066 7.91418 33.4066 8.4004V40.2687C33.4066 40.7549 33.1709 41.211 32.7743 41.4922C32.3777 41.7735 31.8694 41.8451 31.4105 41.6843L14.6466 35.8092V49.1635C14.6466 49.9919 13.9751 50.6635 13.1466 50.6635C12.3182 50.6635 11.6466 49.9919 11.6466 49.1635V33.694V33.1281V33.0763H5.16663C4.3382 33.0763 3.66663 32.4047 3.66663 31.5763V17.0928C3.66663 16.2644 4.3382 15.5928 5.16663 15.5928H11.6466V14.9751C11.6466 14.3379 12.0492 13.7702 12.6505 13.5595L31.4105 6.98482C31.8694 6.824 32.3777 6.89558 32.7743 7.17685ZM11.6466 18.5928V30.0763H6.66663V18.5928H11.6466ZM14.6466 32.6303V31.578L14.6466 31.5763V17.0928L14.6466 17.0911V16.0388L30.4066 10.5155V38.1535L14.6466 32.6303Z"
        fill={colorValue}
      />
      <path
        d="M39.2324 15.4004C39.2324 15.4004 43.8991 17.9228 43.8991 24.5004C43.8991 31.078 39.2324 33.6004 39.2324 33.6004"
        stroke={colorValue}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M46.2324 9.33301C46.2324 9.33301 52.7658 14.0467 52.7658 24.2663C52.7658 34.486 46.2324 39.1997 46.2324 39.1997"
        stroke={colorValue}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6319_33757"
          x1="8.67237"
          y1="23.3908"
          x2="31.3444"
          y2="23.9187"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colorValue} />
          <stop offset="1" stopColor={colorValue} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_6319_33757"
          x1="40.0179"
          y1="22.2584"
          x2="43.5772"
          y2="22.2896"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colorValue} />
          <stop offset="1" stopColor={colorValue} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_6319_33757"
          x1="47.3321"
          y1="20.5871"
          x2="52.3152"
          y2="20.6245"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colorValue} />
          <stop offset="1" stopColor={colorValue} />
        </linearGradient>
      </defs>
    </svg>
  );
}
