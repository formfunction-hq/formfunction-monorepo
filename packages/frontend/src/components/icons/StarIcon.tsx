import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ColorValue from "types/enums/ColorValue";
import SvgSquareIconProps from "types/SvgSquareIconProps";

function Size24({ colorValue }: { colorValue: ColorValue }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Size120({ colorValue }: { colorValue: ColorValue }) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M58.2066 13.6333C58.9403 12.1469 61.0597 12.1469 61.7934 13.6333L74.9851 40.3582C75.2762 40.9479 75.8386 41.3568 76.4893 41.4519L105.992 45.7642C107.632 46.0039 108.286 48.0196 107.099 49.1759L85.7536 69.966C85.2818 70.4255 85.0665 71.0878 85.1778 71.7368L90.2148 101.105C90.4951 102.739 88.78 103.985 87.3127 103.213L60.9309 89.3396C60.3481 89.0331 59.6519 89.0331 59.0691 89.3396L32.6873 103.213C31.22 103.985 29.5049 102.739 29.7851 101.105L34.8222 71.7368C34.9335 71.0878 34.7182 70.4255 34.2464 69.966L12.9014 49.1759C11.7142 48.0196 12.3677 46.0039 14.0076 45.7642L43.5107 41.4519C44.1614 41.3568 44.7238 40.9479 45.0149 40.3582L58.2066 13.6333Z"
        stroke={colorValue}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2522_9747"
          x1="26.8317"
          y1="45.8348"
          x2="103.008"
          y2="48.579"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function StarIcon({
  colorValue,
  size,
}: SvgSquareIconProps<24 | 120>): JSX.Element {
  switch (size) {
    case 24:
      return <Size24 colorValue={colorValue} />;
    case 120:
      return <Size120 colorValue={colorValue} />;
    default:
      return assertUnreachable(size);
  }
}
