// https://explorer.solana.com/tx/5DqdczwNZwDwf79qaNuXmL5PdFaLdHZCJ6QXCHNUF9qBkK2y5SM3vCRuKgL2jtPeHUNK3QBRbT9cgE3s7yn6SVMv?cluster=devnet
// https://dev.formfunction.xyz/@soursop/Gs2mduryZHmKmQNHd5MRc3ePoGMpNeqoNgXYVjcAH1MZ?width=512&height=512
const CREATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_SOL = {
  blockTime: 1662576684,
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
                lamports: 3695760,
                newAccount: "DpZ3v3jpWb9B4gvLNvGnuh4bXoJ4hNoeN6MDyfpZVMvb",
                owner: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
                source: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
                space: 403,
              },
              type: "createAccount",
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
                extensionTypes: ["immutableOwner"],
                mint: "Gs2mduryZHmKmQNHd5MRc3ePoGMpNeqoNgXYVjcAH1MZ",
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
                newAccount: "7wEU8wf2eBVASbEQd82Lc18zsfvKaKhXXgRZxoqxWGfJ",
                owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                source: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
                space: 165,
              },
              type: "createAccount",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: { account: "7wEU8wf2eBVASbEQd82Lc18zsfvKaKhXXgRZxoqxWGfJ" },
              type: "initializeImmutableOwner",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                account: "7wEU8wf2eBVASbEQd82Lc18zsfvKaKhXXgRZxoqxWGfJ",
                mint: "Gs2mduryZHmKmQNHd5MRc3ePoGMpNeqoNgXYVjcAH1MZ",
                owner: "DpZ3v3jpWb9B4gvLNvGnuh4bXoJ4hNoeN6MDyfpZVMvb",
              },
              type: "initializeAccount3",
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
      "Program log: Instruction: CreateEditionDistributor",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 20494 of 600000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]",
      "Program log: Create",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: GetAccountDataSize",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1622 of 572415 compute units",
      "Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Initialize the associated token account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeImmutableOwner",
      "Program log: Please upgrade to SPL Token 2022 for immutable owner support",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 565925 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeAccount3",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4241 of 562042 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 22043 of 579506 compute units",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: Transfer",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4644 of 557463 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
    ],
    postBalances: [
      27150989920, 2039280, 3695760, 2039280, 1, 2853600, 731913600, 1141440,
      1461600, 734771963562, 1169280, 1009200, 934087680,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
        mint: "Gs2mduryZHmKmQNHd5MRc3ePoGMpNeqoNgXYVjcAH1MZ",
        owner: "DpZ3v3jpWb9B4gvLNvGnuh4bXoJ4hNoeN6MDyfpZVMvb",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
      {
        accountIndex: 3,
        mint: "Gs2mduryZHmKmQNHd5MRc3ePoGMpNeqoNgXYVjcAH1MZ",
        owner: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
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
      27156729960, 0, 0, 2039280, 1, 2853600, 731913600, 1141440, 1461600,
      734771963562, 1169280, 1009200, 934087680,
    ],
    preTokenBalances: [
      {
        accountIndex: 3,
        mint: "Gs2mduryZHmKmQNHd5MRc3ePoGMpNeqoNgXYVjcAH1MZ",
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
  slot: 160498688,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
          signer: true,
          writable: true,
        },
        {
          pubkey: "7wEU8wf2eBVASbEQd82Lc18zsfvKaKhXXgRZxoqxWGfJ",
          signer: false,
          writable: true,
        },
        {
          pubkey: "DpZ3v3jpWb9B4gvLNvGnuh4bXoJ4hNoeN6MDyfpZVMvb",
          signer: false,
          writable: true,
        },
        {
          pubkey: "FA1Kedu33o2Gk1RMTWkheRiDqPAxSonUxRLivdJS8Y2E",
          signer: false,
          writable: true,
        },
        {
          pubkey: "11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "35DBXygpwcU2JCxSJsbiZWAbWFQbUqkCGbFbjb6DAd6A",
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
          pubkey: "Gs2mduryZHmKmQNHd5MRc3ePoGMpNeqoNgXYVjcAH1MZ",
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
            "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
            "Gs2mduryZHmKmQNHd5MRc3ePoGMpNeqoNgXYVjcAH1MZ",
            "FA1Kedu33o2Gk1RMTWkheRiDqPAxSonUxRLivdJS8Y2E",
            "35DBXygpwcU2JCxSJsbiZWAbWFQbUqkCGbFbjb6DAd6A",
            "DpZ3v3jpWb9B4gvLNvGnuh4bXoJ4hNoeN6MDyfpZVMvb",
            "11111111111111111111111111111111",
            "SysvarC1ock11111111111111111111111111111111",
            "So11111111111111111111111111111111111111112",
          ],
          data: "PB5JNmid7KBMje4dA2HXSWCwANeNcjCfy",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          parsed: {
            info: {
              account: "7wEU8wf2eBVASbEQd82Lc18zsfvKaKhXXgRZxoqxWGfJ",
              mint: "Gs2mduryZHmKmQNHd5MRc3ePoGMpNeqoNgXYVjcAH1MZ",
              rentSysvar: "SysvarRent111111111111111111111111111111111",
              source: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
              systemProgram: "11111111111111111111111111111111",
              tokenProgram: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              wallet: "DpZ3v3jpWb9B4gvLNvGnuh4bXoJ4hNoeN6MDyfpZVMvb",
            },
            type: "create",
          },
          program: "spl-associated-token-account",
          programId: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
        },
        {
          parsed: {
            info: {
              amount: "1",
              authority: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
              destination: "7wEU8wf2eBVASbEQd82Lc18zsfvKaKhXXgRZxoqxWGfJ",
              source: "FA1Kedu33o2Gk1RMTWkheRiDqPAxSonUxRLivdJS8Y2E",
            },
            type: "transfer",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
      ],
      recentBlockhash: "6VagptBscNGv3aZMT8HsXD1LeQPKYJ9aaz69UBGTjvHh",
    },
    signatures: [
      "5DqdczwNZwDwf79qaNuXmL5PdFaLdHZCJ6QXCHNUF9qBkK2y5SM3vCRuKgL2jtPeHUNK3QBRbT9cgE3s7yn6SVMv",
    ],
  },
};

export default CREATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_SOL;
