import SvgSquareIconProps from "types/SvgSquareIconProps";

export default function ImageIcon({
  colorValue,
  size,
}: SvgSquareIconProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50.6667 8H13.3333C10.3878 8 8 10.3878 8 13.3333V50.6667C8 53.6122 10.3878 56 13.3333 56H50.6667C53.6122 56 56 53.6122 56 50.6667V13.3333C56 10.3878 53.6122 8 50.6667 8Z"
        stroke={colorValue}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.6665 26.668C24.8756 26.668 26.6665 24.8771 26.6665 22.668C26.6665 20.4588 24.8756 18.668 22.6665 18.668C20.4574 18.668 18.6665 20.4588 18.6665 22.668C18.6665 24.8771 20.4574 26.668 22.6665 26.668Z"
        stroke={colorValue}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M56.0002 40.0013L42.6668 26.668L13.3335 56.0013"
        stroke={colorValue}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
