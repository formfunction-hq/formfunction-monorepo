export type GraphqlUrls = {
  hasuraRelayUrl: string;
  hasuraUrl: string;
  remoteSchemaUrl: string;
  stellateUrl: string;
};

type GraphqlUrlConfig = {
  remoteSchemaApiAllowlist: Array<string>;
  stellateAllowlist: Array<string>;
  urls: {
    dev: GraphqlUrls;
    local: GraphqlUrls;
    prod: GraphqlUrls;
    test: GraphqlUrls;
  };
  useGraphqlUrlV2: boolean;
};

export default GraphqlUrlConfig;
