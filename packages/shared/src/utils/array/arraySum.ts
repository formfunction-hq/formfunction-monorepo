export default function arraySum(arr: Array<number>): number {
  return arr.reduce((acc, currVal) => acc + currVal, 0);
}
