import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ColorValue from "types/enums/ColorValue";
import SvgSquareIconProps from "types/SvgSquareIconProps";

function Size24({ colorValue }: { colorValue: ColorValue }): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2400_8323"
          x1="5.36634"
          y1="5.76811"
          x2="20.5502"
          y2="6.80849"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2400_8323"
          x1="5.36634"
          y1="18.8841"
          x2="20.3403"
          y2="20.936"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2400_8323"
          x1="5.36634"
          y1="13.8841"
          x2="20.3403"
          y2="15.936"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Size120({ colorValue }: { colorValue: ColorValue }): JSX.Element {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 10L10 35L60 60L110 35L60 10Z"
        stroke={colorValue}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 85L60 110L110 85"
        stroke={colorValue}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 60L60 85L110 60"
        stroke={colorValue}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2522_9749"
          x1="26.8317"
          y1="28.8406"
          x2="102.751"
          y2="34.0424"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2522_9749"
          x1="26.8317"
          y1="94.4203"
          x2="101.701"
          y2="104.68"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2522_9749"
          x1="26.8317"
          y1="69.4203"
          x2="101.701"
          y2="79.6802"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4E48F2" />
          <stop offset="1" stopColor="#8458FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function LayersIcon({
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
