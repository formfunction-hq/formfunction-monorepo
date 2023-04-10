import GraphqlUrlConfig from "types/GraphqlUrlConfig";

const GRAPHQL_URL_CONFIG_DEFAULT: GraphqlUrlConfig = {
  remoteSchemaApiAllowlist: [],
  stellateAllowlist: [],
  urls: {
    dev: {
      hasuraRelayUrl: "https://graphqldev.formfunction.xyz/v1beta1/relay",
      hasuraUrl: "https://graphqldev.formfunction.xyz/v1/graphql",
      remoteSchemaUrl: "https://apidev2.formfunction.xyz/graphql",
      stellateUrl: "https://stellate-dev.formfunction.xyz",
    },
    local: {
      hasuraRelayUrl: "http://localhost:8080/v1beta1/relay",
      hasuraUrl: "http://localhost:8080/v1/graphql",
      remoteSchemaUrl: "http://localhost:4000/graphql",
      // Stellate not supported
      stellateUrl: "http://localhost:8080/v1/graphql",
    },
    prod: {
      hasuraRelayUrl: "https://graphql.formfunction.xyz/v1beta1/relay",
      hasuraUrl: "https://graphql.formfunction.xyz/v1/graphql",
      remoteSchemaUrl: "https://api-balance.formfunction.xyz/graphql",
      stellateUrl: "https://stellate-prod.formfunction.xyz",
    },
    test: {
      hasuraRelayUrl: "https://graphqltest.formfunction.xyz/v1beta1/relay",
      hasuraUrl: "https://graphqltest.formfunction.xyz/v1/graphql",
      remoteSchemaUrl: "https://apitest.formfunction.xyz/graphql",
      // Stellate not supported
      stellateUrl: "https://graphqltest.formfunction.xyz/v1/graphql",
    },
  },
  useGraphqlUrlV2: false,
};

export default GRAPHQL_URL_CONFIG_DEFAULT;
