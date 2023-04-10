import stringLast from "utils/string/stringLast";

export default function stripTrailingDecimals(input: number) {
  let str = input.toFixed(2);
  if (stringLast(str) === "0") {
    str = str.slice(0, str.length - 1);

    if (stringLast(str) === "0") {
      str = str.slice(0, str.length - 1);

      if (stringLast(str) === ".") {
        str = str.slice(0, str.length - 1);
      }
    }
  }

  return str;
}
