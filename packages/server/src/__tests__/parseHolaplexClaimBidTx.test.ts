import dayjs from "src/utils/dates/dayjsex";
import parseHolaplexClaimBidTx from "src/utils/solana/txs/parse/holaplex/parseHolaplexClaimBidTx";
import HOLAPLEX_CLAIM_BID_TX from "src/__tests__/constants/HolaplexClaimBidTx";
import HOLAPLEX_CLAIM_BID_TX2 from "src/__tests__/constants/HolaplexClaimBidTx2";

const CREATOR_ADDRESS = "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ";

describe("parseHolaplexClaimBidTx tests", () => {
  it("parse claim bid #1", () => {
    const results = parseHolaplexClaimBidTx(
      HOLAPLEX_CLAIM_BID_TX as any,
      "9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN",
      CREATOR_ADDRESS
    );

    expect(results).not.toBeNull();
    expect(results!.priceInLamports).toEqual(5.5e9);
    expect(results!.fromAddress).toEqual(CREATOR_ADDRESS);
    expect(results!.toAddress).toEqual(
      "2iZoRCuS29x4SiK9gKpoB4UicLc6aN3UusUxaQKhrbpT"
    );
    expect(results!.txid).toEqual(
      "5AWq1gzTetG62PUdzAwTcjXrPeExwny995E5gshSd5viMMnaf1LatDKmYUm9vydUxeMFNdGuV5g8EfBuSsoaXGwn"
    );
    expect(results!.timeCreated).toEqual(
      dayjs("2021-12-22T17:54:48.000Z").toDate()
    );
  });

  it("parse claim bid #2", () => {
    const results = parseHolaplexClaimBidTx(
      HOLAPLEX_CLAIM_BID_TX2 as any,
      "XTa3DXzbxyhaUPjyzLMnFecJFFTN4Fp3eQgvhnJKSLS",
      CREATOR_ADDRESS
    );

    expect(results).not.toBeNull();
    expect(results!.priceInLamports).toEqual(9.5e9);
    expect(results!.fromAddress).toEqual(CREATOR_ADDRESS);
    expect(results!.toAddress).toEqual(
      "6v9m78f5qijqHMpF4apJMfyYV7EkwZsv7qNc6TmnGKPy"
    );
    expect(results!.txid).toEqual(
      "64eUQ8agsLY7amWJ6ZxMmF3myTCLGnKunxSsgBN8fCPQCA83zD84UWk11wK5Q3LMaUwc7eQV4jFhvoRTRfVBNCaU"
    );
    expect(results!.timeCreated).toEqual(
      dayjs("2021-12-22T18:10:27.000Z").toDate()
    );
  });
});
