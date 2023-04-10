import { Duration } from "dayjs/plugin/duration";

export default async function sleep(duration: Duration) {
  await new Promise<void>((resolve) =>
    setTimeout(() => resolve(), duration.asMilliseconds())
  );
}
