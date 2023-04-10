export default async function sleepMs(ms: number) {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
}
