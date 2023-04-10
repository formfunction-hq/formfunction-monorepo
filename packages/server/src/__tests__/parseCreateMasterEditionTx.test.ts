import parseCreateMasterEditionTx from "src/utils/solana/txs/parse/metaplex/parseCreateMasterEditionTx";
import CREATE_MASTER_EDITION_TX from "src/__tests__/constants/CreateMasterEditionTx";

describe("parseCreateMasterEditionTx tests", () => {
  it("parse #1", () => {
    const results = parseCreateMasterEditionTx(CREATE_MASTER_EDITION_TX as any);

    expect(results).not.toBeNull();
    expect(results!.mint.toString()).toEqual(
      "9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN"
    );
  });
});
