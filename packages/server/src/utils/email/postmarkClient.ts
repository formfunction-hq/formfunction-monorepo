import * as postmark from "postmark";

const postmarkClient = new postmark.ServerClient(
  "REPLACE",
  // Although not documented, timeout is specified in seconds.
  // See https://github.com/wildbit/postmark.js/blob/190538736ee3a632ef1b134eea670159f7a54bbb/src/client/models/client/HttpClient.ts
  { timeout: 60 }
);

export default postmarkClient;
