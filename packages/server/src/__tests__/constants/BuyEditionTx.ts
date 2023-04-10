const BUY_EDITION_TX = {
  blockTime: 1652749170,
  meta: {
    err: null,
    fee: 10000,
    innerInstructions: [
      {
        index: 2,
        instructions: [
          {
            parsed: {
              info: {
                lamports: 2039280,
                newAccount: "CSBt6wvMG2L6CpA8CgwUvv3XskZt9MQHFqxYLuYkwBSH",
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
              "CSBt6wvMG2L6CpA8CgwUvv3XskZt9MQHFqxYLuYkwBSH",
              "8owizay4U9QTQrSj1AZpvShBdncxA8P8iuo9BmH3iCc9",
            ],
            data: "6VysodPbkSMYMA6WwHEjTjzaNtzvtsufcN85Bznx3z1ES",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
        ],
      },
      {
        index: 4,
        instructions: [
          {
            accounts: [
              "Hn17J4R7tAkd6qrzDeTTvSpTfWx73npoAwQ8RSaX6Hnd",
              "4Ez22faYLKgwBmfyXMgB3EHBZGn3o8YYy3C2eikSpQjZ",
              "48HoXNWWpEkH3PXNbyk51w3ghAoKsycMUD1BvyMU1Paw",
              "8owizay4U9QTQrSj1AZpvShBdncxA8P8iuo9BmH3iCc9",
              "FohstVqi6awKKGoXZ2Qc9F9ZizXZmFWbv39rfpyLrELZ",
              "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
              "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
              "4gfLzD9bi59eAyMMwtYycExaVHfhoNkVHm4UGHxvuh7M",
              "ExcE9PiZaNV7KwvAoBuHq5o5CUR58VfVtLyMwc6bDUio",
              "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
              "DW9hsC2FUqMkcuGxTBR2za3sw4C1waM3aqnPb2UCDBSz",
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              "11111111111111111111111111111111",
              "SysvarRent111111111111111111111111111111111",
            ],
            data: "98M8YDkWxWvb",
            programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          },
          {
            parsed: {
              info: {
                destination: "Hn17J4R7tAkd6qrzDeTTvSpTfWx73npoAwQ8RSaX6Hnd",
                lamports: 5616720,
                source: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "Hn17J4R7tAkd6qrzDeTTvSpTfWx73npoAwQ8RSaX6Hnd",
                space: 679,
              },
              type: "allocate",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "Hn17J4R7tAkd6qrzDeTTvSpTfWx73npoAwQ8RSaX6Hnd",
                owner: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
              },
              type: "assign",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                destination: "4Ez22faYLKgwBmfyXMgB3EHBZGn3o8YYy3C2eikSpQjZ",
                lamports: 2568240,
                source: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "4Ez22faYLKgwBmfyXMgB3EHBZGn3o8YYy3C2eikSpQjZ",
                space: 241,
              },
              type: "allocate",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "4Ez22faYLKgwBmfyXMgB3EHBZGn3o8YYy3C2eikSpQjZ",
                owner: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
              },
              type: "assign",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                authorityType: "mintTokens",
                mint: "8owizay4U9QTQrSj1AZpvShBdncxA8P8iuo9BmH3iCc9",
                multisigAuthority:
                  "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
                newAuthority: "4Ez22faYLKgwBmfyXMgB3EHBZGn3o8YYy3C2eikSpQjZ",
                signers: ["9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU"],
              },
              type: "setAuthority",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                authorityType: "freezeAccount",
                mint: "8owizay4U9QTQrSj1AZpvShBdncxA8P8iuo9BmH3iCc9",
                multisigAuthority:
                  "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
                newAuthority: "4Ez22faYLKgwBmfyXMgB3EHBZGn3o8YYy3C2eikSpQjZ",
                signers: ["9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU"],
              },
              type: "setAuthority",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                destination: "Hy2HXKHxDdzbNGck6VJ8RLE75HY27ukvJQwSACp1qafp",
                lamports: 5000000,
                source: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                destination: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
                lamports: 95000000,
                source: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
        ],
      },
    ],
    logMessages: [
      "Program 11111111111111111111111111111111 invoke [1]",
      "Program 11111111111111111111111111111111 success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: InitializeMint",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2700 of 1400000 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]",
      "Program log: Create",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Initialize the associated token account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeAccount3",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2958 of 1385106 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 15775 of 1397300 compute units",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: MintTo",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3022 of 1381525 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: BuyEdition",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [2]",
      "Program log: Instruction: Mint New Edition from Master Edition Via Token",
      "Program log: Transfer 5616720 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [3]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account",
      "Program 11111111111111111111111111111111 invoke [3]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [3]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Transfer 2568240 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [3]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account",
      "Program 11111111111111111111111111111111 invoke [3]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [3]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Setting mint authority",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: SetAuthority",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2174 of 1285971 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program log: Setting freeze authority",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: SetAuthority",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2173 of 1280710 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program log: Finished setting freeze authority",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 64249 of 1341548 compute units",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Bought edition #2 for mint CnTPVjXZF24zU6wZptRSEPLuiKagCKXDYBUkm8DD2Hbs",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 126088 of 1378503 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      25353246960, 1461600, 2853600, 2568240, 3695760, 4085520, 37728021388,
      2039280, 1113600, 5616720, 8185500000, 1, 1141440, 853073280, 1461600,
      5616720, 2039280, 1141440, 682286859778, 1169280, 1009200, 953185920,
    ],
    postTokenBalances: [
      {
        accountIndex: 7,
        mint: "8owizay4U9QTQrSj1AZpvShBdncxA8P8iuo9BmH3iCc9",
        owner: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
      {
        accountIndex: 16,
        mint: "CnTPVjXZF24zU6wZptRSEPLuiKagCKXDYBUkm8DD2Hbs",
        owner: "4gfLzD9bi59eAyMMwtYycExaVHfhoNkVHm4UGHxvuh7M",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
    ],
    preBalances: [
      25464942800, 0, 2853600, 0, 3695760, 4085520, 37633021388, 0, 1113600, 0,
      8180500000, 1, 1141440, 853073280, 1461600, 5616720, 2039280, 1141440,
      682286859778, 1169280, 1009200, 953185920,
    ],
    preTokenBalances: [
      {
        accountIndex: 16,
        mint: "CnTPVjXZF24zU6wZptRSEPLuiKagCKXDYBUkm8DD2Hbs",
        owner: "4gfLzD9bi59eAyMMwtYycExaVHfhoNkVHm4UGHxvuh7M",
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
  slot: 134725719,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
          signer: true,
          writable: true,
        },
        {
          pubkey: "8owizay4U9QTQrSj1AZpvShBdncxA8P8iuo9BmH3iCc9",
          signer: true,
          writable: true,
        },
        {
          pubkey: "48HoXNWWpEkH3PXNbyk51w3ghAoKsycMUD1BvyMU1Paw",
          signer: false,
          writable: true,
        },
        {
          pubkey: "4Ez22faYLKgwBmfyXMgB3EHBZGn3o8YYy3C2eikSpQjZ",
          signer: false,
          writable: true,
        },
        {
          pubkey: "4gfLzD9bi59eAyMMwtYycExaVHfhoNkVHm4UGHxvuh7M",
          signer: false,
          writable: true,
        },
        {
          pubkey: "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
          signer: false,
          writable: true,
        },
        {
          pubkey: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
          signer: false,
          writable: true,
        },
        {
          pubkey: "CSBt6wvMG2L6CpA8CgwUvv3XskZt9MQHFqxYLuYkwBSH",
          signer: false,
          writable: true,
        },
        {
          pubkey: "FohstVqi6awKKGoXZ2Qc9F9ZizXZmFWbv39rfpyLrELZ",
          signer: false,
          writable: true,
        },
        {
          pubkey: "Hn17J4R7tAkd6qrzDeTTvSpTfWx73npoAwQ8RSaX6Hnd",
          signer: false,
          writable: true,
        },
        {
          pubkey: "Hy2HXKHxDdzbNGck6VJ8RLE75HY27ukvJQwSACp1qafp",
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
          pubkey: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          signer: false,
          writable: false,
        },
        {
          pubkey: "CnTPVjXZF24zU6wZptRSEPLuiKagCKXDYBUkm8DD2Hbs",
          signer: false,
          writable: false,
        },
        {
          pubkey: "DW9hsC2FUqMkcuGxTBR2za3sw4C1waM3aqnPb2UCDBSz",
          signer: false,
          writable: false,
        },
        {
          pubkey: "ExcE9PiZaNV7KwvAoBuHq5o5CUR58VfVtLyMwc6bDUio",
          signer: false,
          writable: false,
        },
        {
          pubkey: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          signer: false,
          writable: false,
        },
        {
          pubkey: "So11111111111111111111111111111111111111112",
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
          parsed: {
            info: {
              lamports: 1461600,
              newAccount: "8owizay4U9QTQrSj1AZpvShBdncxA8P8iuo9BmH3iCc9",
              owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              source: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
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
              freezeAuthority: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
              mint: "8owizay4U9QTQrSj1AZpvShBdncxA8P8iuo9BmH3iCc9",
              mintAuthority: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
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
              account: "CSBt6wvMG2L6CpA8CgwUvv3XskZt9MQHFqxYLuYkwBSH",
              mint: "8owizay4U9QTQrSj1AZpvShBdncxA8P8iuo9BmH3iCc9",
              rentSysvar: "SysvarRent111111111111111111111111111111111",
              source: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
              systemProgram: "11111111111111111111111111111111",
              tokenProgram: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              wallet: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
            },
            type: "create",
          },
          program: "spl-associated-token-account",
          programId: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
        },
        {
          parsed: {
            info: {
              account: "CSBt6wvMG2L6CpA8CgwUvv3XskZt9MQHFqxYLuYkwBSH",
              amount: "1",
              mint: "8owizay4U9QTQrSj1AZpvShBdncxA8P8iuo9BmH3iCc9",
              mintAuthority: "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
            },
            type: "mintTo",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          accounts: [
            "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
            "4gfLzD9bi59eAyMMwtYycExaVHfhoNkVHm4UGHxvuh7M",
            "CnTPVjXZF24zU6wZptRSEPLuiKagCKXDYBUkm8DD2Hbs",
            "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
            "So11111111111111111111111111111111111111112",
            "Hy2HXKHxDdzbNGck6VJ8RLE75HY27ukvJQwSACp1qafp",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "CnTPVjXZF24zU6wZptRSEPLuiKagCKXDYBUkm8DD2Hbs",
            "DW9hsC2FUqMkcuGxTBR2za3sw4C1waM3aqnPb2UCDBSz",
            "48HoXNWWpEkH3PXNbyk51w3ghAoKsycMUD1BvyMU1Paw",
            "8owizay4U9QTQrSj1AZpvShBdncxA8P8iuo9BmH3iCc9",
            "Hn17J4R7tAkd6qrzDeTTvSpTfWx73npoAwQ8RSaX6Hnd",
            "4Ez22faYLKgwBmfyXMgB3EHBZGn3o8YYy3C2eikSpQjZ",
            "FohstVqi6awKKGoXZ2Qc9F9ZizXZmFWbv39rfpyLrELZ",
            "ExcE9PiZaNV7KwvAoBuHq5o5CUR58VfVtLyMwc6bDUio",
            "9rB8hC4x9WGWtcRRC5Y8G28zQ7M5UAPufCuLWDGEgroU",
            "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
            "SysvarC1ock11111111111111111111111111111111",
            "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
          ],
          data: "DQ8Zn7rbh8XcoNpxDKowrskpyp2hkC7adu",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "HGuTn5Wfk7pZSq51W11m5xUgWuz8nkdWXBN9HdUEj3so",
    },
    signatures: [
      "2qcWtsH3Agos65x9r6LUQEDttiy6XXHvSJVH8Tqi63S4MbXqfiFLDG5a5dRa7AUekQL2YerdReN8wnpcQuGFEfNa",
      "5r4yuXKURLRkb2qkBQSP2JWq4YABRgyLd77puLSK7GFraMT8UTR1eu2igZEZKQ1NQwmRVTKEFLq4vk4gmQ9JkwJD",
    ],
  },
};

export default BUY_EDITION_TX;
