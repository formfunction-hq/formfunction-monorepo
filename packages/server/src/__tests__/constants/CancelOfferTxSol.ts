// https://explorer.solana.com/tx/4JjHUE9yHaiQEkDbdAXJ95aiBa4c6pTDDUZoM67dwvxzuLpx77TQXgTAb5WVV7Q8iJLtgbCo8miwABvSymWueXxm?cluster=devnet
// For this nft on dev: https://dev.formfunction.xyz/@soursop/334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH?width=190&height=213
const CANCEL_OFFER_TX_SOL = {
  blockTime: 1662134303,
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
                destination: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
                lamports: 1000000000,
                source: "81bZSkXaR73rtmGZSqZiFvbFBiq1ySSq5oERuyEX99U8",
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
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: CancelV2",
      "Program log: sale_type = Offer",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 30275 of 400000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: Withdraw",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 18172 of 369725 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      49817115782, 0, 2039280, 0, 0, 7859721200, 1, 1461600, 2853600, 731913600,
      1141440, 4099440, 396485152720, 1141440, 734771963562, 1009200, 934087680,
    ],
    postTokenBalances: [
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
    ],
    preBalances: [
      48817120782, 1795680, 2039280, 0, 1000000000, 7857925520, 1, 1461600,
      2853600, 731913600, 1141440, 4099440, 396485152720, 1141440, 734771963562,
      1009200, 934087680,
    ],
    preTokenBalances: [
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
    ],
    rewards: [],
    status: { Ok: null },
  },
  slot: 159329754,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
          signer: true,
          writable: true,
        },
        {
          pubkey: "3ayK25hns8BNmzbdHceXZHLwwx5SvGhEDB3arYf3615u",
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
          pubkey: "81bZSkXaR73rtmGZSqZiFvbFBiq1ySSq5oERuyEX99U8",
          signer: false,
          writable: true,
        },
        {
          pubkey: "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
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
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "6u1mCNwMUMoNNGoYTfrjL2tGQYYhtZ3hFAo3wZYsM24w",
            "334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
            "3ayK25hns8BNmzbdHceXZHLwwx5SvGhEDB3arYf3615u",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
            "6kD7HfnCdjQVqmEkXQEt8qzN5q6EqkUBHGAtJMbq1UVY",
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          ],
          data: "27UQWiKyr4SLhj8zv5XGQ11NkDE4ouAiiHZ",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          accounts: [
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "81bZSkXaR73rtmGZSqZiFvbFBiq1ySSq5oERuyEX99U8",
            "So11111111111111111111111111111111111111112",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
            "334GmGs16q3adKg8JGHuskAnFvmMmmTinyLt4YZQCVCH",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            "SysvarRent111111111111111111111111111111111",
          ],
          data: "2inFMjApPi8meVeSYRahBCZ5",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "EucGhfAxWL3H7Zopm4waS6pxiRCmezwyy8iifoRmt3Ws",
    },
    signatures: [
      "4JjHUE9yHaiQEkDbdAXJ95aiBa4c6pTDDUZoM67dwvxzuLpx77TQXgTAb5WVV7Q8iJLtgbCo8miwABvSymWueXxm",
    ],
  },
};

export default CANCEL_OFFER_TX_SOL;
