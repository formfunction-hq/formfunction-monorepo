export default function getFetchPolicyForFetchKey(
  fetchKey: number
): "store-or-network" | "store-and-network" {
  return fetchKey > 0 ? "store-and-network" : "store-or-network";
}
