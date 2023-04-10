function params(width?: number) {
  if (width == null) {
    return "";
  }

  return `&w=${width}`;
}

// TODO: use buildUrl from imgix library
export default function getImgixUrl(
  fileName: string,
  config?: { raw?: boolean; width?: number }
): string {
  const { width, raw } = config ?? {};
  const base = `https://formfunction.imgix.net/${fileName}`;
  if (raw === true) {
    return base;
  }

  return `${base}?q=70&auto=format${params(width)}`;
}
