export default function intersperse<T>(arr: Array<T>, elem: T): Array<T> {
  const newArr: Array<T> = [];

  arr.forEach((item, index) => {
    newArr.push(item);
    if (index < arr.length - 1) {
      newArr.push(elem);
    }
  });

  return newArr;
}
