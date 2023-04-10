import { useEffect, useState } from "react";
import Dimensions from "types/Dimensions";
import { useSearchParams } from "react-router-dom";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

function getDefaultDims() {
  const url = document.querySelector("meta[property='og:url']")?.baseURI;

  if (url !== document.baseURI) {
    return null;
  }

  const width = document.querySelector<HTMLMetaElement>(
    "meta[property='asset:width']"
  )?.content;
  const height = document.querySelector<HTMLMetaElement>(
    "meta[property='asset:height']"
  )?.content;

  if (width != null && height != null) {
    return {
      height: Number(height),
      width: Number(width),
    };
  }

  return null;
}

export default function useNftAssetDimensions() {
  const [searchParams] = useSearchParams();

  const [dimensions, setDimensions] = useState<Maybe<Dimensions>>(
    getDefaultDims()
  );

  useEffect(() => {
    const widthParam = searchParams.get("width");
    const heightParam = searchParams.get("height");

    if (widthParam != null && heightParam != null) {
      setDimensions({
        height: Number(heightParam),
        width: Number(widthParam),
      });
    }
  }, [searchParams]);

  return dimensions;
}
