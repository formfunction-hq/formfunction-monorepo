// https://explorer.solana.com/tx/5W3FsJQf7yTAHro2dzS2yuWQSVAGzheXstFyfkvaZ35Tgs7VfvF92ut68PPQjJUn2GSDoJUzwcd7rsDwU9sGS59J?cluster=devnet
// For this nft on dev: https://dev.formfunction.xyz/@soursop/8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ?width=296&height=313
const LIST_FOR_AUCTION_TX_SOL = {
  blockTime: 1661548248,
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
                destination: "BXUURLELUuTGMegwoxKD1XuBwEPm8PUieyq3H7AFRuET",
                lamports: 1795680,
                source: "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "BXUURLELUuTGMegwoxKD1XuBwEPm8PUieyq3H7AFRuET",
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
                account: "BXUURLELUuTGMegwoxKD1XuBwEPm8PUieyq3H7AFRuET",
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
                source: "7LCynQWQgwU1U5AHUj7mShZ82J7dkm5S3ojZwuVEweBM",
              },
              type: "approve",
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
            data: "T",
            programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          },
          {
            parsed: {
              info: {
                account: "7LCynQWQgwU1U5AHUj7mShZ82J7dkm5S3ojZwuVEweBM",
                freezeAuthority: "2xeEtWWcRvcHTtWs2mCQCHK7PHXGEa4ecVwyiUWnAMr2",
                mint: "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
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
      "Program log: Allocate space for the account BXUURLELUuTGMegwoxKD1XuBwEPm8PUieyq3H7AFRuET",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Completed assignation!",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 45137 of 600000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: Sell",
      "Program log: seller_sale_type = Auction",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: Approve",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2904 of 517038 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [2]",
      "Program log: Instruction: Freeze Delegated Account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: FreezeAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4310 of 501144 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 13801 of 510338 compute units",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 59230 of 554863 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: SetTickSize",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 23817 of 495633 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      51572232942, 2039280, 0, 0, 1795680, 7948837040, 1893120, 1, 2853600,
      1461600, 1141440, 4099440, 5616720, 396708742400, 1141440, 734771963562,
      1009200, 934087680,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
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
    preBalances: [
      51572237942, 2039280, 0, 0, 0, 7950632720, 1893120, 1, 2853600, 1461600,
      1141440, 4099440, 5616720, 396708742400, 1141440, 734771963562, 1009200,
      934087680,
    ],
    preTokenBalances: [
      {
        accountIndex: 1,
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
  slot: 157782661,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
          signer: true,
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
          pubkey: "GfvRaS7fvGkxDTZfCFiRfhrPJSf4kYfzGxcCXL6jEoZF",
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
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
            "7LCynQWQgwU1U5AHUj7mShZ82J7dkm5S3ojZwuVEweBM",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
            "BXUURLELUuTGMegwoxKD1XuBwEPm8PUieyq3H7AFRuET",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
          ],
          data: "DJtu3FpCRJ9Y7U4FimdGVyhUA4teS4H6HS8a3",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          accounts: [
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "7LCynQWQgwU1U5AHUj7mShZ82J7dkm5S3ojZwuVEweBM",
            "GfvRaS7fvGkxDTZfCFiRfhrPJSf4kYfzGxcCXL6jEoZF",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
            "BXUURLELUuTGMegwoxKD1XuBwEPm8PUieyq3H7AFRuET",
            "8kxqUFWfwmt7kjQJ9EivPTrXpeEdibxEpMZTV1vwPCKr",
            "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
            "SysvarRent111111111111111111111111111111111",
            "2xeEtWWcRvcHTtWs2mCQCHK7PHXGEa4ecVwyiUWnAMr2",
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          ],
          data: "81r6u24fHZhKo2cti8bmDRQJo7NVepaJSVESs",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          accounts: [
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "7LCynQWQgwU1U5AHUj7mShZ82J7dkm5S3ojZwuVEweBM",
            "8UcFNnXKxhzcMNrZ5W4SAnJH8VgWShsThVAmkv57GaoZ",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "HAYkHJBAziGBvfA2BDejBa6pNw5YUSyTsqtTs87y3J8M",
            "So11111111111111111111111111111111111111112",
          ],
          data: "87amrYAWCAgf9n7pz6EVs7LyaKns2taJ8NLguir7h7Dno",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "7uSgDqBbEKkMCNi9qtUr9fRCUkGd8R5SxaLA7xtUsvvy",
    },
    signatures: [
      "5W3FsJQf7yTAHro2dzS2yuWQSVAGzheXstFyfkvaZ35Tgs7VfvF92ut68PPQjJUn2GSDoJUzwcd7rsDwU9sGS59J",
    ],
  },
};

export default LIST_FOR_AUCTION_TX_SOL;
