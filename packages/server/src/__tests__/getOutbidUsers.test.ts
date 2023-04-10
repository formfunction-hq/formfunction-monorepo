import { NftTransaction } from "@prisma/client";
import { Dayjs } from "dayjs";
import dayjs from "src/utils/dates/dayjsex";
import { nanoid } from "nanoid";
import getOutbidUsers from "src/utils/auction/getOutbidUsers";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import getLatestOutbidUser from "src/utils/auction/getLatestOutbidUser";

const BIDDER1 = "bidder1";
const BIDDER2 = "bidder2";
const BIDDER3 = "bidder3";
const SELLER = "seller";

function getTx(
  timeCreated: Dayjs,
  fromUserId: string,
  price: number,
  txid: string | number,
  type = NftTransactionTypeExpress_Enum.Bid
): NftTransaction {
  return {
    auctionCount: 1,
    comment: null,
    creatorId: "creator",
    currencyId: "test",
    fromUserId,
    id: nanoid(),
    isCrossmint: false,
    ixIndex: -1,
    ixInnerIndex: -1,
    mint: "MINT",
    price: BigInt(price),
    source: null,
    timeCreated: timeCreated.toDate(),
    toUserId: SELLER,
    txSizeInBytes: null,
    txVersion: null,
    txid: txid.toString(),
    type,
    usdPrice: null,
  };
}

const now = dayjs();

function getTimeXMinutesAgo(minutes: number) {
  return now.subtract(dayjs.duration({ minutes }));
}

describe("getOutbidUsers + getLatestOutbidUser tests", () => {
  it("first bid", async () => {
    const txs = [getTx(getTimeXMinutesAgo(10), BIDDER1, 5, 0)];

    const outbidUsers = getOutbidUsers(txs, "0", BIDDER1);
    expect(outbidUsers.length).toEqual(0);

    const outbidUser = getLatestOutbidUser(txs, "0", BIDDER1);
    expect(outbidUser).toBeNull();
  });

  it("two bidders", async () => {
    const txs = [
      getTx(getTimeXMinutesAgo(5), BIDDER2, 10, 1),
      getTx(getTimeXMinutesAgo(10), BIDDER1, 5, 0),
    ];

    const outbidUsers = getOutbidUsers(txs, "1", BIDDER2);
    expect(outbidUsers.length).toEqual(1);
    expect(outbidUsers[0]).toEqual(BIDDER1);

    const outbidUser = getLatestOutbidUser(txs, "1", BIDDER2);
    expect(outbidUser).not.toBeNull();
    expect(outbidUser!.bidPrice).toEqual(5);
    expect(outbidUser!.userId).toEqual(BIDDER1);
  });

  it("outbid yourself", async () => {
    const txs = [
      getTx(getTimeXMinutesAgo(5), BIDDER2, 10, 2),
      getTx(getTimeXMinutesAgo(10), BIDDER1, 5, 1),
      getTx(getTimeXMinutesAgo(20), BIDDER2, 1, 0),
    ];

    const outbidUsers = getOutbidUsers(txs, "2", BIDDER2);
    // BIDDER2 should not show up in outbidUsers, because they were the latest bidder
    expect(outbidUsers.length).toEqual(1);
    expect(outbidUsers[0]).toEqual(BIDDER1);

    const outbidUser = getLatestOutbidUser(txs, "2", BIDDER2);
    expect(outbidUser).not.toBeNull();
    expect(outbidUser!.bidPrice).toEqual(5);
    expect(outbidUser!.userId).toEqual(BIDDER1);
  });

  it("outbid yourself 2", async () => {
    const txs = [
      getTx(getTimeXMinutesAgo(5), BIDDER2, 10, 2),
      getTx(getTimeXMinutesAgo(10), BIDDER2, 5, 1),
      getTx(getTimeXMinutesAgo(20), BIDDER1, 1, 0),
    ];

    const outbidUsers = getOutbidUsers(txs, "2", BIDDER2);
    // BIDDER2 should not show up in outbidUsers, because they were the latest bidder
    expect(outbidUsers.length).toEqual(1);
    expect(outbidUsers[0]).toEqual(BIDDER1);

    const outbidUser = getLatestOutbidUser(txs, "2", BIDDER2);
    expect(outbidUser).not.toBeNull();
    expect(outbidUser!.bidPrice).toEqual(5);
    // It's possible to outbid yourself
    expect(outbidUser!.userId).toEqual(BIDDER2);
  });

  it("outbid multiple bids from same bidder", async () => {
    const txs = [
      getTx(getTimeXMinutesAgo(5), BIDDER2, 10, 2),
      getTx(getTimeXMinutesAgo(10), BIDDER1, 5, 1),
      getTx(getTimeXMinutesAgo(20), BIDDER1, 1, 0),
    ];

    const outbidUsers = getOutbidUsers(txs, "2", BIDDER2);
    expect(outbidUsers.length).toEqual(1);
    // BIDDER1 should only show up once
    expect(outbidUsers[0]).toEqual(BIDDER1);

    const outbidUser = getLatestOutbidUser(txs, "2", BIDDER2);
    expect(outbidUser).not.toBeNull();
    expect(outbidUser!.bidPrice).toEqual(5);
    expect(outbidUser!.userId).toEqual(BIDDER1);
  });

  it("multiple outbid users", async () => {
    const txs = [
      getTx(getTimeXMinutesAgo(5), BIDDER3, 10, 2),
      getTx(getTimeXMinutesAgo(10), BIDDER2, 5, 1),
      getTx(getTimeXMinutesAgo(20), BIDDER1, 1, 0),
    ];

    const outbidUsers = getOutbidUsers(txs, "2", BIDDER3);

    expect(outbidUsers.length).toEqual(2);
    expect(outbidUsers[0]).toEqual(BIDDER2);
    expect(outbidUsers[1]).toEqual(BIDDER1);

    const outbidUser = getLatestOutbidUser(txs, "2", BIDDER3);
    expect(outbidUser).not.toBeNull();
    expect(outbidUser!.bidPrice).toEqual(5);
    expect(outbidUser!.userId).toEqual(BIDDER2);
  });
});
