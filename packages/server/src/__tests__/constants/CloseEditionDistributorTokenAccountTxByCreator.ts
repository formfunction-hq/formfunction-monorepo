// https://explorer.solana.com/tx/3EnagNiZZfhMhsDFLtMW6HXwjJnjYC6rMzLnD28uKCoeFS1CNtGU3W6M9WiDpNi4gdqM3f922XzZuh67173vjQmu?cluster=devnet
//
// For https://dev.formfunction.xyz/@burner/CZcBSySzxYbrwwrjcdDEMi3sVw2N9jKNtKLNV5JXxWMX
const CLOSE_EDITION_DISTRIBUTOR_TOKEN_ACCOUNT_TX_BY_CREATOR = {
  blockTime: 1652936528,
  meta: {
    err: null,
    fee: 5000,
    innerInstructions: [
      {
        index: 0,
        instructions: [
          {
            parsed: {
              info: {
                amount: "1",
                authority: "9fpZkiddArMKmwfsAnhv8SsP8NH6waK1rpsB7fTA7wJw",
                destination: "5JqczQZBnFWfnPoJvZAB7jbzK3tqtMg32oYhVvtjZkVY",
                source: "CXcUftv5fsmnAAohKPQZ5bDQX4tNuyUjgFiLst7vbWMb",
              },
              type: "transfer",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                account: "CXcUftv5fsmnAAohKPQZ5bDQX4tNuyUjgFiLst7vbWMb",
                destination: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
                owner: "9fpZkiddArMKmwfsAnhv8SsP8NH6waK1rpsB7fTA7wJw",
              },
              type: "closeAccount",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
        ],
      },
    ],
    logMessages: [
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: CloseEditionDistributorTokenAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: Transfer",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3052 of 1385461 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: CloseAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2104 of 1379281 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 24137 of 1400000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      24410413600, 2039280, 0, 1141440, 4085520, 3695760, 1461600, 398947363000,
      953185920,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
        mint: "CZcBSySzxYbrwwrjcdDEMi3sVw2N9jKNtKLNV5JXxWMX",
        owner: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
    ],
    preBalances: [
      24408379320, 2039280, 2039280, 1141440, 4085520, 3695760, 1461600,
      398947363000, 953185920,
    ],
    preTokenBalances: [
      {
        accountIndex: 1,
        mint: "CZcBSySzxYbrwwrjcdDEMi3sVw2N9jKNtKLNV5JXxWMX",
        owner: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
        uiTokenAmount: {
          amount: "0",
          decimals: 0,
          uiAmount: null,
          uiAmountString: "0",
        },
      },
      {
        accountIndex: 2,
        mint: "CZcBSySzxYbrwwrjcdDEMi3sVw2N9jKNtKLNV5JXxWMX",
        owner: "9fpZkiddArMKmwfsAnhv8SsP8NH6waK1rpsB7fTA7wJw",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
    ],
    rewards: [],
    status: {
      Ok: null,
    },
  },
  slot: 135205760,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
          signer: true,
          writable: true,
        },
        {
          pubkey: "5JqczQZBnFWfnPoJvZAB7jbzK3tqtMg32oYhVvtjZkVY",
          signer: false,
          writable: true,
        },
        {
          pubkey: "CXcUftv5fsmnAAohKPQZ5bDQX4tNuyUjgFiLst7vbWMb",
          signer: false,
          writable: true,
        },
        {
          pubkey: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
          signer: false,
          writable: false,
        },
        {
          pubkey: "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
          signer: false,
          writable: false,
        },
        {
          pubkey: "9fpZkiddArMKmwfsAnhv8SsP8NH6waK1rpsB7fTA7wJw",
          signer: false,
          writable: false,
        },
        {
          pubkey: "CZcBSySzxYbrwwrjcdDEMi3sVw2N9jKNtKLNV5JXxWMX",
          signer: false,
          writable: false,
        },
        {
          pubkey: "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
          signer: false,
          writable: false,
        },
        {
          pubkey: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          signer: false,
          writable: false,
        },
      ],
      instructions: [
        {
          accounts: [
            "CZcBSySzxYbrwwrjcdDEMi3sVw2N9jKNtKLNV5JXxWMX",
            "9fpZkiddArMKmwfsAnhv8SsP8NH6waK1rpsB7fTA7wJw",
            "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "CXcUftv5fsmnAAohKPQZ5bDQX4tNuyUjgFiLst7vbWMb",
            "5JqczQZBnFWfnPoJvZAB7jbzK3tqtMg32oYhVvtjZkVY",
            "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          ],
          data: "2rEnfNQDot1",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "J8qGga2tY26QJJYgsHUFaafWbsYBkSYKHGdYE8Bwurw3",
    },
    signatures: [
      "3EnagNiZZfhMhsDFLtMW6HXwjJnjYC6rMzLnD28uKCoeFS1CNtGU3W6M9WiDpNi4gdqM3f922XzZuh67173vjQmu",
    ],
  },
};

export default CLOSE_EDITION_DISTRIBUTOR_TOKEN_ACCOUNT_TX_BY_CREATOR;
