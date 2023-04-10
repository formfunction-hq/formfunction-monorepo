import { NextFunction, Request, Response } from "express";
import axios from "axios";
import logEventToLoki from "src/utils/analytics/logEventToLoki";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import jsonStringify from "formfn-shared/dist/utils/jsonStringify";

/**
 * Fetch perf stats from Hasura GQL API and push them to Loki.
 */
export default async function pushHasuraPerfToLoki(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { token, projectId, interval } = {
    // Default interval to calculate
    // average execution time for Hasura requests
    interval: 15 * 1000,
    projectId: "c2c8e948-1a38-41a5-ac3f-44af614e5ce1",
    token: "KrTGXgm0PzlFRqgn26y76x4bEubu3h6ZqS1rcz9QXZDkgH1vU2EwAhAupgy8WkBi",
    ...req.query,
  };

  try {
    const response = await axios({
      data: {
        query: `
        query fetchQueryList(
          $limit: Int! = 1000,
          $offset: Int! = 0,
          $fromTime: timestamptz! = "${new Date(
            new Date().getTime() - interval
          ).toISOString()}",
          $toTime: timestamptz! = "${new Date().toISOString()}",
          $operation_id: [String!] = [],
          $operation_name: [String!] = [],
          $operation_type: [String!] = [],
          $transport: [String!] = [],
          $user_role: [String!] = [],
          $client_name: [String!] = [],
          $groupBys: [String!] = ["operation_name"],
          $project_id: [uuid!] = ["${projectId}"]
        ) {
          searchUsageMetricsAggregate(
            args: {
              from_time: $fromTime
              to_time: $toTime
              group_by: $groupBys
              operation_types: $operation_type
              operation_ids: $operation_id
              operation_names: $operation_name
              transports: $transport
              project_ids: $project_id
              user_roles: $user_role
              client_names: $client_name
            }
          ) {
            count
          }
          searchUsageMetrics(
            args: {
              from_time: $fromTime
              to_time: $toTime
              group_by: $groupBys
              operation_types: $operation_type
              operation_ids: $operation_id
              operation_names: $operation_name
              project_ids: $project_id
              user_roles: $user_role
              client_names: $client_name
              transports: $transport
              limit: $limit
              offset: $offset
            }
          ) {
            operation_id
            operation_name
            operation_type
            client_name
            role: user_role
            request_count
            average_response_size
            average_execution_time
            error_count
            transport
          }
        }
          `,
      },
      headers: {
        Authorization: `pat ${token}`,
        "content-type": "application/json",
      },
      method: "POST",
      url: "https://us-west-1-aws.metrics.pro.hasura.io/v1/graphql",
    });
    const { searchUsageMetrics } = response.data?.data || {};

    const timestamp = new Date().getTime() * 1000000;
    if (searchUsageMetrics?.length > 0) {
      await logEventToLoki(
        AnalyticsEvent.HasuraPerf,
        null,
        undefined,
        searchUsageMetrics.map((metric: any) => [
          timestamp.toString(),
          jsonStringify(metric),
        ])
      );
    }
    res.json({ hasuraData: searchUsageMetrics, success: true });
  } catch (e) {
    logError(AnalyticsEvent.HasuraPerf, e as Error);
    res.json({ error: e, success: false });
  }
}
