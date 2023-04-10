import {
  GatewayInterface,
  GatewayLoadResult,
  GatewaySchemaLoadOrUpdateCallback,
  GatewayUnsubscriber,
} from "@apollo/server-gateway-interface";
import { CompiledQuery, compileQuery, isCompiledQuery } from "graphql-jit";
import LRUCache from "lru-cache";
import schema from "src/schema/schema";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { GraphQLError } from "graphql";

const CACHE_MAX = 1000;

export default class MyGateway implements GatewayInterface {
  private schemaCallback?: GatewaySchemaLoadOrUpdateCallback;

  async load(): Promise<GatewayLoadResult> {
    const cache = new LRUCache<string, CompiledQuery>({ max: CACHE_MAX });
    this.schemaCallback?.({ apiSchema: schema, coreSupergraphSdl: "" });
    return {
      executor: async ({
        context,
        document,
        operationName,
        request,
        queryHash,
      }) => {
        const prefix = operationName || "NotParameterized";
        const cacheKey = `${prefix}-${queryHash}`;
        let compiledQuery = cache.get(cacheKey);
        if (compiledQuery == null) {
          const compilationResult = compileQuery(
            schema,
            document,
            operationName || undefined,
            {}
          );
          if (isCompiledQuery(compilationResult)) {
            compiledQuery = compilationResult;
            cache.set(cacheKey, compiledQuery);
          } else {
            // ...is ExecutionResult
            return compilationResult;
          }
        }
        const result = await compiledQuery.query(
          undefined,
          context,
          request.variables || {}
        );
        result.errors = result.errors?.map(
          (error) =>
            new GraphQLError(
              error.message,
              error.nodes,
              error.source,
              error.positions,
              error.path,
              error.originalError,
              // This is the part that's needed so that the errors get sent to the client
              // properly
              error.extensions ?? []
            )
        );
        return result;
      },
    };
  }

  onSchemaLoadOrUpdate(
    callback: GatewaySchemaLoadOrUpdateCallback
  ): GatewayUnsubscriber {
    this.schemaCallback = callback;
    return emptyFunction;
  }

  // eslint-disable-next-line class-methods-use-this, no-empty-function, @typescript-eslint/no-empty-function
  async stop() {}
}
