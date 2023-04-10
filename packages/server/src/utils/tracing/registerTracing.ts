/* eslint-disable max-classes-per-file */
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import {
  BasicTracerProvider,
  SimpleSpanProcessor,
  BatchSpanProcessor,
  TraceIdRatioBasedSampler,
  ParentBasedSampler,
  Span,
} from "@opentelemetry/sdk-trace-base";
import { AsyncHooksContextManager } from "@opentelemetry/context-async-hooks";
import * as api from "@opentelemetry/api";
import { PrismaInstrumentation } from "@prisma/instrumentation";
import { Resource } from "@opentelemetry/resources";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import isProd from "src/utils/isProd";
import getEnvironment from "src/utils/getEnvironment";
import Environment from "formfn-shared/dist/types/Environment";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { Context } from "@opentelemetry/api";
import ASYNC_LOCAL_STORAGE from "src/constants/AsyncLocalStorage";
import AsyncLocalStorageKey from "src/types/enums/AsyncLocalStorageKey";

function getApiKey() {
  const env = getEnvironment();
  switch (env) {
    case Environment.Local:
      return "REPLACEME";
    case Environment.Development:
      return "REPLACEME";
    case Environment.Testnet:
      return "REPLACEME";
    case Environment.Production:
      return "REPLACEME";
    default:
      return assertUnreachable(env);
  }
}

function getSampleRate() {
  const env = getEnvironment();
  switch (env) {
    case Environment.Local:
      // May want to increase during local development if debugging
      return 0.1;
    case Environment.Development:
    case Environment.Testnet:
      return 0.1;
    case Environment.Production:
      return 0.05;
    default:
      return assertUnreachable(env);
  }
}

function getServiceName() {
  return `formfunction-${getEnvironment()}`;
}

class MyBatchSpanProcessor extends BatchSpanProcessor {
  onStart(span: Span, parentContext: Context) {
    super.onStart(span, parentContext);
    Object.values(AsyncLocalStorageKey)
      .filter((val) => val !== AsyncLocalStorageKey.Request)
      .forEach((val) => {
        span.setAttribute(val, ASYNC_LOCAL_STORAGE.getStore()?.get(val));
      });
  }
}

class MySimpleSpanProcessor extends SimpleSpanProcessor {
  onStart(span: Span, parentContext: Context) {
    super.onStart(span, parentContext);
    Object.values(AsyncLocalStorageKey)
      .filter((val) => val !== AsyncLocalStorageKey.Request)
      .forEach((val) => {
        span.setAttribute(val, ASYNC_LOCAL_STORAGE.getStore()?.get(val));
      });
  }
}

// Inspired by https://www.prisma.io/docs/concepts/components/prisma-client/opentelemetry-tracing#register-tracing-in-your-application
export default function registerTracing() {
  const contextManager = new AsyncHooksContextManager().enable();

  api.context.setGlobalContextManager(contextManager);

  const traceExporter = new OTLPTraceExporter({
    headers: {
      "x-honeycomb-team": getApiKey(),
    },
    url: "https://api.honeycomb.io/v1/traces",
  });

  // Configure the trace provider
  const provider = new BasicTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: process.env.DD_SERVICE,
      [SemanticResourceAttributes.SERVICE_NAME]: getServiceName(),
      [SemanticResourceAttributes.SERVICE_VERSION]: "1.0.0",
    }),
    sampler: new ParentBasedSampler({
      root: new TraceIdRatioBasedSampler(getSampleRate()),
    }),
  });

  if (isProd()) {
    provider.addSpanProcessor(new MyBatchSpanProcessor(traceExporter));
  } else {
    provider.addSpanProcessor(new MySimpleSpanProcessor(traceExporter));
  }

  // Register your auto-instrumentors
  registerInstrumentations({
    instrumentations: [new PrismaInstrumentation({ middleware: true })],
    tracerProvider: provider,
  });

  // Register the provider
  provider.register();
}
