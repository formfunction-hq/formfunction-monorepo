export default function targetIncludesAny(
  target: string,
  options: Array<string>
) {
  return options.some((option) => target.includes(option));
}
