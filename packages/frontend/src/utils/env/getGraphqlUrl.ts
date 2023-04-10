import GRAPHQL_URL_CONFIG_DEFAULT from "constants/GraphqlUrlConfigDefault";
import GraphqlUrlConfig, { GraphqlUrls } from "types/GraphqlUrlConfig";
import isDevSubdomain from "utils/isDevSubdomain";
import isProd from "utils/isProd";
import isTestnetSubdomain from "utils/isTestnetSubdomain";
import getLdBootstrap from "utils/launch-darkly/getLdBootstrap";
import isPointToDev from "utils/urlparams/isPointToDev";
import isPointToProd from "utils/urlparams/isPointToProd";

const HASURA_RELAY_API_ALLOWLIST = [
  "ExploreSeriesGridQuery",
  "ExploreSeriesGridPaginationQuery",
];

function getUrlKey(
  queryName: string,
  graphqlUrlConfig: GraphqlUrlConfig
): keyof GraphqlUrls {
  if (HASURA_RELAY_API_ALLOWLIST.includes(queryName)) {
    return "hasuraRelayUrl";
  }
  if (graphqlUrlConfig.stellateAllowlist.includes(queryName)) {
    return "stellateUrl";
  }
  if (graphqlUrlConfig.remoteSchemaApiAllowlist.includes(queryName)) {
    return "remoteSchemaUrl";
  }
  return "hasuraUrl";
}

export default function getGraphqlUrl(queryName: string): string {
  const ldBootstrap = getLdBootstrap();
  const graphqlUrlConfig =
    ldBootstrap?.graphqlUrlConfig ?? GRAPHQL_URL_CONFIG_DEFAULT;
  const urlKey = getUrlKey(queryName, graphqlUrlConfig);

  if (isPointToProd() || isProd()) {
    return graphqlUrlConfig.urls.prod[urlKey];
  }

  if (isPointToDev() || isDevSubdomain()) {
    return graphqlUrlConfig.urls.dev[urlKey];
  }

  if (isTestnetSubdomain()) {
    return graphqlUrlConfig.urls.test[urlKey];
  }

  return graphqlUrlConfig.urls.local[urlKey];
}
