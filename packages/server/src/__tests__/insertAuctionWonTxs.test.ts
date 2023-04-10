import Typename from "src/types/enums/Typename";
import {
  NftTransactionExpress,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import { nanoid } from "nanoid";
import insertAuctionWonTxs from "src/utils/solana/txs/insertAuctionWonTxs";
import DEFAULT_AUCTION_COUNT from "src/constants/DefaultAuctionCount";

const ALICE = "alice";
const BOB = "bob";
const TOM = "tom";

const MINT = "1234";
const MINT_TIME = dayjs("01-15-2021 12:00", "MM-DD-YYYY HH:mm");

const AUCTION_DURATION_TEST = dayjs.duration({ hours: 24 });
const AUCTION_END_BUFFER = dayjs.duration({ seconds: 0 });
const TIME_EXTENSION_DURATION_TEST = dayjs.duration({ minutes: 15 });

const MINT_TX = {
  __typename: Typename.NftTransaction as const,
  auctionCount: DEFAULT_AUCTION_COUNT,
  creatorId: TOM,
  fromAddress: ALICE,
  id: nanoid(),
  mint: MINT,
  nftInfo: {
    __typename: Typename.NftTransactionNftInfo as const,
    mint: "",
    name: "test",
  },
  priceInLamports: 1000,
  timeCreated: MINT_TIME.toDate(),
  toAddress: BOB,
  type: NftTransactionTypeExpress_Enum.Minted,
};

// We don't care about the other fields for this test
function getTx(timeCreated: Date, type: NftTransactionTypeExpress_Enum) {
  return {
    __typename: Typename.NftTransaction as Typename.NftTransaction,
    auctionCount: DEFAULT_AUCTION_COUNT,
    creatorId: TOM,
    fromAddress: ALICE,
    id: nanoid(),
    mint: MINT,
    nftInfo: {
      __typename: Typename.NftTransactionNftInfo as const,
      mint: "",
      name: "test",
    },
    priceInLamports: 1000,
    timeCreated,
    toAddress: BOB,
    type,
  };
}

describe("insertAuctionWonTxs tests", () => {
  it("no inserts", async () => {
    const txs: Array<NftTransactionExpress> = [MINT_TX];

    const txsWithInserts = insertAuctionWonTxs(
      txs,
      AUCTION_DURATION_TEST,
      TIME_EXTENSION_DURATION_TEST,
      AUCTION_END_BUFFER
    );

    expect(txs.length).toEqual(txsWithInserts.length);
  });

  it("single insert", async () => {
    const txs: Array<NftTransactionExpress> = [
      getTx(
        dayjs("01-15-2021 14:00", "MM-DD-YYYY HH:mm").toDate(),
        NftTransactionTypeExpress_Enum.Bid
      ),
      MINT_TX,
    ];

    const txsWithInserts = insertAuctionWonTxs(
      txs,
      AUCTION_DURATION_TEST,
      TIME_EXTENSION_DURATION_TEST,
      AUCTION_END_BUFFER
    );

    expect(txsWithInserts.length - txs.length).toEqual(1);
    expect(
      txsWithInserts[0].type === NftTransactionTypeExpress_Enum.AuctionWon
    ).toBeTruthy();
  });

  it("two inserts", async () => {
    const txs: Array<NftTransactionExpress> = [
      getTx(
        dayjs("01-17-2021 16:00", "MM-DD-YYYY HH:mm").toDate(),
        NftTransactionTypeExpress_Enum.Bid
      ),
      getTx(
        dayjs("01-17-2021 14:00", "MM-DD-YYYY HH:mm").toDate(),
        NftTransactionTypeExpress_Enum.Bid
      ),
      getTx(
        dayjs("01-16-2021 14:00", "MM-DD-YYYY HH:mm").toDate(),
        NftTransactionTypeExpress_Enum.Sold
      ),
      getTx(
        dayjs("01-15-2021 14:00", "MM-DD-YYYY HH:mm").toDate(),
        NftTransactionTypeExpress_Enum.Bid
      ),
      MINT_TX,
    ];

    const txsWithInserts = insertAuctionWonTxs(
      txs,
      AUCTION_DURATION_TEST,
      TIME_EXTENSION_DURATION_TEST,
      AUCTION_END_BUFFER
    );

    expect(txsWithInserts.length - txs.length).toEqual(2);
    expect(
      txsWithInserts[0].type === NftTransactionTypeExpress_Enum.AuctionWon
    ).toBeTruthy();
    expect(
      txsWithInserts[4].type === NftTransactionTypeExpress_Enum.AuctionWon
    ).toBeTruthy();
  });

  it("time extension ended", async () => {
    const firstBidTime = dayjs("01-15-2021 14:00", "MM-DD-YYYY HH:mm");
    const lastBidTime = firstBidTime.add(
      dayjs.duration({
        hours: 23,
        minutes: 60 - TIME_EXTENSION_DURATION_TEST.asMinutes() / 2,
      })
    );

    const txs: Array<NftTransactionExpress> = [
      getTx(lastBidTime.toDate(), NftTransactionTypeExpress_Enum.Bid),
      getTx(firstBidTime.toDate(), NftTransactionTypeExpress_Enum.Bid),
      MINT_TX,
    ];

    const txsWithInserts = insertAuctionWonTxs(
      txs,
      AUCTION_DURATION_TEST,
      TIME_EXTENSION_DURATION_TEST,
      AUCTION_END_BUFFER
    );

    expect(txsWithInserts.length - txs.length).toEqual(1);
    expect(
      txsWithInserts[0].type === NftTransactionTypeExpress_Enum.AuctionWon
    ).toBeTruthy();
    expect(
      dayjs(txsWithInserts[0].timeCreated).isSameOrAfter(
        lastBidTime.add(TIME_EXTENSION_DURATION_TEST)
      )
    ).toBeTruthy();
  });

  it("time extension ended 2", async () => {
    const firstBidTime = dayjs().subtract(dayjs.duration({ minutes: 50 }));
    const secondBidTime = dayjs().subtract(dayjs.duration({ minutes: 25 }));
    const thirdBidTime = dayjs().subtract(dayjs.duration({ minutes: 20 }));
    const fourthBidTime = dayjs().subtract(dayjs.duration({ minutes: 15 }));
    const extDuration = dayjs.duration({ minutes: 10 });

    const txs: Array<NftTransactionExpress> = [
      getTx(fourthBidTime.toDate(), NftTransactionTypeExpress_Enum.Bid),
      getTx(thirdBidTime.toDate(), NftTransactionTypeExpress_Enum.Bid),
      getTx(secondBidTime.toDate(), NftTransactionTypeExpress_Enum.Bid),
      getTx(firstBidTime.toDate(), NftTransactionTypeExpress_Enum.Bid),
      MINT_TX,
    ];

    const txsWithInserts = insertAuctionWonTxs(
      txs,
      dayjs.duration({ minutes: 30 }),
      extDuration,
      AUCTION_END_BUFFER
    );

    expect(txsWithInserts.length - txs.length).toEqual(1);
    expect(
      txsWithInserts[0].type === NftTransactionTypeExpress_Enum.AuctionWon
    ).toBeTruthy();
    expect(
      dayjs(txsWithInserts[0].timeCreated).isSameOrAfter(
        fourthBidTime.add(extDuration)
      )
    ).toBeTruthy();
  });

  it("time extension not ended", async () => {
    const firstBidTime = dayjs().subtract(dayjs.duration({ minutes: 30 }));
    const lastBidTime = dayjs().subtract(dayjs.duration({ minutes: 5 }));

    const txs: Array<NftTransactionExpress> = [
      getTx(lastBidTime.toDate(), NftTransactionTypeExpress_Enum.Bid),
      getTx(firstBidTime.toDate(), NftTransactionTypeExpress_Enum.Bid),
      MINT_TX,
    ];

    const txsWithInserts = insertAuctionWonTxs(
      txs,
      dayjs.duration({ minutes: 30 }),
      dayjs.duration({ minutes: 10 }),
      AUCTION_END_BUFFER
    );

    expect(txsWithInserts.length - txs.length).toEqual(0);
  });

  it("time extension not ended 2", async () => {
    const firstBidTime = dayjs().subtract(dayjs.duration({ minutes: 40 }));
    const secondBidTime = dayjs().subtract(dayjs.duration({ minutes: 15 }));
    const thirdBidTime = dayjs().subtract(dayjs.duration({ minutes: 10 }));
    const fourthBidTime = dayjs().subtract(dayjs.duration({ minutes: 5 }));

    const txs: Array<NftTransactionExpress> = [
      getTx(fourthBidTime.toDate(), NftTransactionTypeExpress_Enum.Bid),
      getTx(thirdBidTime.toDate(), NftTransactionTypeExpress_Enum.Bid),
      getTx(secondBidTime.toDate(), NftTransactionTypeExpress_Enum.Bid),
      getTx(firstBidTime.toDate(), NftTransactionTypeExpress_Enum.Bid),
      MINT_TX,
    ];

    const txsWithInserts = insertAuctionWonTxs(
      txs,
      dayjs.duration({ minutes: 30 }),
      dayjs.duration({ minutes: 10 }),
      AUCTION_END_BUFFER
    );

    expect(txsWithInserts.length - txs.length).toEqual(0);
  });

  it("transfer while auction active", async () => {
    const firstBidTime = dayjs().subtract(dayjs.duration({ minutes: 50 }));
    const transferTime = dayjs().subtract(dayjs.duration({ minutes: 40 }));

    const txs: Array<NftTransactionExpress> = [
      getTx(transferTime.toDate(), NftTransactionTypeExpress_Enum.Transferred),
      getTx(firstBidTime.toDate(), NftTransactionTypeExpress_Enum.Bid),
      MINT_TX,
    ];

    const txsWithInserts = insertAuctionWonTxs(
      txs,
      dayjs.duration({ minutes: 30 }),
      dayjs.duration({ minutes: 10 }),
      AUCTION_END_BUFFER
    );

    expect(txsWithInserts.length - txs.length).toEqual(0);
  });
});
