import { buildURL, SharedImgixAndSourceProps } from "react-imgix";

export default function getSpotlightBackgroundImageStyle(
  assetSrcInitial: string,
  imgixParams?: SharedImgixAndSourceProps["imgixParams"]
) {
  const assetSrc = assetSrcInitial.includes("imgix")
    ? buildURL(assetSrcInitial, imgixParams)
    : assetSrcInitial;
  return `
    linear-gradient(0deg, rgba(32, 31, 42, 0.36), rgba(32, 31, 42, 0.36)), url(${assetSrc})
    no-repeat
    center / cover
  `;
}
