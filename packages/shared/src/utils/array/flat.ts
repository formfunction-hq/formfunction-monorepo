// https://stackoverflow.com/questions/50993498/flat-is-not-a-function-whats-wrong
export default function flat<T>(arr: Array<Array<T>>): Array<T> {
  // @ts-ignore
  return [].concat(...arr);
}
