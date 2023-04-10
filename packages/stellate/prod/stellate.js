/**
* @type {import('stellate').Config}
*/
const config = {
  "config": {
    "schema": "../../frontend/schemas/hasura.graphql",
    "injectHeaders": false,
    "enablePlayground": false,
    "passThroughOnly": false,
    "scopes": {
      "AUTHENTICATED": "cookie:hasura_auth_token"
    },
    "rootTypeNames": {
      "query": "query_root",
      "mutation": "mutation_root"
    },
    "name": "formfunction-prod",
    "originUrl": "https://graphql.formfunction.xyz/v1/graphql",
    "rules": [
      {
        "types": {
          "query_root": [
            "ArtistSubmission"
          ],
          "ArtistSubmission": [
            "Votes_aggregate"
          ]
        },
        "maxAge": 900,
        "swr": 900,
        "description": "To make the vote page query faster"
      }
    ]
  }
}

export default config;
