import toObject from "formfn-shared/dist/utils/toObject";
import {
  Environment,
  FetchFunction,
  Network,
  Observable,
  RecordSource,
  Store,
} from "relay-runtime";

import { SubscriptionClient } from "subscriptions-transport-ws";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import logError from "utils/analytics/logError";
import fetchGraphql from "utils/graphql/fetchGraphql";
import getLdBootstrap from "utils/launch-darkly/getLdBootstrap";
import logIfNotProd from "utils/logIfNotProd";

/**
 * Relay requires developers to configure a "fetch" function that tells Relay how to load
 * the results of GraphQL queries from your server (or other data source). See more at
 * https://relay.dev/docs/en/quick-start-guide#relay-environment.
 */
const fetchRelay: FetchFunction = async (params, variables, _cacheConfig) => {
  const fetchKey = variables[FetchGraphqlVariablesDenylist.FetchKeyForLogging];
  const isPolling = fetchKey != null && Number(fetchKey) >= 1;
  let didLogRelayFetchFail = false;

  try {
    const response = await fetchGraphql(params.name, params.text, variables);
    const json = await response.json();

    // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
    // property of the response. If any exceptions occurred when processing the request,
    // throw an error to indicate to the developer what went wrong.
    if (Array.isArray(json.errors)) {
      logError(
        isPolling
          ? AnalyticsEvent.RelayFetchFailPolling
          : AnalyticsEvent.RelayFetchFail,
        JSON.stringify(json.errors),
        {
          description: "Error was returned",
          json: toObject(json),
          params,
          response: {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
            type: response.type,
            url: response.url,
          },
          variables,
        }
      );
      didLogRelayFetchFail = true;
      logIfNotProd(
        `Error was returned fetching GraphQL query '${
          params.name
        }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
          json.errors
        )}`
      );
      throw json.errors[0];
    }

    // Otherwise, return the full payload.
    return json;
  } catch (e: any) {
    if (!didLogRelayFetchFail) {
      // We do not want duplicate logs, so if we already logged RelayFetchFail, there is
      // no need to log RelayFetchThrows.
      logError(
        isPolling
          ? AnalyticsEvent.RelayFetchThrowsPolling
          : AnalyticsEvent.RelayFetchThrows,
        e,
        {
          description: "Error was thrown",
          params,
          variables,
        }
      );
      logIfNotProd(
        `Error was thrown fetching GraphQL query '${
          params.name
        }' with variables '${JSON.stringify(variables)}': ${e.message}`
      );
    }
    throw e;
  }
};

// Copied from https://relay.dev/docs/guided-tour/updating-data/graphql-subscriptions/#configuring-the-network-layer
const subscriptionClient = () =>
  new SubscriptionClient(process.env.REACT_APP_WS_GRAPHQL_URL as string, {
    reconnect: true,
  });

// Copied from https://relay.dev/docs/guided-tour/updating-data/graphql-subscriptions/#configuring-the-network-layer
// @ts-ignore
const subscribe = (request, variables) => {
  // @ts-ignore
  const subscribeObservable = subscriptionClient.request({
    operationName: request.name,
    query: request.text,
    variables,
  });
  // Important: Convert subscriptions-transport-ws observable type to Relay's
  // @ts-ignore
  return Observable.from(subscribeObservable);
};

const RelayEnvironment = new Environment({
  // @ts-ignore
  network: Network.create(fetchRelay, subscribe),
  store: new Store(new RecordSource(), {
    // This property tells Relay to not immediately clear its cache when the user
    // navigates around the app. Relay will hold onto the specified number of
    // query results, allowing the user to return to recently visited pages
    // and reusing cached data if its available/fresh.
    gcReleaseBufferSize: getLdBootstrap()?.gcReleaseBufferSize ?? 20,
  }),
});

export default RelayEnvironment;
