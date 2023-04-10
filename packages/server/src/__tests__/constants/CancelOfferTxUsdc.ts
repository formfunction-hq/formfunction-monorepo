// https://explorer.solana.com/tx/29R4RYjdkkB3HiDGYYrAE3oUgFDVqwHc7jYU5nWhqMKi2BADkGtdLSSUEtkz59vuTt9sHg33tZZAvUKFTNNid6Mw?cluster=devnett
// For this nft on dev: https://dev.formfunction.xyz/@soursop/334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH?width=190&height=213
const CANCEL_OFFER_TX_USDC = {
  blockTime: 1662134483,
  meta: {
    err: null,
    fee: 5000,
    innerInstructions: [
      {
        index: 1,
        instructions: [
          {
            parsed: {
              info: {
                amount: "3000000",
                authority: "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
                destination: "3xV7cQv6rpmiHdb46vfjP4PZZZCtygRKRSAf3wcPnJog",
                source: "G6rRN1CrUWKzBTB3HWCEX1voXxxchEi6xuCFgchGUJtJ",
              },
              type: "transfer",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
        ],
      },
    ],
    loadedAddresses: { readonly: [], writable: [] },
    logMessages: [
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: CancelV2",
      "Program log: sale_type = Offer",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 30275 of 400000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: Withdraw",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: Transfer",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4645 of 342471 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 32579 of 369725 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      49817105782, 2039280, 2039280, 0, 0, 812511520, 2039280, 1, 1461600,
      2853600, 731913600, 4099440, 1141440, 27003456600, 396485152720, 1141440,
      1009200, 934087680,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
        mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        owner: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "1000156175000",
          decimals: 6,
          uiAmount: 1000156.175,
          uiAmountString: "1000156.175",
        },
      },
      {
        accountIndex: 2,
        mint: "334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH",
        owner: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
      {
        accountIndex: 6,
        mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        owner: "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "0",
          decimals: 6,
          uiAmount: null,
          uiAmountString: "0",
        },
      },
    ],
    preBalances: [
      49817110782, 2039280, 2039280, 0, 1795680, 810715840, 2039280, 1, 1461600,
      2853600, 731913600, 4099440, 1141440, 27003456600, 396485152720, 1141440,
      1009200, 934087680,
    ],
    preTokenBalances: [
      {
        accountIndex: 1,
        mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        owner: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "1000153175000",
          decimals: 6,
          uiAmount: 1000153.175,
          uiAmountString: "1000153.175",
        },
      },
      {
        accountIndex: 2,
        mint: "334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH",
        owner: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
      {
        accountIndex: 6,
        mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        owner: "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "3000000",
          decimals: 6,
          uiAmount: 3,
          uiAmountString: "3",
        },
      },
    ],
    rewards: [],
    status: { Ok: null },
  },
  slot: 159330232,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
          signer: true,
          writable: true,
        },
        {
          pubkey: "3xV7cQv6rpmiHdb46vfjP4PZZZCtygRKRSAf3wcPnJog",
          signer: false,
          writable: true,
        },
        {
          pubkey: "6u1mCNwMUMoNNGoYTfrjL2tGQYYhtZ3hFAo3wZYsM24w",
          signer: false,
          writable: true,
        },
        {
          pubkey: "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
          signer: false,
          writable: true,
        },
        {
          pubkey: "8hiYcU85vE76g4hLge6cpberp4Q35nPG4YSKCRiH447t",
          signer: false,
          writable: true,
        },
        {
          pubkey: "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
          signer: false,
          writable: true,
        },
        {
          pubkey: "G6rRN1CrUWKzBTB3HWCEX1voXxxchEi6xuCFgchGUJtJ",
          signer: false,
          writable: true,
        },
        {
          pubkey: "11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH",
          signer: false,
          writable: false,
        },
        {
          pubkey: "6kD7HfnCdjQVqmEkXQEt8qzN5q6EqkUBHGAtJMbq1UVY",
          signer: false,
          writable: false,
        },
        {
          pubkey: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          signer: false,
          writable: false,
        },
        {
          pubkey: "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
          signer: false,
          writable: false,
        },
        {
          pubkey: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
          signer: false,
          writable: false,
        },
        {
          pubkey: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
          signer: false,
          writable: false,
        },
        {
          pubkey: "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
          signer: false,
          writable: false,
        },
        {
          pubkey: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
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
      addressTableLookups: null,
      instructions: [
        {
          accounts: [
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "6u1mCNwMUMoNNGoYTfrjL2tGQYYhtZ3hFAo3wZYsM24w",
            "334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
            "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
            "8hiYcU85vE76g4hLge6cpberp4Q35nPG4YSKCRiH447t",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
            "6kD7HfnCdjQVqmEkXQEt8qzN5q6EqkUBHGAtJMbq1UVY",
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          ],
          data: "27UQWiKyr4SNWN6D3Rs1g5xMFeBmnz758AP",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          accounts: [
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "3xV7cQv6rpmiHdb46vfjP4PZZZCtygRKRSAf3wcPnJog",
            "G6rRN1CrUWKzBTB3HWCEX1voXxxchEi6xuCFgchGUJtJ",
            "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
            "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
            "334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            "SysvarRent111111111111111111111111111111111",
          ],
          data: "2inFMjApPi8mfnaSALuc3MqH",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "BNUweEjP4gagVborVugDLGQPeehvaEV167Nyj6jiCx6o",
    },
    signatures: [
      "29R4RYjdkkB3HiDGYYrAE3oUgFDVqwHc7jYU5nWhqMKi2BADkGtdLSSUEtkz59vuTt9sHg33tZZAvUKFTNNid6Mw",
    ],
  },
};

export default CANCEL_OFFER_TX_USDC;
