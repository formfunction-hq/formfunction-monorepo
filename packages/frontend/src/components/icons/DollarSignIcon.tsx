import ColorValue from "types/enums/ColorValue";

type Props = {
  colorValue: ColorValue;
};

export default function DollarSignIcon({ colorValue }: Props): JSX.Element {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2607_10012)">
        <path
          d="M16 1.83325V31.1666"
          stroke={colorValue}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.6667 7.16675H12.6667C11.429 7.16675 10.242 7.65841 9.36684 8.53358C8.49167 9.40875 8 10.5957 8 11.8334C8 13.0711 8.49167 14.2581 9.36684 15.1332C10.242 16.0084 11.429 16.5001 12.6667 16.5001H19.3333C20.571 16.5001 21.758 16.9917 22.6332 17.8669C23.5083 18.7421 24 19.9291 24 21.1667C24 22.4044 23.5083 23.5914 22.6332 24.4666C21.758 25.3418 20.571 25.8334 19.3333 25.8334H8"
          stroke={colorValue}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2607_10012">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
