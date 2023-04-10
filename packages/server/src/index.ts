/* eslint-disable import/first */
import "src/utils/analytics/tracer";

// Needs to come before other imports
import registerTracing from "src/utils/tracing/registerTracing";

registerTracing();

import getApp from "src/getApp";
import throng from "throng";

const main = async () => {
  const app = await getApp();

  const port = Number(process.env.SERVER_PORT);
  const host = process.env.SERVER_HOST as string;
  const workerCount = Number(process.env.WORKER_COUNT ?? 1);
  const startWorker = () =>
    app.listen(port, host, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening at http://${host}:${port}`);
    });

  // Spin up multiple workers per process if specified
  if (workerCount > 1) {
    throng({
      count: workerCount,
      lifetime: Infinity,
      worker: startWorker,
    });
  } else {
    startWorker();
  }
};

main();
