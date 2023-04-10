import SvgSquareIconProps from "types/SvgSquareIconProps";

export default function InstagramIcon({
  colorValue,
  size,
}: SvgSquareIconProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.166 1.6665H5.83268C3.5315 1.6665 1.66602 3.53198 1.66602 5.83317V14.1665C1.66602 16.4677 3.5315 18.3332 5.83268 18.3332H14.166C16.4672 18.3332 18.3327 16.4677 18.3327 14.1665V5.83317C18.3327 3.53198 16.4672 1.6665 14.166 1.6665Z"
        stroke={colorValue}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3337 9.47476C13.4366 10.1683 13.3181 10.8766 12.9952 11.4989C12.6723 12.1213 12.1614 12.6259 11.5351 12.9412C10.9088 13.2564 10.1991 13.3661 9.5069 13.2547C8.81468 13.1433 8.17521 12.8165 7.67944 12.3207C7.18367 11.825 6.85685 11.1855 6.74546 10.4933C6.63408 9.80106 6.74379 9.09134 7.05901 8.46507C7.37423 7.83881 7.8789 7.32788 8.50123 7.00496C9.12356 6.68205 9.83187 6.56359 10.5254 6.66643C11.2328 6.77133 11.8878 7.10098 12.3935 7.60668C12.8992 8.11239 13.2288 8.76733 13.3337 9.47476Z"
        stroke={colorValue}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.584 5.4165H14.5928"
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
