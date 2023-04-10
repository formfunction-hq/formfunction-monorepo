// Need to import this way in order to spy on the module
// https://stackoverflow.com/a/54245672
import * as getConnection from "src/utils/solana/getConnection";

export default function mockGetConnection() {
  // TODO: return proper mock as needed
  // @ts-ignore
  jest.spyOn(getConnection, "default").mockImplementation(() => ({}));
}
