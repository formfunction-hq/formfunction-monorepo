/* eslint-disable typescript-sort-keys/string-enum */

/**
 * These variables are always set to undefined before sending GraphQL requests to
 * the server.
 */
enum FetchGraphqlVariablesDenylist {
  // TODO: may have a nicer solution in the future. Right now, it's a sketchy
  // workaround for https://giters.com/facebook/relay/issues/3543
  Connections = "connections",
  MetadataAccountConnections = "metadataAccountConnections",
  NftTransactionConnections = "nftTransactionConnections",

  // It's useful to log the fetchKey for debugging purposes
  FetchKeyForLogging = "fetchKeyForLogging",
}

export default FetchGraphqlVariablesDenylist;
