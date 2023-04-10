import { GraphQLFieldConfig, GraphQLInt } from "graphql";
import sleep from "formfn-shared/dist/utils/sleep";
import dayjs from "src/utils/dates/dayjsex";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const testSleepQueryField: GraphQLFieldConfig<unknown, any> = {
  args: {
    seconds: {
      type: gqlNonNull(GraphQLInt),
    },
  },
  description: "To help test/debug behavior of long running queries",
  async resolve(_source, { seconds }): Promise<number> {
    await sleep(dayjs.duration({ seconds }));
    return seconds;
  },
  type: GraphQLInt,
};

export default testSleepQueryField;
