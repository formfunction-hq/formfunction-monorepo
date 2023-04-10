import airplane from "airplane";

const NUM_RETRIES = 5;

export default async function executeWithRetries(
  taskSlug: string,
  batch: number,
  batchSize: number
) {
  const skip = batch * batchSize;
  for (let i = 0; i < NUM_RETRIES; i++) {
    console.log(
      `${
        i > 0 ? `[Retry #${i}] ` : ""
      } Running batch #${batch} (NFTs in range [${skip}, ${skip + batchSize}))`
    );
    try {
      const run = await airplane.execute(taskSlug, {
        skip,
        take: batchSize,
      });
      return run.output;
    } catch (e) {
      if (i === NUM_RETRIES - 1) {
        console.error(`All retries failed running batch #${batch}`);
        throw e;
      }

      console.error(`Error occurred running batch #${batch}, retrying...`, e);
      continue;
    }
  }
}
