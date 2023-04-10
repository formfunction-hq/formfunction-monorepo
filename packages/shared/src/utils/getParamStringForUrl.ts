export default function getParamStringForUrl<T extends string>(params?: {
  [K in T]?: string;
}) {
  if (params == null) {
    return "";
  }

  return (Object.keys(params) as Array<T>).reduce(
    (prev: string, cur: T, index: number) => {
      if (index === 0) {
        return `?${cur}=${params[cur]}`;
      }
      return prev + `&${cur}=${params[cur]}`;
    },
    ""
  );
}
