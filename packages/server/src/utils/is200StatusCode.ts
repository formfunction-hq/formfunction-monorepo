export default function is200StatusCode(code: number): boolean {
  return code >= 200 && code < 300;
}
