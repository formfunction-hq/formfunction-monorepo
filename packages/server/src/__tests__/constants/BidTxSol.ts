// https://explorer.solana.com/tx/3hgFvozsCCEd2SW6TTTh2AMuacdEYBfxZw9J1CeybXXD8xhb8D3AzJnj625cN9MbXSazcyAMWiLmKnSKWHbRuwTi?cluster=devnet
// For this nft on dev: https://dev.formfunction.xyz/@pencilflip/8A9zZfi8pejuDuzYPWTKaSkhdCFVqmmhhEC3v4xrtr5P?width=5304&height=7952
const BID_TX_SOL = {
  blockTime: 1662072211,
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
                destination: "8kgbKEpQdQXozdtiv8yBCxUXJp9qzQpWnkVcSg8V82XX",
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
                account: "8kgbKEpQdQXozdtiv8yBCxUXJp9qzQpWnkVcSg8V82XX",
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
                account: "8kgbKEpQdQXozdtiv8yBCxUXJp9qzQpWnkVcSg8V82XX",
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
                destination: "7EoJxey3BkpmqJoLAqU3HMXn9mXrsHLbScNFK5RdWND",
                lamports: 100000000,
                source: "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
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
      "Program log: Allocate space for the account 8kgbKEpQdQXozdtiv8yBCxUXJp9qzQpWnkVcSg8V82XX",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Completed assignation!",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 45139 of 400000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: BuyV2",
      "Program log: buyer_sale_type = Auction",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 63970 of 354861 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      7865064113, 100000000, 1795680, 1893120, 7874817440, 1, 1461600, 5616720,
      731913600, 1141440, 4099440, 2039280, 396490847080, 734771963562, 1169280,
      1009200, 934087680,
    ],
    postTokenBalances: [
      {
        accountIndex: 11,
        mint: "8A9zZfi8pejuDuzYPWTKaSkhdCFVqmmhhEC3v4xrtr5P",
        owner: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
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
      7965069113, 0, 0, 1893120, 7876613120, 1, 1461600, 5616720, 731913600,
      1141440, 4099440, 2039280, 396490847080, 734771963562, 1169280, 1009200,
      934087680,
    ],
    preTokenBalances: [
      {
        accountIndex: 11,
        mint: "8A9zZfi8pejuDuzYPWTKaSkhdCFVqmmhhEC3v4xrtr5P",
        owner: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
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
  slot: 159165872,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
          signer: true,
          writable: true,
        },
        {
          pubkey: "7EoJxey3BkpmqJoLAqU3HMXn9mXrsHLbScNFK5RdWND",
          signer: false,
          writable: true,
        },
        {
          pubkey: "8kgbKEpQdQXozdtiv8yBCxUXJp9qzQpWnkVcSg8V82XX",
          signer: false,
          writable: true,
        },
        {
          pubkey: "AShci2cxZq3Ec4NRwJ5Um7yGko9rkejZ1zq3zh8eZ1sX",
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
          pubkey: "8A9zZfi8pejuDuzYPWTKaSkhdCFVqmmhhEC3v4xrtr5P",
          signer: false,
          writable: false,
        },
        {
          pubkey: "8CaVQNfm4Muq31mbG33kLFoV22nf5msbzMei9gPn8DdX",
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
          pubkey: "HoERfPsYu9p9jeUFR7pD6PhZ5tARwxfFo9ck7inBXRrx",
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
            "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
            "8A9zZfi8pejuDuzYPWTKaSkhdCFVqmmhhEC3v4xrtr5P",
            "HoERfPsYu9p9jeUFR7pD6PhZ5tARwxfFo9ck7inBXRrx",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
            "8kgbKEpQdQXozdtiv8yBCxUXJp9qzQpWnkVcSg8V82XX",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
          ],
          data: "DJtu3FpCRJ9XkEMZQajbNqrzXjafTmTYxrTBV",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          accounts: [
            "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
            "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
            "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
            "So11111111111111111111111111111111111111112",
            "HoERfPsYu9p9jeUFR7pD6PhZ5tARwxfFo9ck7inBXRrx",
            "8CaVQNfm4Muq31mbG33kLFoV22nf5msbzMei9gPn8DdX",
            "7EoJxey3BkpmqJoLAqU3HMXn9mXrsHLbScNFK5RdWND",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
            "8kgbKEpQdQXozdtiv8yBCxUXJp9qzQpWnkVcSg8V82XX",
            "8A9zZfi8pejuDuzYPWTKaSkhdCFVqmmhhEC3v4xrtr5P",
            "AShci2cxZq3Ec4NRwJ5Um7yGko9rkejZ1zq3zh8eZ1sX",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
            "SysvarC1ock11111111111111111111111111111111",
            "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
            "7EoJxey3BkpmqJoLAqU3HMXn9mXrsHLbScNFK5RdWND",
            "CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ",
            "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          ],
          data: "2tpZiHBNBWa2Rj11asreMWMSAvvST7VjgmYTUNq",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "AXy89FbQrHnK6QrXKvD28auC2rqpmt6kA9bAdfvPGYKf",
    },
    signatures: [
      "3hgFvozsCCEd2SW6TTTh2AMuacdEYBfxZw9J1CeybXXD8xhb8D3AzJnj625cN9MbXSazcyAMWiLmKnSKWHbRuwTi",
    ],
  },
};

export default BID_TX_SOL;
