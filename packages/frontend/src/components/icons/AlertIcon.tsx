import ColorValue from "types/enums/ColorValue";

type Props = {
  colorValue: ColorValue;
};

export default function AlertIcon({ colorValue }: Props): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2898 3.86L1.81978 18C1.64514 18.3024 1.55274 18.6453 1.55177 18.9945C1.55079 19.3437 1.64127 19.6871 1.8142 19.9905C1.98714 20.2939 2.2365 20.5467 2.53748 20.7239C2.83847 20.901 3.18058 20.9962 3.52978 21H20.4698C20.819 20.9962 21.1611 20.901 21.4621 20.7239C21.7631 20.5467 22.0124 20.2939 22.1854 19.9905C22.3583 19.6871 22.4488 19.3437 22.4478 18.9945C22.4468 18.6453 22.3544 18.3024 22.1798 18L13.7098 3.86C13.5315 3.56611 13.2805 3.32312 12.981 3.15448C12.6814 2.98585 12.3435 2.89725 11.9998 2.89725C11.656 2.89725 11.3181 2.98585 11.0186 3.15448C10.7191 3.32312 10.468 3.56611 10.2898 3.86V3.86Z"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9V13"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17H12.01"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
