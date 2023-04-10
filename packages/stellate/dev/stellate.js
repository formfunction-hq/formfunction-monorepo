/**
* @type {import('stellate').Config}
*/
const config = {
  "config": {
    "schema": "../../frontend/schemas/hasura.graphql",
    "passThroughOnly": false,
    "scopes": {
      "SESSION_COOKIE": "cookie:hasura_auth_token_development"
    },
    "rootTypeNames": {
      "query": "query_root",
      "mutation": "mutation_root"
    },
    "rules": [
      {
        "types": {
          "query_root": [
            "metadataAccountsForExplore"
          ]
        },
        "maxAge": 60,
        "swr": 120
      }
    ],
    "name": "formfunction-dev",
    "originUrl": "https://graphqldev.formfunction.xyz/v1/graphql"
  }
}

export default config;
