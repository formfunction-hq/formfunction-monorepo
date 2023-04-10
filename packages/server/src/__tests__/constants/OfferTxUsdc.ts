// https://explorer.solana.com/tx/4tV7CPt1UYtHNCXrKYp5z4uyrTWLwSWRfaN4P6PNQ3o6dW4JLbtMHaudm52HCN9Zes743GS4qkPXrei9BpxRch2R?cluster=devnet
// For this nft on dev: https://dev.formfunction.xyz/@petritest/6zyTtuGxS5c59j9QDva1zJkR2GTCuZMEsMdog6wGyjrR?width=192&height=172
const OFFER_TX_USDC = {
  blockTime: 1662132943,
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
                destination: "Eh3CJXrUzB9NmJarWQbQUNVNnQQvQufdgMaQDqQpNF4h",
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
                account: "Eh3CJXrUzB9NmJarWQbQUNVNnQQvQufdgMaQDqQpNF4h",
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
                account: "Eh3CJXrUzB9NmJarWQbQUNVNnQQvQufdgMaQDqQpNF4h",
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
                destination: "995UYaBG8R8r7Mk6mMSe3CpxAF1k9qKR2HhCw6NNxBk5",
                lamports: 2039280,
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
                account: "995UYaBG8R8r7Mk6mMSe3CpxAF1k9qKR2HhCw6NNxBk5",
                space: 165,
              },
              type: "allocate",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "995UYaBG8R8r7Mk6mMSe3CpxAF1k9qKR2HhCw6NNxBk5",
                owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              },
              type: "assign",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "995UYaBG8R8r7Mk6mMSe3CpxAF1k9qKR2HhCw6NNxBk5",
                mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
                owner: "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
                rentSysvar: "SysvarRent111111111111111111111111111111111",
              },
              type: "initializeAccount2",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                amount: "100000000",
                authority: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
                destination: "995UYaBG8R8r7Mk6mMSe3CpxAF1k9qKR2HhCw6NNxBk5",
                source: "3xV7cQv6rpmiHdb46vfjP4PZZZCtygRKRSAf3wcPnJog",
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
      "Program log: Instruction: CreateTradeState",
      "Program log: Transfer 1795680 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account Eh3CJXrUzB9NmJarWQbQUNVNnQQvQufdgMaQDqQpNF4h",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Completed assignation!",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 45191 of 400000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: BuyV2",
      "Program log: buyer_sale_type = Offer",
      "Program log: Transfer 2039280 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account 995UYaBG8R8r7Mk6mMSe3CpxAF1k9qKR2HhCw6NNxBk5",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Completed assignation!",
      "Program log: This.",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeAccount2",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4362 of 273576 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program log: Passes",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: Transfer",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4645 of 266114 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 99782 of 354809 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      50817135782, 2039280, 2039280, 812755120, 1795680, 1893120, 1, 1461600,
      5616720, 731913600, 4099440, 1141440, 27003456600, 2039280, 396485152720,
      1169280, 1009200, 934087680,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
        mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        owner: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "1000056175000",
          decimals: 6,
          uiAmount: 1000056.175,
          uiAmountString: "1000056.175",
        },
      },
      {
        accountIndex: 2,
        mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        owner: "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "100000000",
          decimals: 6,
          uiAmount: 100,
          uiAmountString: "100",
        },
      },
      {
        accountIndex: 13,
        mint: "6zyTtuGxS5c59j9QDva1zJkR2GTCuZMEsMdog6wGyjrR",
        owner: "5BNvH7hxxeMfJkBYpFArEAy5iaYCypjxVFb1KtbZSLk4",
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
      50817140782, 2039280, 0, 816590080, 0, 1893120, 1, 1461600, 5616720,
      731913600, 4099440, 1141440, 27003456600, 2039280, 396485152720, 1169280,
      1009200, 934087680,
    ],
    preTokenBalances: [
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
        accountIndex: 13,
        mint: "6zyTtuGxS5c59j9QDva1zJkR2GTCuZMEsMdog6wGyjrR",
        owner: "5BNvH7hxxeMfJkBYpFArEAy5iaYCypjxVFb1KtbZSLk4",
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
  slot: 159326168,
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
          pubkey: "995UYaBG8R8r7Mk6mMSe3CpxAF1k9qKR2HhCw6NNxBk5",
          signer: false,
          writable: true,
        },
        {
          pubkey: "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
          signer: false,
          writable: true,
        },
        {
          pubkey: "Eh3CJXrUzB9NmJarWQbQUNVNnQQvQufdgMaQDqQpNF4h",
          signer: false,
          writable: true,
        },
        {
          pubkey: "G1L2UYsW2Qm6esPNAGhVU3jojj6heHk2pxtiGhMyCfav",
          signer: false,
          writable: true,
        },
        {
          pubkey: "11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "6zyTtuGxS5c59j9QDva1zJkR2GTCuZMEsMdog6wGyjrR",
          signer: false,
          writable: false,
        },
        {
          pubkey: "A6WjqrKhzgCtKm7C3TuiTadQ5zZ1GCR47BMtVERUGJZg",
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
          pubkey: "Gq2mhHkm7WwuJxjx4mGJytBMDhpEt7zdk3iwoktNNJRg",
          signer: false,
          writable: false,
        },
        {
          pubkey: "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
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
      addressTableLookups: null,
      instructions: [
        {
          accounts: [
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "6zyTtuGxS5c59j9QDva1zJkR2GTCuZMEsMdog6wGyjrR",
            "Gq2mhHkm7WwuJxjx4mGJytBMDhpEt7zdk3iwoktNNJRg",
            "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
            "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
            "Eh3CJXrUzB9NmJarWQbQUNVNnQQvQufdgMaQDqQpNF4h",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
          ],
          data: "DJtu3FpCRJ9XvrCuZgBRwQnELuEewusKd9J2b",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          accounts: [
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "3xV7cQv6rpmiHdb46vfjP4PZZZCtygRKRSAf3wcPnJog",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
            "Gq2mhHkm7WwuJxjx4mGJytBMDhpEt7zdk3iwoktNNJRg",
            "A6WjqrKhzgCtKm7C3TuiTadQ5zZ1GCR47BMtVERUGJZg",
            "995UYaBG8R8r7Mk6mMSe3CpxAF1k9qKR2HhCw6NNxBk5",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
            "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
            "Eh3CJXrUzB9NmJarWQbQUNVNnQQvQufdgMaQDqQpNF4h",
            "6zyTtuGxS5c59j9QDva1zJkR2GTCuZMEsMdog6wGyjrR",
            "G1L2UYsW2Qm6esPNAGhVU3jojj6heHk2pxtiGhMyCfav",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
            "SysvarC1ock11111111111111111111111111111111",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "995UYaBG8R8r7Mk6mMSe3CpxAF1k9qKR2HhCw6NNxBk5",
            "3xV7cQv6rpmiHdb46vfjP4PZZZCtygRKRSAf3wcPnJog",
            "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          ],
          data: "2tpZiHBNBWa2SY3sFC9mqgfJ58vDnqD11fD5Eqk",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "BDCvQC5F2BHWUn4kQcpRbM9m441BS6hoyyU5gbpBfbLm",
    },
    signatures: [
      "4tV7CPt1UYtHNCXrKYp5z4uyrTWLwSWRfaN4P6PNQ3o6dW4JLbtMHaudm52HCN9Zes743GS4qkPXrei9BpxRch2R",
    ],
  },
};

export default OFFER_TX_USDC;
