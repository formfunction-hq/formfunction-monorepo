import ColorValue from "types/enums/ColorValue";

type Props = {
  colorValue: ColorValue;
};

export default function TwitterIcon({ colorValue }: Props): JSX.Element {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.1673 2.50008C18.3693 3.06298 17.4857 3.4935 16.5507 3.77508C16.0488 3.198 15.3818 2.78899 14.6398 2.60335C13.8979 2.41771 13.1169 2.46441 12.4024 2.73712C11.6879 3.00984 11.0744 3.49541 10.6448 4.12818C10.2153 4.76094 9.9904 5.51036 10.0007 6.27508V7.10841C8.53618 7.14639 7.08505 6.82159 5.77649 6.16295C4.46794 5.50431 3.34258 4.53228 2.50065 3.33341C2.50065 3.33341 -0.832682 10.8334 6.66732 14.1667C4.95109 15.3317 2.90661 15.9159 0.833984 15.8334C8.33398 20.0001 17.5006 15.8334 17.5006 6.25008C17.4999 6.01796 17.4776 5.78641 17.434 5.55841C18.2845 4.71966 18.8847 3.66067 19.1673 2.50008V2.50008Z"
        stroke={colorValue}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
