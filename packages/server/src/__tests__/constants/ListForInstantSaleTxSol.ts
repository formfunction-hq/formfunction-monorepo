// https://explorer.solana.com/tx/49uWbLA8ccLCqxriWkM5K8SijDx81nWFRwfsUfdU45NxqmGx3QdKWs2XqpcpH6fejCkbEH4UTcEpk1cFaoYXpA66?cluster=devnet
// For this nft on dev: https://dev.formfunction.xyz/@pencilflip/D2bn9fg3qy2uCijjfsWXR95A722YU9aaCg5BkiaK8V1B?width=4000&height=4000
const LIST_FOR_INSTANT_SALE_TX_SOL = {
  blockTime: 1660969920,
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
                destination: "JB5xjmdEDAko4VKoaBKEg1ZookSGBZtdrEzMSuJxAJSS",
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
                account: "JB5xjmdEDAko4VKoaBKEg1ZookSGBZtdrEzMSuJxAJSS",
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
                account: "JB5xjmdEDAko4VKoaBKEg1ZookSGBZtdrEzMSuJxAJSS",
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
                owner: "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
                source: "Gut8pWjFEZZm48GF2jxYGty43sCVUdqEEG72YQP1ay1F",
              },
              type: "approve",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            accounts: [
              "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
              "Gut8pWjFEZZm48GF2jxYGty43sCVUdqEEG72YQP1ay1F",
              "BF1eqf2e1YkuCk8bcoH7TTJufHrCMouKrvb4RWmBaSbv",
              "D2bn9fg3qy2uCijjfsWXR95A722YU9aaCg5BkiaK8V1B",
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            ],
            data: "T",
            programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          },
          {
            parsed: {
              info: {
                account: "Gut8pWjFEZZm48GF2jxYGty43sCVUdqEEG72YQP1ay1F",
                freezeAuthority: "BF1eqf2e1YkuCk8bcoH7TTJufHrCMouKrvb4RWmBaSbv",
                mint: "D2bn9fg3qy2uCijjfsWXR95A722YU9aaCg5BkiaK8V1B",
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
      "Program log: Allocate space for the account JB5xjmdEDAko4VKoaBKEg1ZookSGBZtdrEzMSuJxAJSS",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Completed assignation!",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 45189 of 400000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: Sell",
      "Program log: seller_sale_type = InstantSale",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: Approve",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2904 of 317008 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [2]",
      "Program log: Instruction: Freeze Delegated Account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: FreezeAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4310 of 299614 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 15301 of 310308 compute units",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 60708 of 354811 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      9944791953, 0, 7998204320, 0, 2039280, 1795680, 1, 5616720, 2853600,
      1461600, 1141440, 4099440, 396942801680, 1141440, 1009200, 934087680,
    ],
    postTokenBalances: [
      {
        accountIndex: 4,
        mint: "D2bn9fg3qy2uCijjfsWXR95A722YU9aaCg5BkiaK8V1B",
        owner: "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
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
      9944796953, 0, 8000000000, 0, 2039280, 0, 1, 5616720, 2853600, 1461600,
      1141440, 4099440, 396942801680, 1141440, 1009200, 934087680,
    ],
    preTokenBalances: [
      {
        accountIndex: 4,
        mint: "D2bn9fg3qy2uCijjfsWXR95A722YU9aaCg5BkiaK8V1B",
        owner: "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
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
  slot: 156257042,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
          signer: true,
          writable: true,
        },
        {
          pubkey: "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
          signer: false,
          writable: true,
        },
        {
          pubkey: "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
          signer: false,
          writable: true,
        },
        {
          pubkey: "EDP2fbPFzSHNMWb6MNjNP3sBHBjqeLon64gnaezAq9zE",
          signer: false,
          writable: true,
        },
        {
          pubkey: "Gut8pWjFEZZm48GF2jxYGty43sCVUdqEEG72YQP1ay1F",
          signer: false,
          writable: true,
        },
        {
          pubkey: "JB5xjmdEDAko4VKoaBKEg1ZookSGBZtdrEzMSuJxAJSS",
          signer: false,
          writable: true,
        },
        {
          pubkey: "11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "9GuEyjH5oyEzH59wyi3GRhatFDwKGFjk89bXjzg1SgL4",
          signer: false,
          writable: false,
        },
        {
          pubkey: "BF1eqf2e1YkuCk8bcoH7TTJufHrCMouKrvb4RWmBaSbv",
          signer: false,
          writable: false,
        },
        {
          pubkey: "D2bn9fg3qy2uCijjfsWXR95A722YU9aaCg5BkiaK8V1B",
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
            "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
            "D2bn9fg3qy2uCijjfsWXR95A722YU9aaCg5BkiaK8V1B",
            "Gut8pWjFEZZm48GF2jxYGty43sCVUdqEEG72YQP1ay1F",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
            "JB5xjmdEDAko4VKoaBKEg1ZookSGBZtdrEzMSuJxAJSS",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
          ],
          data: "DJtu3FpCRJ9YPP8Ca813AxcFdzQSBzuuhHCwy",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          accounts: [
            "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
            "Gut8pWjFEZZm48GF2jxYGty43sCVUdqEEG72YQP1ay1F",
            "9GuEyjH5oyEzH59wyi3GRhatFDwKGFjk89bXjzg1SgL4",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
            "JB5xjmdEDAko4VKoaBKEg1ZookSGBZtdrEzMSuJxAJSS",
            "EDP2fbPFzSHNMWb6MNjNP3sBHBjqeLon64gnaezAq9zE",
            "D2bn9fg3qy2uCijjfsWXR95A722YU9aaCg5BkiaK8V1B",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "7pihZkN38CNG5TZNcXN4d8NmmrXAPUbjgeiRcZiUuMKs",
            "SysvarRent111111111111111111111111111111111",
            "BF1eqf2e1YkuCk8bcoH7TTJufHrCMouKrvb4RWmBaSbv",
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          ],
          data: "81r6u24fHZhKyeUWds6JzrsspLEYfTSSZHmZq",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "5xL4HiwjKhHcadKeyEZmZB3HwpoS5L6tecDFBJq9CQyt",
    },
    signatures: [
      "49uWbLA8ccLCqxriWkM5K8SijDx81nWFRwfsUfdU45NxqmGx3QdKWs2XqpcpH6fejCkbEH4UTcEpk1cFaoYXpA66",
    ],
  },
};

export default LIST_FOR_INSTANT_SALE_TX_SOL;
