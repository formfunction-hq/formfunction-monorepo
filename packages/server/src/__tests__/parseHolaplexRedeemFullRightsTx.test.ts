import dayjs from "src/utils/dates/dayjsex";
import parseHolaplexRedeemFullRightsTx from "src/utils/solana/txs/parse/holaplex/parseHolaplexRedeemFullRightsTx";
import HOLAPLEX_REDEEM_FULL_RIGHTS_TX from "src/__tests__/constants/HolaplexRedeemFullRightsTx";

const CREATOR_ADDRESS = "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ";

describe("parseHolaplexRedeemFullRightsTx tests", () => {
  it("parse #1", () => {
    const results = parseHolaplexRedeemFullRightsTx(
      HOLAPLEX_REDEEM_FULL_RIGHTS_TX as any,
      CREATOR_ADDRESS
    );

    expect(results).not.toBeNull();

    const tx = results![0];
    const extra = results![1];

    expect(tx.fromAddress).toEqual(
      "G14pZL3RUstQGFNyuyUq7S98f5mGgHDJ8Qoh5F8njVnY"
    );
    expect(tx.toAddress).toEqual(
      "G14pZL3RUstQGFNyuyUq7S98f5mGgHDJ8Qoh5F8njVnY"
    );
    expect(tx.mint).toEqual("2igx2ajor8YL24u5GUPcs6tryDVuajcug4bhZMW8fhhA");
    expect(tx.txid).toEqual(
      "61uNweAcrQKwm5Jm2GC2cdkR87pCavEQvNaVQXmJ4woH9nuE3EELbA9MpAdwt3ciuWmUrhM5DRLxNurQ8JCMaJxn"
    );
    expect(tx.timeCreated).toEqual(dayjs("2022-02-06T17:11:56.000Z").toDate());

    expect(extra.auctionAddress.toString()).toEqual(
      "DjmGk72JRBJMFx6c6yyp4VR1oYKppQqa5rZRkdSRiwpB"
    );
  });
});
