export default function pluralize(word: string, num: number): string {
  return num === 1 ? word : `${word}s`;
}
