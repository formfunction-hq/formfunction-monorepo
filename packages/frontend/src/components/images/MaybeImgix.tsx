import AssetWithShimmer from "components/images/AssetWithShimmer";

type Props = {
  children: Array<JSX.Element>;
  shimmerClassName?: string;
  showShimmer?: boolean;
  src: string;
};

export default function MaybeImgix({
  children,
  showShimmer = false,
  shimmerClassName,
  src,
}: Props) {
  const body = src.includes("imgix") ? children[0] : children[1];

  return showShimmer ? (
    <AssetWithShimmer className={shimmerClassName}>{body}</AssetWithShimmer>
  ) : (
    body
  );
}
