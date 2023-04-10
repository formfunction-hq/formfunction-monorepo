// https://explorer.solana.com/tx/48M5yDUof72D35x2h1ViDmv1F9YLMhRdLE6MfMCGGpXfrTqx8w2sPBGjzxn3PjHen3qYo9bbpNTpQCXrUi7x3y4w?cluster=devnet
// For this nft on dev: https://dev.formfunction.xyz/@soursop/334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH?width=190&height=213
const LIST_FOR_INSTANT_SALE_TX_USDC = {
  blockTime: 1661962213,
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
                destination: "9pxkwwV5o8wCLaErMH71kHxCfaaFT4kT6ph6kJaRodtE",
                lamports: 1795680,
                source: "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "9pxkwwV5o8wCLaErMH71kHxCfaaFT4kT6ph6kJaRodtE",
                space: 130,
              },
              type: "allocate",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "9pxkwwV5o8wCLaErMH71kHxCfaaFT4kT6ph6kJaRodtE",
                owner: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
              },
              type: "assign",
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
                amount: "1",
                delegate: "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
                owner: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
                source: "7rF8y8KmCvzzHAXD6SMdiizMLKTQ5tCRn6fzWdt32P6D",
              },
              type: "approve",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            accounts: [
              "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
              "7rF8y8KmCvzzHAXD6SMdiizMLKTQ5tCRn6fzWdt32P6D",
              "6kD7HfnCdjQVqmEkXQEt8qzN5q6EqkUBHGAtJMbq1UVY",
              "334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH",
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            ],
            data: "T",
            programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          },
          {
            parsed: {
              info: {
                account: "7rF8y8KmCvzzHAXD6SMdiizMLKTQ5tCRn6fzWdt32P6D",
                freezeAuthority: "6kD7HfnCdjQVqmEkXQEt8qzN5q6EqkUBHGAtJMbq1UVY",
                mint: "334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH",
              },
              type: "freezeAccount",
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
      "Program log: Instruction: CreateTradeState",
      "Program log: Transfer 1795680 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account 9pxkwwV5o8wCLaErMH71kHxCfaaFT4kT6ph6kJaRodtE",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Completed assignation!",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 45124 of 400000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: Sell",
      "Program log: seller_sale_type = InstantSale",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: Approve",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2904 of 309564 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [2]",
      "Program log: Instruction: Freeze Delegated Account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: FreezeAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4310 of 293661 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 13801 of 302855 compute units",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 66726 of 354876 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      50580545182, 0, 2039280, 883246000, 1795680, 0, 1, 1461600, 2853600,
      4099440, 1141440, 5616720, 396553368880, 1141440, 1009200, 934087680,
    ],
    postTokenBalances: [
      {
        accountIndex: 2,
        mint: "334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH",
        owner: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
    ],
    preBalances: [
      50580550182, 0, 2039280, 885041680, 0, 0, 1, 1461600, 2853600, 4099440,
      1141440, 5616720, 396553368880, 1141440, 1009200, 934087680,
    ],
    preTokenBalances: [
      {
        accountIndex: 2,
        mint: "334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH",
        owner: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
    ],
    rewards: [],
    status: { Ok: null },
  },
  slot: 158875651,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
          signer: true,
          writable: true,
        },
        {
          pubkey: "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
          signer: false,
          writable: true,
        },
        {
          pubkey: "7rF8y8KmCvzzHAXD6SMdiizMLKTQ5tCRn6fzWdt32P6D",
          signer: false,
          writable: true,
        },
        {
          pubkey: "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
          signer: false,
          writable: true,
        },
        {
          pubkey: "9pxkwwV5o8wCLaErMH71kHxCfaaFT4kT6ph6kJaRodtE",
          signer: false,
          writable: true,
        },
        {
          pubkey: "EvzYAWLPPymMxzM69Lkj2Kh86XpRv8jZZuQQBdrSxZvd",
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
          pubkey: "Ed5aJiKEWY7A3sBxzJ3zfUApZbw4FRQpDLy11vUXQfjd",
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
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH",
            "7rF8y8KmCvzzHAXD6SMdiizMLKTQ5tCRn6fzWdt32P6D",
            "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
            "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
            "9pxkwwV5o8wCLaErMH71kHxCfaaFT4kT6ph6kJaRodtE",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
          ],
          data: "DJtu3FpCRJ9YLiNHi7mWFkHEWXyf25gcTGk71",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          accounts: [
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "7rF8y8KmCvzzHAXD6SMdiizMLKTQ5tCRn6fzWdt32P6D",
            "Ed5aJiKEWY7A3sBxzJ3zfUApZbw4FRQpDLy11vUXQfjd",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
            "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
            "9pxkwwV5o8wCLaErMH71kHxCfaaFT4kT6ph6kJaRodtE",
            "EvzYAWLPPymMxzM69Lkj2Kh86XpRv8jZZuQQBdrSxZvd",
            "334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
            "SysvarRent111111111111111111111111111111111",
            "6kD7HfnCdjQVqmEkXQEt8qzN5q6EqkUBHGAtJMbq1UVY",
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          ],
          data: "81r6u24fHZhKyeUNh8FbxUrWEjmfDg1xPAay5",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "9nKwUX2AH73G7fVFd3fGmrkyyCNkK47ofMWWMQCFonTx",
    },
    signatures: [
      "48M5yDUof72D35x2h1ViDmv1F9YLMhRdLE6MfMCGGpXfrTqx8w2sPBGjzxn3PjHen3qYo9bbpNTpQCXrUi7x3y4w",
    ],
  },
};

export default LIST_FOR_INSTANT_SALE_TX_USDC;
