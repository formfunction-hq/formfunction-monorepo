import airplane from "airplane";

export default async function getNumberOfNftsToSync() {
  const run = await airplane.rest.request<{ count: number }>(
    "prod_api_big",
    // REST method to execute
    "GET",
    // URL path
    "/intern/numberOfNftsToSync",
    { headers: { check: "fofu" } }
  );
  return run.output.response.count;
}
