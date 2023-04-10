import isProd from "utils/isProd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function logIfNotProd(...args: Array<any>): void {
  if (!isProd()) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}
