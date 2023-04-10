// https://explorer.solana.com/tx/eGNhAaaYc4hGkfQt8He7tUgT2DMrfSPUqqrDjSV4NaVz9Bv8A8nULMvnau4yKunhzc6Lmws4LkBqA2zzQvqofhQ?cluster=devnet
// For this nft on dev: https://dev.formfunction.xyz/@soursop/8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ?width=296&height=313
const SETTLE_AUCTION_TX_SOL = {
  blockTime: 1661548500,
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
                destination: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
                lamports: 10000000,
                source: "5kQk9KffiXXpGt54G3gEsWX4dCb6RcGk9xAdU4AD3msg",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                destination: "5iae1HV9bctTXxnXEUPkoPoy4LYzAp1bL3gPr98tyAc7",
                lamports: 10000000,
                source: "5kQk9KffiXXpGt54G3gEsWX4dCb6RcGk9xAdU4AD3msg",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                destination: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
                lamports: 180000000,
                source: "5kQk9KffiXXpGt54G3gEsWX4dCb6RcGk9xAdU4AD3msg",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "6WHAgN9P4mZCbCXY8YUBFYsUmm65BncHjwWx4nW3Wqzm",
                mint: "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
                rentSysvar: "SysvarRent111111111111111111111111111111111",
                source: "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
                systemProgram: "11111111111111111111111111111111",
                tokenProgram: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                wallet: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
              },
              type: "create",
            },
            program: "spl-associated-token-account",
            programId: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          },
          {
            parsed: {
              info: {
                extensionTypes: ["immutableOwner"],
                mint: "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
              },
              type: "getAccountDataSize",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                lamports: 2039280,
                newAccount: "6WHAgN9P4mZCbCXY8YUBFYsUmm65BncHjwWx4nW3Wqzm",
                owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                source: "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
                space: 165,
              },
              type: "createAccount",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: { account: "6WHAgN9P4mZCbCXY8YUBFYsUmm65BncHjwWx4nW3Wqzm" },
              type: "initializeImmutableOwner",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                account: "6WHAgN9P4mZCbCXY8YUBFYsUmm65BncHjwWx4nW3Wqzm",
                mint: "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
                owner: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
              },
              type: "initializeAccount3",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            accounts: [
              "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
              "7LCynQWQgwU1U5AHUj7mShZ82J7dkm5S3ojZwuVEweBM",
              "2xeEtWWcRvcHTtWs2mCQCHK7PHXGEa4ecVwyiUWnAMr2",
              "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            ],
            data: "U",
            programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          },
          {
            parsed: {
              info: {
                account: "7LCynQWQgwU1U5AHUj7mShZ82J7dkm5S3ojZwuVEweBM",
                freezeAuthority: "2xeEtWWcRvcHTtWs2mCQCHK7PHXGEa4ecVwyiUWnAMr2",
                mint: "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
              },
              type: "thawAccount",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                destination: "6WHAgN9P4mZCbCXY8YUBFYsUmm65BncHjwWx4nW3Wqzm",
                mint: "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
                multisigAuthority:
                  "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
                signers: ["7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg"],
                source: "7LCynQWQgwU1U5AHUj7mShZ82J7dkm5S3ojZwuVEweBM",
                tokenAmount: {
                  amount: "1",
                  decimals: 0,
                  uiAmount: 1,
                  uiAmountString: "1",
                },
              },
              type: "transferChecked",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                multisigOwner: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
                signers: [
                  "BXUURLELUuTGMegwoxKD1XuBwEPm8PUieyq3H7AFRuET",
                  "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
                ],
                source: "7LCynQWQgwU1U5AHUj7mShZ82J7dkm5S3ojZwuVEweBM",
              },
              type: "revoke",
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
      "Program log: Instruction: ExecuteSaleV2",
      "Program log: seller_sale_type = Auction",
      "Program log: buyer_sale_type = Auction",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [2]",
      "Program log: Create",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: GetAccountDataSize",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1622 of 325769 compute units",
      "Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program 11111111111111111111111111111111 invoke [3]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Initialize the associated token account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: InitializeImmutableOwner",
      "Program log: Please upgrade to SPL Token 2022 for immutable owner support",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 319279 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: InitializeAccount3",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4241 of 315395 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 22045 of 332861 compute units",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [2]",
      "Program log: Instruction: Thaw Delegated Account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: ThawAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4312 of 297795 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 13800 of 306986 compute units",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: TransferChecked",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 6375 of 289576 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: Revoke",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3039 of 279822 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 125640 of 400000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [1]",
      "Program log: (Deprecated as of 1.1.0) Instruction: Update Metadata Accounts",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 6044 of 274360 compute units",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success",
    ],
    postBalances: [
      51762227942, 605000000, 0, 2039280, 2039280, 0, 0, 0, 7946797760, 0,
      5616720, 26528985560, 1893120, 1, 2853600, 1461600, 731913600, 1141440,
      4099440, 396708742400, 1141440, 734771963562, 1009200, 934087680,
    ],
    postTokenBalances: [
      {
        accountIndex: 3,
        mint: "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
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
        accountIndex: 4,
        mint: "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
        owner: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "0",
          decimals: 0,
          uiAmount: null,
          uiAmountString: "0",
        },
      },
    ],
    preBalances: [
      51572232942, 595000000, 200000000, 0, 2039280, 0, 0, 1795680, 7945245680,
      1795680, 5616720, 26528985560, 1893120, 1, 2853600, 1461600, 731913600,
      1141440, 4099440, 396708742400, 1141440, 734771963562, 1009200, 934087680,
    ],
    preTokenBalances: [
      {
        accountIndex: 4,
        mint: "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
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
  slot: 157783330,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
          signer: true,
          writable: true,
        },
        {
          pubkey: "5iae1HV9bctTXxnXEUPkoPoy4LYzAp1bL3gPr98tyAc7",
          signer: false,
          writable: true,
        },
        {
          pubkey: "5kQk9KffiXXpGt54G3gEsWX4dCb6RcGk9xAdU4AD3msg",
          signer: false,
          writable: true,
        },
        {
          pubkey: "6WHAgN9P4mZCbCXY8YUBFYsUmm65BncHjwWx4nW3Wqzm",
          signer: false,
          writable: true,
        },
        {
          pubkey: "7LCynQWQgwU1U5AHUj7mShZ82J7dkm5S3ojZwuVEweBM",
          signer: false,
          writable: true,
        },
        {
          pubkey: "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
          signer: false,
          writable: true,
        },
        {
          pubkey: "8kxqUFWfwmt7kjQJ9EivPTrXpeEdibxEpMZTV1vwPCKr",
          signer: false,
          writable: true,
        },
        {
          pubkey: "BXUURLELUuTGMegwoxKD1XuBwEPm8PUieyq3H7AFRuET",
          signer: false,
          writable: true,
        },
        {
          pubkey: "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
          signer: false,
          writable: true,
        },
        {
          pubkey: "E16EsjfnsAqHnyjTkC3EMVi6k84dAM33bNUahszmKMjF",
          signer: false,
          writable: true,
        },
        {
          pubkey: "GfvRaS7fvGkxDTZfCFiRfhrPJSf4kYfzGxcCXL6jEoZF",
          signer: false,
          writable: true,
        },
        {
          pubkey: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
          signer: false,
          writable: true,
        },
        {
          pubkey: "HAYkHJBAziGBvfA2BDejBa6pNw5YUSyTsqtTs87y3J8M",
          signer: false,
          writable: true,
        },
        {
          pubkey: "11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "2xeEtWWcRvcHTtWs2mCQCHK7PHXGEa4ecVwyiUWnAMr2",
          signer: false,
          writable: false,
        },
        {
          pubkey: "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
          signer: false,
          writable: false,
        },
        {
          pubkey: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          signer: false,
          writable: false,
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
          pubkey: "So11111111111111111111111111111111111111112",
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
            "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "7LCynQWQgwU1U5AHUj7mShZ82J7dkm5S3ojZwuVEweBM",
            "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
            "GfvRaS7fvGkxDTZfCFiRfhrPJSf4kYfzGxcCXL6jEoZF",
            "So11111111111111111111111111111111111111112",
            "5kQk9KffiXXpGt54G3gEsWX4dCb6RcGk9xAdU4AD3msg",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "6WHAgN9P4mZCbCXY8YUBFYsUmm65BncHjwWx4nW3Wqzm",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
            "5iae1HV9bctTXxnXEUPkoPoy4LYzAp1bL3gPr98tyAc7",
            "E16EsjfnsAqHnyjTkC3EMVi6k84dAM33bNUahszmKMjF",
            "BXUURLELUuTGMegwoxKD1XuBwEPm8PUieyq3H7AFRuET",
            "8kxqUFWfwmt7kjQJ9EivPTrXpeEdibxEpMZTV1vwPCKr",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
            "SysvarRent111111111111111111111111111111111",
            "2xeEtWWcRvcHTtWs2mCQCHK7PHXGEa4ecVwyiUWnAMr2",
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
            "HAYkHJBAziGBvfA2BDejBa6pNw5YUSyTsqtTs87y3J8M",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
          ],
          data: "AAcjsbvLZzQCuWzEBvr1XeSwCjgiv2pbAAnesQYzzGZXsscT",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          accounts: [
            "GfvRaS7fvGkxDTZfCFiRfhrPJSf4kYfzGxcCXL6jEoZF",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
          ],
          data: "7YXqDi",
          programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
        },
      ],
      recentBlockhash: "F3tWo9fFpYeHgV88eigTVgZA8FXLpZFXxJJ2THmys3qk",
    },
    signatures: [
      "eGNhAaaYc4hGkfQt8He7tUgT2DMrfSPUqqrDjSV4NaVz9Bv8A8nULMvnau4yKunhzc6Lmws4LkBqA2zzQvqofhQ",
    ],
  },
};

export default SETTLE_AUCTION_TX_SOL;
