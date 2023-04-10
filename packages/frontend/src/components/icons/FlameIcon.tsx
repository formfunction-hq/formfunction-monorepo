import ColorValue from "types/enums/ColorValue";

type Props = {
  colorValue: ColorValue;
};

export default function FlameIcon({ colorValue }: Props): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.61786 7.5C9.75272 5.80525 9.61786 3.5 9.85212 2C12 4 12.5 4.5 13 6C13.909 8.72707 12.8821 9.79484 12.5 11C11.8781 12.9614 13.1758 14.007 14.5 14C16.3572 13.9902 17.2289 12.1685 17.2289 10.4737C20.6336 13.2983 19.6178 18.5 16.094 20.6422C12.6234 22.752 5.11781 22 4.17764 16.6878C3.18818 11.0971 6.56225 10.5697 8.61786 7.5Z"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
