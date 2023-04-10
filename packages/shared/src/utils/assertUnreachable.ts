export default function assertUnreachable(
  val: never,
  failureMessage?: string
): never {
  throw new Error(
    failureMessage ??
      `Received a value which should not exist: ${JSON.stringify(val)}`
  );
}
