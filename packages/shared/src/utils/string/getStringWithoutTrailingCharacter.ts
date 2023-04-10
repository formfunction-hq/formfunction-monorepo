import stringLast from "utils/string/stringLast";

export default function getStringWithoutTrailingCharacter(
  str: string,
  character: string
) {
  const lastChar = stringLast(str);
  if (lastChar === character) {
    return str.slice(0, -1);
  }

  return str;
}
