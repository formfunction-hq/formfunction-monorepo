export default function getNoopResponse(reason: string) {
  return {
    message: "no-op",
    reason,
  };
}
