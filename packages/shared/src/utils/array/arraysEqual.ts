export default function arraysEqual<T>(arr1: Array<T>, arr2: Array<T>) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((val, index) => val === arr2[index]);
}
