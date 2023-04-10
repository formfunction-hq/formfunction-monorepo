import ColorValue from "types/enums/ColorValue";

type Props = {
  colorValue: ColorValue;
};

export default function CopyIcon({ colorValue }: Props): JSX.Element {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6667 7.5H9.16667C8.24619 7.5 7.5 8.24619 7.5 9.16667V16.6667C7.5 17.5871 8.24619 18.3333 9.16667 18.3333H16.6667C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667V9.16667C18.3333 8.24619 17.5871 7.5 16.6667 7.5Z"
        stroke={colorValue}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16602 12.4998H3.33268C2.89065 12.4998 2.46673 12.3242 2.15417 12.0117C1.84161 11.6991 1.66602 11.2752 1.66602 10.8332V3.33317C1.66602 2.89114 1.84161 2.46722 2.15417 2.15466C2.46673 1.8421 2.89065 1.6665 3.33268 1.6665H10.8327C11.2747 1.6665 11.6986 1.8421 12.0112 2.15466C12.3238 2.46722 12.4993 2.89114 12.4993 3.33317V4.1665"
        stroke={colorValue}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
