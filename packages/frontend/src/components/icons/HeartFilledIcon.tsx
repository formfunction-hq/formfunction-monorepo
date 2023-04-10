import SvgSquareIconProps from "types/SvgSquareIconProps";

export default function HeartFilledIcon({
  colorValue,
  size,
}: SvgSquareIconProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.8401 3.60987C20.3294 3.09888 19.7229 2.69352 19.0555 2.41696C18.388 2.14039 17.6726 1.99805 16.9501 1.99805C16.2276 1.99805 15.5122 2.14039 14.8448 2.41696C14.1773 2.69352 13.5709 3.09888 13.0601 3.60987L12.0001 4.66987L10.9401 3.60987C9.90843 2.57818 8.50915 1.99858 7.05012 1.99858C5.59109 1.99858 4.19181 2.57818 3.16012 3.60987C2.12843 4.64156 1.54883 6.04084 1.54883 7.49987C1.54883 8.95891 2.12843 10.3582 3.16012 11.3899L4.22012 12.4499L12.0001 20.2299L19.7801 12.4499L20.8401 11.3899C21.3511 10.8791 21.7565 10.2727 22.033 9.60523C22.3096 8.93777 22.4519 8.22236 22.4519 7.49987C22.4519 6.77738 22.3096 6.06198 22.033 5.39452C21.7565 4.72706 21.3511 4.12063 20.8401 3.60987Z"
        fill={colorValue}
        stroke={colorValue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
