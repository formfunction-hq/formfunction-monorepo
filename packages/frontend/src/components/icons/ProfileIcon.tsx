import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ColorValue from "types/enums/ColorValue";
import SvgSquareIconProps from "types/SvgSquareIconProps";

function Size16({ colorValue }: { colorValue: ColorValue }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3327 14V12.6667C13.3327 11.9594 13.0517 11.2811 12.5516 10.781C12.0515 10.281 11.3733 10 10.666 10H5.33268C4.62544 10 3.94716 10.281 3.44706 10.781C2.94697 11.2811 2.66602 11.9594 2.66602 12.6667V14"
        stroke={colorValue}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.00065 7.33333C9.47341 7.33333 10.6673 6.13943 10.6673 4.66667C10.6673 3.19391 9.47341 2 8.00065 2C6.52789 2 5.33398 3.19391 5.33398 4.66667C5.33398 6.13943 6.52789 7.33333 8.00065 7.33333Z"
        stroke={colorValue}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Size20({ colorValue }: { colorValue: ColorValue }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6673 17.5V15.8333C16.6673 14.9493 16.3161 14.1014 15.691 13.4763C15.0659 12.8512 14.218 12.5 13.334 12.5H6.66732C5.78326 12.5 4.93542 12.8512 4.31029 13.4763C3.68517 14.1014 3.33398 14.9493 3.33398 15.8333V17.5"
        stroke={colorValue}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99935 9.16667C11.8403 9.16667 13.3327 7.67428 13.3327 5.83333C13.3327 3.99238 11.8403 2.5 9.99935 2.5C8.1584 2.5 6.66602 3.99238 6.66602 5.83333C6.66602 7.67428 8.1584 9.16667 9.99935 9.16667Z"
        stroke={colorValue}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProfileIcon({
  colorValue,
  size,
}: SvgSquareIconProps<16 | 20 | 24>): JSX.Element {
  switch (size) {
    case 16:
      return <Size16 colorValue={colorValue} />;
    case 20:
      return <Size20 colorValue={colorValue} />;
    case 24:
      return <Size24 colorValue={colorValue} />;
    default:
      return assertUnreachable(size);
  }
}
