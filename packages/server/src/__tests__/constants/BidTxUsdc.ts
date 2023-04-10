// https://explorer.solana.com/tx/3BLz6YDJnVXQJyU7zMhLDkJ2RXtoWofWwiNtVzzw8Jzr9U7fdYxfWMwHggzh3kczPbShcwGXpouoBVuDnU6j2EXy?cluster=devnet
// For this nft on dev: https://dev.formfunction.xyz/@brioche/BzwmLaB8Pe7y4kionS1hQiJ9HkidwCmjSEhWwVesNBDp?width=296&height=313
const BID_TX_USDC = {
  blockTime: 1661794755,
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
                destination: "5keTnUsDPgNbEpGnKChyhcHDihq78FGRACLabRut1gwn",
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
                account: "5keTnUsDPgNbEpGnKChyhcHDihq78FGRACLabRut1gwn",
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
                account: "5keTnUsDPgNbEpGnKChyhcHDihq78FGRACLabRut1gwn",
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
                destination: "GSDCmk6Hj7yQR1PsWsYsJ3CeFgoatt6qkAqvzyZa2Cuu",
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
                account: "GSDCmk6Hj7yQR1PsWsYsJ3CeFgoatt6qkAqvzyZa2Cuu",
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
                account: "GSDCmk6Hj7yQR1PsWsYsJ3CeFgoatt6qkAqvzyZa2Cuu",
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
                account: "GSDCmk6Hj7yQR1PsWsYsJ3CeFgoatt6qkAqvzyZa2Cuu",
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
                amount: "350000000",
                authority: "8KUU21MBhtJBXnPMEpq7HZ3egoymHopizCydw12uNKfC",
                destination: "GSDCmk6Hj7yQR1PsWsYsJ3CeFgoatt6qkAqvzyZa2Cuu",
                source: "4H9xLngTBcdMqgZJfTZA1WV8nvRHi79JTjN55JCxwvfi",
              },
              type: "transfer",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                amount: "3250000",
                authority: "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
                destination: "6rV8meqv69iBvt4Xnr48CScKUMWuEpgfm2qL85XyD8NB",
                source: "2bkH7V1rNoEE4YnLUqz4V5jxEWCQbH38Gs1uq1srGu7v",
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
      "Program log: Allocate space for the account 5keTnUsDPgNbEpGnKChyhcHDihq78FGRACLabRut1gwn",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Completed assignation!",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 45087 of 400000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: BuyV2",
      "Program log: buyer_sale_type = Auction",
      "Program log: Transfer 2039280 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account GSDCmk6Hj7yQR1PsWsYsJ3CeFgoatt6qkAqvzyZa2Cuu",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Completed assignation!",
      "Program log: This.",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeAccount2",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4362 of 274857 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program log: Passes",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: Transfer",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4645 of 267395 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: Transfer",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4645 of 251425 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 109818 of 354913 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      15963953840, 2039280, 2039280, 1795680, 2039280, 915387280, 2039280,
      1893120, 1, 3433882610, 5616720, 731913600, 1461600, 4099440, 1141440,
      2039280, 27003456600, 396653696920, 1169280, 1009200, 934087680,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
        mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        owner: "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "0",
          decimals: 6,
          uiAmount: null,
          uiAmountString: "0",
        },
      },
      {
        accountIndex: 2,
        mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        owner: "8KUU21MBhtJBXnPMEpq7HZ3egoymHopizCydw12uNKfC",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "999651900000",
          decimals: 6,
          uiAmount: 999651.9,
          uiAmountString: "999651.9",
        },
      },
      {
        accountIndex: 4,
        mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        owner: "5BNvH7hxxeMfJkBYpFArEAy5iaYCypjxVFb1KtbZSLk4",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "10000000000",
          decimals: 6,
          uiAmount: 10000,
          uiAmountString: "10000",
        },
      },
      {
        accountIndex: 6,
        mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        owner: "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "350000000",
          decimals: 6,
          uiAmount: 350,
          uiAmountString: "350",
        },
      },
      {
        accountIndex: 15,
        mint: "BzwmLaB8Pe7y4kionS1hQiJ9HkidwCmjSEhWwVesNBDp",
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
      15963958840, 2039280, 2039280, 0, 2039280, 919222240, 0, 1893120, 1,
      3433882610, 5616720, 731913600, 1461600, 4099440, 1141440, 2039280,
      27003456600, 396653696920, 1169280, 1009200, 934087680,
    ],
    preTokenBalances: [
      {
        accountIndex: 1,
        mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        owner: "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "3250000",
          decimals: 6,
          uiAmount: 3.25,
          uiAmountString: "3.25",
        },
      },
      {
        accountIndex: 2,
        mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        owner: "8KUU21MBhtJBXnPMEpq7HZ3egoymHopizCydw12uNKfC",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "1000001900000",
          decimals: 6,
          uiAmount: 1000001.9,
          uiAmountString: "1000001.9",
        },
      },
      {
        accountIndex: 4,
        mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        owner: "5BNvH7hxxeMfJkBYpFArEAy5iaYCypjxVFb1KtbZSLk4",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "9996750000",
          decimals: 6,
          uiAmount: 9996.75,
          uiAmountString: "9996.75",
        },
      },
      {
        accountIndex: 15,
        mint: "BzwmLaB8Pe7y4kionS1hQiJ9HkidwCmjSEhWwVesNBDp",
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
  slot: 158433633,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "8KUU21MBhtJBXnPMEpq7HZ3egoymHopizCydw12uNKfC",
          signer: true,
          writable: true,
        },
        {
          pubkey: "2bkH7V1rNoEE4YnLUqz4V5jxEWCQbH38Gs1uq1srGu7v",
          signer: false,
          writable: true,
        },
        {
          pubkey: "4H9xLngTBcdMqgZJfTZA1WV8nvRHi79JTjN55JCxwvfi",
          signer: false,
          writable: true,
        },
        {
          pubkey: "5keTnUsDPgNbEpGnKChyhcHDihq78FGRACLabRut1gwn",
          signer: false,
          writable: true,
        },
        {
          pubkey: "6rV8meqv69iBvt4Xnr48CScKUMWuEpgfm2qL85XyD8NB",
          signer: false,
          writable: true,
        },
        {
          pubkey: "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
          signer: false,
          writable: true,
        },
        {
          pubkey: "GSDCmk6Hj7yQR1PsWsYsJ3CeFgoatt6qkAqvzyZa2Cuu",
          signer: false,
          writable: true,
        },
        {
          pubkey: "GZAGWNAGj3oTeCnogPDzFVDitYhqvSjYfZ7oybYYCEbS",
          signer: false,
          writable: true,
        },
        {
          pubkey: "11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "5BNvH7hxxeMfJkBYpFArEAy5iaYCypjxVFb1KtbZSLk4",
          signer: false,
          writable: false,
        },
        {
          pubkey: "83tmtw8LsWXZ7mdSn6L24SvErbP8qdF6rP2UvZo9az3q",
          signer: false,
          writable: false,
        },
        {
          pubkey: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          signer: false,
          writable: false,
        },
        {
          pubkey: "BzwmLaB8Pe7y4kionS1hQiJ9HkidwCmjSEhWwVesNBDp",
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
          pubkey: "DQJvchg1ok4vPcUoZC5PKjT7RGp5btkRXdr5EXNmUJdt",
          signer: false,
          writable: false,
        },
        {
          pubkey: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
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
            "8KUU21MBhtJBXnPMEpq7HZ3egoymHopizCydw12uNKfC",
            "BzwmLaB8Pe7y4kionS1hQiJ9HkidwCmjSEhWwVesNBDp",
            "DQJvchg1ok4vPcUoZC5PKjT7RGp5btkRXdr5EXNmUJdt",
            "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
            "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
            "5keTnUsDPgNbEpGnKChyhcHDihq78FGRACLabRut1gwn",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
          ],
          data: "DJtu3FpCRJ9Y29Q1q2pZ1uf27JVfn7MK3xtbh",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          accounts: [
            "8KUU21MBhtJBXnPMEpq7HZ3egoymHopizCydw12uNKfC",
            "4H9xLngTBcdMqgZJfTZA1WV8nvRHi79JTjN55JCxwvfi",
            "8KUU21MBhtJBXnPMEpq7HZ3egoymHopizCydw12uNKfC",
            "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
            "DQJvchg1ok4vPcUoZC5PKjT7RGp5btkRXdr5EXNmUJdt",
            "83tmtw8LsWXZ7mdSn6L24SvErbP8qdF6rP2UvZo9az3q",
            "GSDCmk6Hj7yQR1PsWsYsJ3CeFgoatt6qkAqvzyZa2Cuu",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "CXfjR5HG27MWd33xM753QmEFbNbbqUphqNPSL32ayJcs",
            "9LPrXuXSk9u6kf5s44hx9AGUjBaye4TMqGwZT2rXGDnQ",
            "5keTnUsDPgNbEpGnKChyhcHDihq78FGRACLabRut1gwn",
            "BzwmLaB8Pe7y4kionS1hQiJ9HkidwCmjSEhWwVesNBDp",
            "GZAGWNAGj3oTeCnogPDzFVDitYhqvSjYfZ7oybYYCEbS",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
            "SysvarC1ock11111111111111111111111111111111",
            "5BNvH7hxxeMfJkBYpFArEAy5iaYCypjxVFb1KtbZSLk4",
            "2bkH7V1rNoEE4YnLUqz4V5jxEWCQbH38Gs1uq1srGu7v",
            "6rV8meqv69iBvt4Xnr48CScKUMWuEpgfm2qL85XyD8NB",
            "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          ],
          data: "2Q5RQtvf12bQwo2ZFLR6UnW2GCyzVD2WpiDiUBb2LieXqSekMG",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "3aKDQZ2j1FgeBW8U9zdb4wTTN3bieQ8fPu1QjjiVTrPc",
    },
    signatures: [
      "3BLz6YDJnVXQJyU7zMhLDkJ2RXtoWofWwiNtVzzw8Jzr9U7fdYxfWMwHggzh3kczPbShcwGXpouoBVuDnU6j2EXy",
    ],
  },
};

export default BID_TX_USDC;
