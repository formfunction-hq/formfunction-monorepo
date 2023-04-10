import dayjs from "src/utils/dates/dayjsex";
import parseHolaplexRedeemTx from "src/utils/solana/txs/parse/holaplex/parseHolaplexRedeemTx";
import HOLAPLEX_REDEEM_TX from "src/__tests__/constants/HolaplexRedeemTx";

const CREATOR_ADDRESS = "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ";

describe("parseHolaplexRedeemTx tests", () => {
  it("parse redeem #1", () => {
    const results = parseHolaplexRedeemTx(
      HOLAPLEX_REDEEM_TX as any,
      CREATOR_ADDRESS
    );

    expect(results).not.toBeNull();

    const tx = results![0];
    const extra = results![1];

    expect(tx.fromAddress).toEqual(
      "stat1kFydLtXjmpPfJhRkenmXYGa1bNwzNAJ9qyiyht"
    );
    expect(tx.toAddress).toEqual("stat1kFydLtXjmpPfJhRkenmXYGa1bNwzNAJ9qyiyht");
    expect(tx.mint).toEqual("EeA3AThxrYFcdTBKchUF1hftgaYF3TRQR5ASoifVt6iY");
    expect(tx.txid).toEqual(
      "JW5K1774nLERsqZm2ujZMhJtu27JrYqaz61DMixymjAzx7nUykMmSTx9P6QLBBZiSKLBTVhJqXM86RpkHnTyeHy"
    );
    expect(tx.timeCreated).toEqual(dayjs("2022-03-05T19:43:56.000Z").toDate());

    expect(extra.auctionAddress.toString()).toEqual(
      "HFSy1KBxgQF2b9MfbTcVB6zJqRfmSBXTbqLuTEzSb9tB"
    );
  });
});
