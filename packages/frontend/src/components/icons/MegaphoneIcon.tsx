import SvgSquareIconProps from "types/SvgSquareIconProps";

export default function MegaphoneIcon({
  colorValue,
  size,
}: SvgSquareIconProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0385 2.78391C14.3029 2.97143 14.46 3.27547 14.46 3.59962V17.2574C14.46 17.5816 14.3029 17.8856 14.0385 18.0731C13.7741 18.2607 13.4352 18.3084 13.1293 18.2012L6.42 15.8498V21.0695C6.42 21.6218 5.97228 22.0695 5.42 22.0695C4.86772 22.0695 4.42 21.6218 4.42 21.0695V14.5322H2C1.44772 14.5322 1 14.0844 1 13.5322V7.32492C1 6.77264 1.44772 6.32492 2 6.32492H4.42426C4.45997 5.93844 4.7177 5.60382 5.08926 5.47361L13.1293 2.65589C13.4352 2.54869 13.7741 2.5964 14.0385 2.78391ZM4.42 8.32492V12.5322H3V8.32492H4.42ZM6.42 13.7306V13.5322V7.32492V7.1265L12.46 5.00971V15.8474L6.42 13.7306Z"
        fill={colorValue}
      />
      <path
        d="M16.5996 6.59961C16.5996 6.59961 18.5996 7.68065 18.5996 10.4996C18.5996 13.3186 16.5996 14.3996 16.5996 14.3996"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5996 4C19.5996 4 22.3996 6.02017 22.3996 10.4C22.3996 14.7798 19.5996 16.8 19.5996 16.8"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
