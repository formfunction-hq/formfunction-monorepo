import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { Variables } from "relay-runtime/lib/util/RelayRuntimeTypes";
import getApiHeaders from "utils/api/getApiHeaders";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import getGraphqlUrl from "utils/env/getGraphqlUrl";
import flattenArrayOfObjectsToObject from "formfn-shared/dist/utils/object/flattenArrayOfObjectsToObject";

export default async function fetchGraphql(
  name: string,
  text: MaybeUndef<string>,
  variables: Variables
): Promise<Response> {
  const denylistedVariables = flattenArrayOfObjectsToObject(
    Object.values(FetchGraphqlVariablesDenylist).map((value) => ({
      [value]: undefined,
    }))
  );

  return fetch(getGraphqlUrl(name), {
    body: JSON.stringify({
      operationName: name,
      query: text,
      variables: {
        ...variables,
        ...denylistedVariables,
      },
    }),
    credentials: "include",
    // @ts-ignore
    headers: {
      ...getApiHeaders(),
      "Content-Type": "application/json",
      "X-Operation-Name": name,
    },
    method: "POST",
  });
}
