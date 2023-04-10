export default function isLocalhost(): boolean {
  return (
    typeof window !== "undefined" &&
    (window.location.href.includes("localhost") ||
      window.location.href.includes("ngrok"))
  );
}
