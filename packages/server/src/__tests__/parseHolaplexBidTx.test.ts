import parseHolaplexBidTx from "src/utils/solana/txs/parse/holaplex/parseHolaplexBidTx";
import HOLAPLEX_BID_TX from "src/__tests__/constants/HolaplexBidTx";
import dayjs from "src/utils/dates/dayjsex";
import HOLAPLEX_BID_TX2 from "src/__tests__/constants/HolaplexBidTx2";

const CREATOR_ADDRESS = "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ";
const MINT_ADDRESS = "9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN";

describe("parseHolaplexBidTx tests", () => {
  it("parse bid #1", () => {
    const results = parseHolaplexBidTx(
      HOLAPLEX_BID_TX as any,
      MINT_ADDRESS,
      CREATOR_ADDRESS
    );

    expect(results).not.toBeNull();
    expect(results!.priceInLamports).toEqual(1e9);
    expect(results!.fromAddress).toEqual(
      "Bq34mzpPuWLDvScjKB8HYuqWJoX8PfPKbmjSqFBBwFb6"
    );
    expect(results!.toAddress).toEqual(CREATOR_ADDRESS);
    expect(results!.txid).toEqual(
      "o1qP6cTghjEH88sqm1VEsknkyYVBgDZcHJJ3ZHNCZMQ6wvXMJbAKD4vUQ3mfVvHdZiSh4Zwh5JAz8dNbJzzTMWk"
    );
    expect(results!.timeCreated).toEqual(
      dayjs("2021-12-21T18:49:18.000Z").toDate()
    );
  });

  it("parse bid #2", () => {
    const results = parseHolaplexBidTx(
      HOLAPLEX_BID_TX2 as any,
      MINT_ADDRESS,
      CREATOR_ADDRESS
    );

    expect(results).not.toBeNull();
    expect(results!.priceInLamports).toEqual(2.5e9);
    expect(results!.fromAddress).toEqual(
      "8FzdJvJk997SXuyZMejVmwfTbMgzCpDs1KxDSeNzUHHj"
    );
    expect(results!.toAddress).toEqual(CREATOR_ADDRESS);
    expect(results!.txid).toEqual(
      "GLX4rjVax72YXNmQ2R3ZbWygQkcWEKz6yPkbbMn9ZAVNdG33V5coqGxSnd5ZM9YiuAqZQYXBE22TGGePRNjutE6"
    );
    expect(results!.timeCreated).toEqual(
      dayjs("2021-12-22T13:07:48.000Z").toDate()
    );
  });
});
