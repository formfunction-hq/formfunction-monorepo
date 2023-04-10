import dayjs from "src/utils/dates/dayjsex";
import parseHolaplexRedeemPrintingTx from "src/utils/solana/txs/parse/holaplex/parseHolaplexRedeemPrintingTx";
import HOLAPLEX_REDEEM_PRINTING_TX from "src/__tests__/constants/HolaplexRedeemPrintingTx";

const CREATOR_ADDRESS = "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ";

describe("parseHolaplexRedeemPrintingTx tests", () => {
  it("parse redeem #1", () => {
    const results = parseHolaplexRedeemPrintingTx(
      HOLAPLEX_REDEEM_PRINTING_TX as any,
      CREATOR_ADDRESS
    );

    expect(results).not.toBeNull();

    const tx = results![0];
    const extra = results![1];

    expect(tx.fromAddress).toEqual(
      "2iZoRCuS29x4SiK9gKpoB4UicLc6aN3UusUxaQKhrbpT"
    );
    expect(tx.toAddress).toEqual(
      "2iZoRCuS29x4SiK9gKpoB4UicLc6aN3UusUxaQKhrbpT"
    );
    expect(tx.mint).toEqual("B4tk6Um3rruhcfJySzfFaEGQ68jmXzJdYVAYe336m5L7");
    expect(tx.txid).toEqual(
      "LgqTm1Sp4SY731UoDesdY3SCFWu4WVAg3o9CJWScSa26i5vNp7cQNArm24wGawBRXkW97U36QzuwnRhdHNufrkV"
    );
    expect(tx.timeCreated).toEqual(dayjs("2021-12-22T17:54:43.000Z").toDate());

    expect(extra.auctionAddress.toString()).toEqual(
      "D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ"
    );
  });
});
