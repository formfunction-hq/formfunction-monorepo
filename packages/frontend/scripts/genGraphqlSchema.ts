import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { print } from "graphql";
import * as fs from "fs";

/**
 * Merges GraphQL schemas that are found in `packages/frontend`.
 *
 * We use this script to merge the main Hasura GraphQL API (which
 * houses the Hasura auto-generated queries/mutations + our custom
 * Apollo server's remote schema) with the Hasura Relay GraphQL API
 * (which exposes Connections on plural return types).
 *
 * See https://github.com/formfunction-hq/formfn-monorepo/pull/143
 * for more details on why this is necessary.
 *
 * This script should primarily be run by running the yarn script:
 *   `yarn gen-graphql`
 */
function run() {
  const loadedFiles = loadFilesSync(`schemas/*.graphql`);
  const typeDefs = mergeTypeDefs(loadedFiles, { ignoreFieldConflicts: true });
  const printedTypeDefs = print(typeDefs);
  fs.writeFileSync("schema.graphql", printedTypeDefs);
}

run();
