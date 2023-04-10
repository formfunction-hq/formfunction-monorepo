// https://explorer.solana.com/tx/5WeWEnXkTxMz8FKimFF1zPuyZq1z6HK7CpHT3QPMJwBg4tT4MU3ueFCduL9Zq65t4NxxHeBmP8sMjP6iJY7bmNzj?cluster=devnet
//
// For https://dev.formfunction.xyz/@pencilflip/8kX7765rn5vCZbMZMZFfrTojzjwuMLbAnHRyZpNXy9zv
const UPDATE_EDITION_DISTRIBUTOR_TX = {
  blockTime: 1652938091,
  meta: {
    err: null,
    fee: 5000,
    innerInstructions: [],
    logMessages: [
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: UpdateEditionDistributor",
      "Program log: Updated the starting price",
      "Program log: Updated the price function type",
      "Program log: Updated the price params",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 11808 of 1400000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [38310171668, 3695760, 1141440, 1461600, 2853600, 1169280],
    postTokenBalances: [],
    preBalances: [38310176668, 3695760, 1141440, 1461600, 2853600, 1169280],
    preTokenBalances: [],
    rewards: [],
    status: {
      Ok: null,
    },
  },
  slot: 135209740,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
          signer: true,
          writable: true,
        },
        {
          pubkey: "AqfjXfvBoLcSWbHcBeD9AG7RKHDhWGZuhFUjXvmxq76o",
          signer: false,
          writable: true,
        },
        {
          pubkey: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
          signer: false,
          writable: false,
        },
        {
          pubkey: "8kX7765rn5vCZbMZMZFfrTojzjwuMLbAnHRyZpNXy9zv",
          signer: false,
          writable: false,
        },
        {
          pubkey: "8NwL5VEmhtbUh6uxP1jwBwa3jojP5iAF5mQNZW4F66qe",
          signer: false,
          writable: false,
        },
        {
          pubkey: "SysvarC1ock11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
      ],
      instructions: [
        {
          accounts: [
            "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
            "8kX7765rn5vCZbMZMZFfrTojzjwuMLbAnHRyZpNXy9zv",
            "8NwL5VEmhtbUh6uxP1jwBwa3jojP5iAF5mQNZW4F66qe",
            "AqfjXfvBoLcSWbHcBeD9AG7RKHDhWGZuhFUjXvmxq76o",
            "SysvarC1ock11111111111111111111111111111111",
          ],
          data: "UwNziLVYS2uPh2fM11ETR1ZC31pvU3wzAmoaBwYRsrkQYdQxzXVpMceYuXyh",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "7cnqPLvtrpB1m3bcxvhu97rrcojmWKj6hpiyfcEUMP6S",
    },
    signatures: [
      "5WeWEnXkTxMz8FKimFF1zPuyZq1z6HK7CpHT3QPMJwBg4tT4MU3ueFCduL9Zq65t4NxxHeBmP8sMjP6iJY7bmNzj",
    ],
  },
};

export default UPDATE_EDITION_DISTRIBUTOR_TX;
