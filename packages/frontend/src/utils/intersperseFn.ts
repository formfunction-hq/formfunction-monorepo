export default function intersperseFn<T>(
  arr: Array<T>,
  fn: (index: number) => T
): Array<T> {
  const newArr: Array<T> = [];

  arr.forEach((item, index) => {
    newArr.push(item);
    if (index < arr.length - 1) {
      newArr.push(fn(index));
    }
  });

  return newArr;
}
