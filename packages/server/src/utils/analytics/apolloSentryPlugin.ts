import { Span } from "@sentry/tracing";
import MyContext from "src/types/MyContext";
import { ApolloServerPlugin } from "@apollo/server";
import SentryTagName from "src/types/enums/SentryTagName";

const apolloSentryPlugin: ApolloServerPlugin<MyContext> = {
  async requestDidStart({ contextValue: contextValueRequestDidStart }) {
    let resolveOperationSpan: Span;
    const resolveSourceSpan =
      contextValueRequestDidStart.transaction.startChild({
        description: "resolveSource",
        op: "resolveSource",
      });

    return {
      async didResolveOperation() {
        if (resolveOperationSpan != null) {
          resolveOperationSpan.finish();
        }
      },
      async didResolveSource() {
        resolveOperationSpan =
          contextValueRequestDidStart.transaction.startChild({
            description: "resolveOperation",
            op: "resolveOperation",
          });
        resolveSourceSpan.finish();
      },
      async executionDidStart() {
        const executionSpan =
          contextValueRequestDidStart.transaction.startChild({
            description: "execution",
            op: "execution",
          });

        return {
          async executionDidEnd() {
            executionSpan.finish();
          },
          willResolveField({ args, contextValue, info }) {
            const mint = args?.input?.mint;
            if (mint != null) {
              contextValue.transaction.setTag(SentryTagName.Mint, mint);
            }

            // hook for each new resolver
            const span = contextValue.transaction.startChild({
              description: `${info.parentType.name}.${info.fieldName}`,
              op: "resolver",
            });
            return () => {
              // this will execute once the resolver is finished
              span.finish();
            };
          },
        };
      },
      async parsingDidStart({ contextValue }) {
        const span = contextValue.transaction.startChild({
          description: "parsing",
          op: "parsing",
        });

        return async () => {
          span.finish();
        };
      },
      async validationDidStart({ contextValue }) {
        const span = contextValue.transaction.startChild({
          description: "validation",
          op: "validation",
        });

        return async () => {
          span.finish();
        };
      },
      async willSendResponse({ contextValue }) {
        // hook for transaction finished
        contextValue.transaction.finish();
      },
    };
  },
};

export default apolloSentryPlugin;
