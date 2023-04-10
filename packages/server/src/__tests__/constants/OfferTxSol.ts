// https://explorer.solana.com/tx/2cEbZXwfRG5coZbPhjpyAoqVQHA7WfZ1M6q3Ne4papnZuPcmqpXwG7GeqDaP6F55WhikaEv6XVwuc7nkcJtZNhVa?cluster=devnet
// For this nft on dev: https://dev.formfunction.xyz/@petritest/6zyTtuGxS5c59j9QDva1zJkR2GTCuZMEsMdog6wGyjrR?width=192&height=172
const OFFER_TX_SOL = {
  blockTime: 1662133020,
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
                destination: "6Z3CtEfJTbe86sYk7kHyPLwZ4gSbQuyV4V7ZKLxAveHg",
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
                account: "6Z3CtEfJTbe86sYk7kHyPLwZ4gSbQuyV4V7ZKLxAveHg",
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
                account: "6Z3CtEfJTbe86sYk7kHyPLwZ4gSbQuyV4V7ZKLxAveHg",
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
                destination: "FyfvQmj6qnZkvN3c9H7G8fmDvvBby55ZeDEPUbPS2f3f",
                lamports: 1000000000,
                source: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
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
      "Program log: Instruction: CreateTradeState",
      "Program log: Transfer 1795680 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account 6Z3CtEfJTbe86sYk7kHyPLwZ4gSbQuyV4V7ZKLxAveHg",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Completed assignation!",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 45113 of 400000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: BuyV2",
      "Program log: buyer_sale_type = Offer",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 68468 of 354887 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      49817125782, 1795680, 7859721200, 1000000000, 1893120, 1, 1461600,
      5616720, 731913600, 1141440, 4099440, 2039280, 396485152720, 734771963562,
      1169280, 1009200, 934087680,
    ],
    postTokenBalances: [
      {
        accountIndex: 11,
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
      50817130782, 0, 7861516880, 0, 1893120, 1, 1461600, 5616720, 731913600,
      1141440, 4099440, 2039280, 396485152720, 734771963562, 1169280, 1009200,
      934087680,
    ],
    preTokenBalances: [
      {
        accountIndex: 11,
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
  slot: 159326367,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
          signer: true,
          writable: true,
        },
        {
          pubkey: "6Z3CtEfJTbe86sYk7kHyPLwZ4gSbQuyV4V7ZKLxAveHg",
          signer: false,
          writable: true,
        },
        {
          pubkey: "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
          signer: false,
          writable: true,
        },
        {
          pubkey: "FyfvQmj6qnZkvN3c9H7G8fmDvvBby55ZeDEPUbPS2f3f",
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
      addressTableLookups: null,
      instructions: [
        {
          accounts: [
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "6zyTtuGxS5c59j9QDva1zJkR2GTCuZMEsMdog6wGyjrR",
            "Gq2mhHkm7WwuJxjx4mGJytBMDhpEt7zdk3iwoktNNJRg",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
            "6Z3CtEfJTbe86sYk7kHyPLwZ4gSbQuyV4V7ZKLxAveHg",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
          ],
          data: "DJtu3FpCRJ9Y7TqXSAJXjUr8Zahytogucbhxj",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          accounts: [
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "So11111111111111111111111111111111111111112",
            "Gq2mhHkm7WwuJxjx4mGJytBMDhpEt7zdk3iwoktNNJRg",
            "A6WjqrKhzgCtKm7C3TuiTadQ5zZ1GCR47BMtVERUGJZg",
            "FyfvQmj6qnZkvN3c9H7G8fmDvvBby55ZeDEPUbPS2f3f",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
            "6Z3CtEfJTbe86sYk7kHyPLwZ4gSbQuyV4V7ZKLxAveHg",
            "6zyTtuGxS5c59j9QDva1zJkR2GTCuZMEsMdog6wGyjrR",
            "G1L2UYsW2Qm6esPNAGhVU3jojj6heHk2pxtiGhMyCfav",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
            "SysvarC1ock11111111111111111111111111111111",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "FyfvQmj6qnZkvN3c9H7G8fmDvvBby55ZeDEPUbPS2f3f",
            "7GLfUpbAgwk8RM7CL5nHWMBrCgxXvaP8SpZXPvWyrxCg",
            "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          ],
          data: "2tpZiHBNBWa2TL11ahDjL6qFcaSX1wU9HkF7YNm",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "3nbbEkqi4bXsL6y9xW9gCEUArXjqcrHMapbtC45nZujB",
    },
    signatures: [
      "2cEbZXwfRG5coZbPhjpyAoqVQHA7WfZ1M6q3Ne4papnZuPcmqpXwG7GeqDaP6F55WhikaEv6XVwuc7nkcJtZNhVa",
    ],
  },
};

export default OFFER_TX_SOL;
