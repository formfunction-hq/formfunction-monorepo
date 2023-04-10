export default function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}
