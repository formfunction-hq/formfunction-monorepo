const BUY_EDITION_BOT_TAXED_TX = {
  blockTime: 1660148239,
  meta: {
    err: null,
    fee: 15000,
    innerInstructions: [
      {
        index: 2,
        instructions: [
          {
            parsed: {
              info: {
                destination: "H2uV8g8p6gohKkqbBBYTh6aWLdDii1wydeqSomDcroGg",
                lamports: 2039280,
                source: "2WwCuMnM7L8N7YxJKWgUAZqeERXXJNi6YC5j62hQh16f",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "H2uV8g8p6gohKkqbBBYTh6aWLdDii1wydeqSomDcroGg",
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
                account: "H2uV8g8p6gohKkqbBBYTh6aWLdDii1wydeqSomDcroGg",
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
                account: "H2uV8g8p6gohKkqbBBYTh6aWLdDii1wydeqSomDcroGg",
                mint: "56ayLVHqz7g5gh7hJ6xjpnHo9hQJusisACTQ7UyCu3bD",
                owner: "2WwCuMnM7L8N7YxJKWgUAZqeERXXJNi6YC5j62hQh16f",
                rentSysvar: "SysvarRent111111111111111111111111111111111",
              },
              type: "initializeAccount",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
        ],
      },
      {
        index: 4,
        instructions: [
          {
            parsed: {
              info: {
                destination: "3aaCjSsHGC6G3FveVmHJsshtfKdwTDHUmF4U89dM8SG2",
                lamports: 10000000,
                source: "2WwCuMnM7L8N7YxJKWgUAZqeERXXJNi6YC5j62hQh16f",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
        ],
      },
    ],
    loadedAddresses: { readonly: [], writable: [] },
    logMessages: [
      "Program 11111111111111111111111111111111 invoke [1]",
      "Program 11111111111111111111111111111111 success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: InitializeMint",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2463 of 1400000 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]",
      "Program log: Transfer 2039280 lamports to the associated token account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the associated token account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the associated token account to the SPL Token program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Initialize the associated token account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3519 of 1380316 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 21400 of 1397537 compute units",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: MintTo",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2960 of 1376137 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS invoke [1]",
      "Program log: Instruction: BuyEdition",
      'Program log: AnchorError { error_name: "BotTaxCollected", error_code_number: 6053, error_msg: "Bot tax collected", error_origin: None, compared_values: None }, AnchorError { error_name: "InvalidAntiBotAuthority", error_code_number: 6052, error_msg: "Invalid anti-bot authority", error_origin: None, compared_values: None }, AuctionHouse botting is taxed at 10000000 lamports',
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS consumed 96053 of 1373177 compute units",
      "Program Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS success",
    ],
    postBalances: [
      40874534960, 1461600, 0, 2039280, 49982288760, 3695760, 1010000000,
      4099440, 2853600, 0, 0, 0, 1009200, 1, 1, 1461600, 1000000000, 5616720,
      2039280, 1, 1169280, 1, 1,
    ],
    postTokenBalances: [
      {
        accountIndex: 3,
        mint: "56ayLVHqz7g5gh7hJ6xjpnHo9hQJusisACTQ7UyCu3bD",
        owner: "2WwCuMnM7L8N7YxJKWgUAZqeERXXJNi6YC5j62hQh16f",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
      {
        accountIndex: 18,
        mint: "8q3GbCn5gVjqsKTAF6ovXM5mYRAPDum2mmEG5aJqTa5S",
        owner: "AQVN6GhBSJyq3YZMEiRLtyu3NRNr5prDZKMRStZdQCr3",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
    ],
    preBalances: [
      40888050840, 0, 0, 0, 49982288760, 3695760, 1000000000, 4099440, 2853600,
      0, 0, 0, 1009200, 1, 1, 1461600, 1000000000, 5616720, 2039280, 1, 1169280,
      1, 1,
    ],
    preTokenBalances: [
      {
        accountIndex: 18,
        mint: "8q3GbCn5gVjqsKTAF6ovXM5mYRAPDum2mmEG5aJqTa5S",
        owner: "AQVN6GhBSJyq3YZMEiRLtyu3NRNr5prDZKMRStZdQCr3",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
    ],
    returnData: null,
    rewards: [],
    status: { Ok: null },
  },
  slot: 85,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "2WwCuMnM7L8N7YxJKWgUAZqeERXXJNi6YC5j62hQh16f",
          signer: true,
          writable: true,
        },
        {
          pubkey: "56ayLVHqz7g5gh7hJ6xjpnHo9hQJusisACTQ7UyCu3bD",
          signer: true,
          writable: true,
        },
        {
          pubkey: "GbYgLSYBQgQiu5aiVc6qGTGVxqfeUGYdJKtCxTPLjmYW",
          signer: true,
          writable: false,
        },
        {
          pubkey: "H2uV8g8p6gohKkqbBBYTh6aWLdDii1wydeqSomDcroGg",
          signer: false,
          writable: true,
        },
        {
          pubkey: "5k8UcubUDHnRKo4keuC35GgCzFBJ9NDzHcZvq3i7MYWC",
          signer: false,
          writable: true,
        },
        {
          pubkey: "AQVN6GhBSJyq3YZMEiRLtyu3NRNr5prDZKMRStZdQCr3",
          signer: false,
          writable: true,
        },
        {
          pubkey: "3aaCjSsHGC6G3FveVmHJsshtfKdwTDHUmF4U89dM8SG2",
          signer: false,
          writable: true,
        },
        {
          pubkey: "5vt32WPYWxp844EA9eR79JSESXcE1DCZ3vGSzphPr5GM",
          signer: false,
          writable: true,
        },
        {
          pubkey: "Hb53ofAMVqBw6y932w3e7jeuGo2ReAZWpx9pNijaNxEm",
          signer: false,
          writable: true,
        },
        {
          pubkey: "9gscF6G2wwP4oAMUdsWGwB4BowCcH9pmNjNnAVK1SXvn",
          signer: false,
          writable: true,
        },
        {
          pubkey: "EZLsHCGFt8s4Sg6u8LuoxjWMQneJNdZagdvnG3EKgtor",
          signer: false,
          writable: true,
        },
        {
          pubkey: "6tfqmDEGTT7U8uc3w4ZuvRUacBAvcjZS6o4usxzqNdRA",
          signer: false,
          writable: true,
        },
        {
          pubkey: "SysvarRent111111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          signer: false,
          writable: false,
        },
        {
          pubkey: "8q3GbCn5gVjqsKTAF6ovXM5mYRAPDum2mmEG5aJqTa5S",
          signer: false,
          writable: false,
        },
        {
          pubkey: "So11111111111111111111111111111111111111112",
          signer: false,
          writable: false,
        },
        {
          pubkey: "2fjbH2eWh7cX9xectzsBVqYCNxL8W26QJy9oBnUvT1vc",
          signer: false,
          writable: false,
        },
        {
          pubkey: "Eq6rgbpogZKzHUfEdY1FwWoEMgjVDyVJojoypM24PBDj",
          signer: false,
          writable: false,
        },
        {
          pubkey: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          signer: false,
          writable: false,
        },
        {
          pubkey: "SysvarC1ock11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          signer: false,
          writable: false,
        },
        {
          pubkey: "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS",
          signer: false,
          writable: false,
        },
      ],
      addressTableLookups: null,
      instructions: [
        {
          parsed: {
            info: {
              lamports: 1461600,
              newAccount: "56ayLVHqz7g5gh7hJ6xjpnHo9hQJusisACTQ7UyCu3bD",
              owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              source: "2WwCuMnM7L8N7YxJKWgUAZqeERXXJNi6YC5j62hQh16f",
              space: 82,
            },
            type: "createAccount",
          },
          program: "system",
          programId: "11111111111111111111111111111111",
        },
        {
          parsed: {
            info: {
              decimals: 0,
              freezeAuthority: "2WwCuMnM7L8N7YxJKWgUAZqeERXXJNi6YC5j62hQh16f",
              mint: "56ayLVHqz7g5gh7hJ6xjpnHo9hQJusisACTQ7UyCu3bD",
              mintAuthority: "2WwCuMnM7L8N7YxJKWgUAZqeERXXJNi6YC5j62hQh16f",
              rentSysvar: "SysvarRent111111111111111111111111111111111",
            },
            type: "initializeMint",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          parsed: {
            info: {
              account: "H2uV8g8p6gohKkqbBBYTh6aWLdDii1wydeqSomDcroGg",
              mint: "56ayLVHqz7g5gh7hJ6xjpnHo9hQJusisACTQ7UyCu3bD",
              rentSysvar: "SysvarRent111111111111111111111111111111111",
              source: "2WwCuMnM7L8N7YxJKWgUAZqeERXXJNi6YC5j62hQh16f",
              systemProgram: "11111111111111111111111111111111",
              tokenProgram: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              wallet: "2WwCuMnM7L8N7YxJKWgUAZqeERXXJNi6YC5j62hQh16f",
            },
            type: "create",
          },
          program: "spl-associated-token-account",
          programId: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
        },
        {
          parsed: {
            info: {
              account: "H2uV8g8p6gohKkqbBBYTh6aWLdDii1wydeqSomDcroGg",
              amount: "1",
              mint: "56ayLVHqz7g5gh7hJ6xjpnHo9hQJusisACTQ7UyCu3bD",
              mintAuthority: "2WwCuMnM7L8N7YxJKWgUAZqeERXXJNi6YC5j62hQh16f",
            },
            type: "mintTo",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          accounts: [
            "5k8UcubUDHnRKo4keuC35GgCzFBJ9NDzHcZvq3i7MYWC",
            "AQVN6GhBSJyq3YZMEiRLtyu3NRNr5prDZKMRStZdQCr3",
            "8q3GbCn5gVjqsKTAF6ovXM5mYRAPDum2mmEG5aJqTa5S",
            "2WwCuMnM7L8N7YxJKWgUAZqeERXXJNi6YC5j62hQh16f",
            "So11111111111111111111111111111111111111112",
            "3aaCjSsHGC6G3FveVmHJsshtfKdwTDHUmF4U89dM8SG2",
            "5vt32WPYWxp844EA9eR79JSESXcE1DCZ3vGSzphPr5GM",
            "8q3GbCn5gVjqsKTAF6ovXM5mYRAPDum2mmEG5aJqTa5S",
            "2fjbH2eWh7cX9xectzsBVqYCNxL8W26QJy9oBnUvT1vc",
            "Hb53ofAMVqBw6y932w3e7jeuGo2ReAZWpx9pNijaNxEm",
            "56ayLVHqz7g5gh7hJ6xjpnHo9hQJusisACTQ7UyCu3bD",
            "9gscF6G2wwP4oAMUdsWGwB4BowCcH9pmNjNnAVK1SXvn",
            "EZLsHCGFt8s4Sg6u8LuoxjWMQneJNdZagdvnG3EKgtor",
            "6tfqmDEGTT7U8uc3w4ZuvRUacBAvcjZS6o4usxzqNdRA",
            "Eq6rgbpogZKzHUfEdY1FwWoEMgjVDyVJojoypM24PBDj",
            "2WwCuMnM7L8N7YxJKWgUAZqeERXXJNi6YC5j62hQh16f",
            "5k8UcubUDHnRKo4keuC35GgCzFBJ9NDzHcZvq3i7MYWC",
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
            "SysvarC1ock11111111111111111111111111111111",
            "GbYgLSYBQgQiu5aiVc6qGTGVxqfeUGYdJKtCxTPLjmYW",
            "5k8UcubUDHnRKo4keuC35GgCzFBJ9NDzHcZvq3i7MYWC",
          ],
          data: "DQ8Zn7rbh8XXtkDWJREmvojppHxwRD1Wmu",
          programId: "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS",
        },
      ],
      recentBlockhash: "5LZAkgDNzV1Lg9Wg5171UZvMwXu6j8Mc5z5YzoaU1Vcj",
    },
    signatures: [
      "3XfiadDeaHD1LitLXQ4etk5M3PbfEpER7ha6J4cAJ6LuC74Vda152PwDAmsBTdfu96DsgEx7pHaxXB1p5xMkADTZ",
      "4oDL6Q5SfruutpVwQjScUEBcNJeCnEF6MHNf8AiHXWXAXoYrie6XAwryLekGrHFvb9n4bnQGKc5TtAMx1JAikarU",
      "T2yi7hduDEBecfjWQ2c6RYb27i3v8nXoe5XuqheyCEA8r6Qp7jHb39SCLQBHQGYHohEV2KeawhbKLNPskcgo8kH",
    ],
  },
};

export default BUY_EDITION_BOT_TAXED_TX;
