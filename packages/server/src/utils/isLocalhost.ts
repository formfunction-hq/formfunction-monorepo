export default function isLocalhost(): boolean {
  return process.env.IS_LOCAL_HOST === "true";
}
