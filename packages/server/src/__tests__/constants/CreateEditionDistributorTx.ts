// https://explorer.solana.com/tx/zrbmaWXQT3CFh7zcqroq3kGMacgqdX6Vxm63VpruVRrZdG57Sscjqxfsez2gsfvKPeB6oD8gugDSyvRBU2MCea4?cluster=devnet
//
// For https://dev.formfunction.xyz/@burner/CZcBSySzxYbrwwrjcdDEMi3sVw2N9jKNtKLNV5JXxWMX
const CREATE_EDITION_DISTRIBUTOR_TX = {
  blockTime: 1652587477,
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
                lamports: 3695760,
                newAccount: "9fpZkiddArMKmwfsAnhv8SsP8NH6waK1rpsB7fTA7wJw",
                owner: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
                source: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
                space: 403,
              },
              type: "createAccount",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
        ],
      },
      {
        index: 1,
        instructions: [
          {
            parsed: {
              info: {
                lamports: 2039280,
                newAccount: "CXcUftv5fsmnAAohKPQZ5bDQX4tNuyUjgFiLst7vbWMb",
                owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                source: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
                space: 165,
              },
              type: "createAccount",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: [
              "CXcUftv5fsmnAAohKPQZ5bDQX4tNuyUjgFiLst7vbWMb",
              "CZcBSySzxYbrwwrjcdDEMi3sVw2N9jKNtKLNV5JXxWMX",
            ],
            data: "6VoXEgvARThdA3RmPFwuFcRJmdFrvMKaiZk32cF8yR5ju",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
        ],
      },
    ],
    logMessages: [
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: CreateEditionDistributor",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 20613 of 1400000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]",
      "Program log: Create",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Initialize the associated token account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeAccount3",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2958 of 1367094 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 15910 of 1379387 compute units",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: Transfer",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3051 of 1363477 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
    ],
    postBalances: [
      25359184560, 2039280, 3695760, 2039280, 1, 1141440, 2853600, 853073280,
      1461600, 1169280, 1009200, 953185920,
    ],
    postTokenBalances: [
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
        accountIndex: 3,
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
    preBalances: [
      25364924600, 2039280, 0, 0, 1, 1141440, 2853600, 853073280, 1461600,
      1169280, 1009200, 953185920,
    ],
    preTokenBalances: [
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
    rewards: [],
    status: {
      Ok: null,
    },
  },
  slot: 134310957,
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
          pubkey: "9fpZkiddArMKmwfsAnhv8SsP8NH6waK1rpsB7fTA7wJw",
          signer: false,
          writable: true,
        },
        {
          pubkey: "CXcUftv5fsmnAAohKPQZ5bDQX4tNuyUjgFiLst7vbWMb",
          signer: false,
          writable: true,
        },
        {
          pubkey: "11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
          signer: false,
          writable: false,
        },
        {
          pubkey: "89CdJsezASVXae1qGhuDi4KbWwQ4EKNjat7R7P7ov153",
          signer: false,
          writable: false,
        },
        {
          pubkey: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          signer: false,
          writable: false,
        },
        {
          pubkey: "CZcBSySzxYbrwwrjcdDEMi3sVw2N9jKNtKLNV5JXxWMX",
          signer: false,
          writable: false,
        },
        {
          pubkey: "SysvarC1ock11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "SysvarRent111111111111111111111111111111111",
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
            "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
            "CZcBSySzxYbrwwrjcdDEMi3sVw2N9jKNtKLNV5JXxWMX",
            "5JqczQZBnFWfnPoJvZAB7jbzK3tqtMg32oYhVvtjZkVY",
            "89CdJsezASVXae1qGhuDi4KbWwQ4EKNjat7R7P7ov153",
            "9fpZkiddArMKmwfsAnhv8SsP8NH6waK1rpsB7fTA7wJw",
            "11111111111111111111111111111111",
            "SysvarC1ock11111111111111111111111111111111",
          ],
          data: "D5xLe7PgxiiY1nFMb28ZurnxoVRwzYsh8mFfTHtYRYHKhW7VARTwagw",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          parsed: {
            info: {
              account: "CXcUftv5fsmnAAohKPQZ5bDQX4tNuyUjgFiLst7vbWMb",
              mint: "CZcBSySzxYbrwwrjcdDEMi3sVw2N9jKNtKLNV5JXxWMX",
              rentSysvar: "SysvarRent111111111111111111111111111111111",
              source: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
              systemProgram: "11111111111111111111111111111111",
              tokenProgram: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              wallet: "9fpZkiddArMKmwfsAnhv8SsP8NH6waK1rpsB7fTA7wJw",
            },
            type: "create",
          },
          program: "spl-associated-token-account",
          programId: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
        },
        {
          parsed: {
            info: {
              amount: "1",
              authority: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
              destination: "CXcUftv5fsmnAAohKPQZ5bDQX4tNuyUjgFiLst7vbWMb",
              source: "5JqczQZBnFWfnPoJvZAB7jbzK3tqtMg32oYhVvtjZkVY",
            },
            type: "transfer",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
      ],
      recentBlockhash: "Bt7d9EHZNes77vBYK4Pa9gon83njoaRBvpUuvHpPxwj1",
    },
    signatures: [
      "zrbmaWXQT3CFh7zcqroq3kGMacgqdX6Vxm63VpruVRrZdG57Sscjqxfsez2gsfvKPeB6oD8gugDSyvRBU2MCea4",
    ],
  },
};

export default CREATE_EDITION_DISTRIBUTOR_TX;
