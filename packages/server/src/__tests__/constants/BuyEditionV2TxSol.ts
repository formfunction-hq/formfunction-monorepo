const BUY_EDITION_V2_TX_SOL = {
  blockTime: 1661193395,
  meta: {
    err: null,
    fee: 15000,
    innerInstructions: [
      {
        index: 1,
        instructions: [
          {
            parsed: {
              info: {
                lamports: 1461600,
                newAccount: "4G9iVEeVSwF87hzqwfrKwg7shtiwdWEoYFtZYuuJuhve",
                owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                source: "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
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
                freezeAuthority: "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
                mint: "4G9iVEeVSwF87hzqwfrKwg7shtiwdWEoYFtZYuuJuhve",
                mintAuthority: "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
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
                account: "J3SPPMtgrLDpEu7mtJsi8YdHmVHw1tS6AFhzeFjWnuie",
                mint: "4G9iVEeVSwF87hzqwfrKwg7shtiwdWEoYFtZYuuJuhve",
                rentSysvar: "SysvarRent111111111111111111111111111111111",
                source: "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
                systemProgram: "11111111111111111111111111111111",
                tokenProgram: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                wallet: "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
              },
              type: "create",
            },
            program: "spl-associated-token-account",
            programId: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          },
          {
            parsed: {
              info: {
                mint: "4G9iVEeVSwF87hzqwfrKwg7shtiwdWEoYFtZYuuJuhve",
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
                newAccount: "J3SPPMtgrLDpEu7mtJsi8YdHmVHw1tS6AFhzeFjWnuie",
                owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                source: "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
                space: 165,
              },
              type: "createAccount",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "J3SPPMtgrLDpEu7mtJsi8YdHmVHw1tS6AFhzeFjWnuie",
              },
              type: "initializeImmutableOwner",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                account: "J3SPPMtgrLDpEu7mtJsi8YdHmVHw1tS6AFhzeFjWnuie",
                mint: "4G9iVEeVSwF87hzqwfrKwg7shtiwdWEoYFtZYuuJuhve",
                owner: "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
              },
              type: "initializeAccount3",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                account: "J3SPPMtgrLDpEu7mtJsi8YdHmVHw1tS6AFhzeFjWnuie",
                amount: "1",
                mint: "4G9iVEeVSwF87hzqwfrKwg7shtiwdWEoYFtZYuuJuhve",
                mintAuthority: "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
              },
              type: "mintTo",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            accounts: [
              "7bdf6TUuUmDnpLkMkDpfQNYDbx7zfmrX6JKnxM8aAoEg",
              "AHGhQ4XeTRtCNSztKCG2ie4YRsdazeTECTRhkMXRE5pY",
              "7iJ8b6FgsW7PTW95MUdiYZbDMw931jPm9DNwHfi8Y4BB",
              "4G9iVEeVSwF87hzqwfrKwg7shtiwdWEoYFtZYuuJuhve",
              "AyQMcAutTgqcHtKjmQ8rDAmvjaNGZczugHgMoVTMkjRB",
              "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
              "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
              "7hQ2stLKFpfr2XQx5bS7vFJZyNnjYTb8i2eTLxssUf9U",
              "6n34rki9dF6mgedBQ1QrY13Wes3vsXBCFqXwwF1nAwBF",
              "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
              "DuSc3mdZYHfFDSH2V7GQbjVRSw3KpjgzDeY2Xcu82VQh",
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              "11111111111111111111111111111111",
              "SysvarRent111111111111111111111111111111111",
            ],
            data: "98WqDEZLT8C7",
            programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          },
          {
            parsed: {
              info: {
                destination: "7bdf6TUuUmDnpLkMkDpfQNYDbx7zfmrX6JKnxM8aAoEg",
                lamports: 5616720,
                source: "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "7bdf6TUuUmDnpLkMkDpfQNYDbx7zfmrX6JKnxM8aAoEg",
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
                account: "7bdf6TUuUmDnpLkMkDpfQNYDbx7zfmrX6JKnxM8aAoEg",
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
                destination: "AHGhQ4XeTRtCNSztKCG2ie4YRsdazeTECTRhkMXRE5pY",
                lamports: 2568240,
                source: "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "AHGhQ4XeTRtCNSztKCG2ie4YRsdazeTECTRhkMXRE5pY",
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
                account: "AHGhQ4XeTRtCNSztKCG2ie4YRsdazeTECTRhkMXRE5pY",
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
                mint: "4G9iVEeVSwF87hzqwfrKwg7shtiwdWEoYFtZYuuJuhve",
                multisigAuthority:
                  "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
                newAuthority: "AHGhQ4XeTRtCNSztKCG2ie4YRsdazeTECTRhkMXRE5pY",
                signers: ["5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y"],
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
                mint: "4G9iVEeVSwF87hzqwfrKwg7shtiwdWEoYFtZYuuJuhve",
                multisigAuthority:
                  "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
                newAuthority: "AHGhQ4XeTRtCNSztKCG2ie4YRsdazeTECTRhkMXRE5pY",
                signers: ["5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y"],
              },
              type: "setAuthority",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                destination: "5iae1HV9bctTXxnXEUPkoPoy4LYzAp1bL3gPr98tyAc7",
                lamports: 500000,
                source: "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
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
                lamports: 9500000,
                source: "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
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
      "Program ComputeBudget111111111111111111111111111111 invoke [1]",
      "Program ComputeBudget111111111111111111111111111111 success",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX invoke [1]",
      "Program log: Instruction: BuyEditionV2",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeMint",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2968 of 328618 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [2]",
      "Program log: Create",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: GetAccountDataSize",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1622 of 307575 compute units",
      "Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program 11111111111111111111111111111111 invoke [3]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Initialize the associated token account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: InitializeImmutableOwner",
      "Program log: Please upgrade to SPL Token 2022 for immutable owner support",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 301085 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: InitializeAccount3",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4241 of 297203 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 23444 of 316089 compute units",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: MintTo",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4538 of 289779 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program log: Next available edition = 3",
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
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3090 of 225726 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program log: Setting freeze authority",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: SetAuthority",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3250 of 220197 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program log: Finished setting freeze authority",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 53506 of 269767 compute units",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Bought edition #3 for mint 5RetyqdSPbRMpdNdyQ7ajmdrfXCt3V19uFh8sBn2ZQFB",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 205849 of 400000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
    ],
    postBalances: [
      4042353440, 1461600, 0, 157500000, 5616720, 3695760, 2853600, 2568240,
      1113600, 37228221108, 1405920, 4099440, 7988738720, 2039280, 1, 1461600,
      2039280, 731913600, 1, 1141440, 5616720, 396899144920, 1141440,
      734769924282, 1169280, 1009200, 934087680,
    ],
    postTokenBalances: [
      {
        accountIndex: 13,
        mint: "4G9iVEeVSwF87hzqwfrKwg7shtiwdWEoYFtZYuuJuhve",
        owner: "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
      {
        accountIndex: 16,
        mint: "5RetyqdSPbRMpdNdyQ7ajmdrfXCt3V19uFh8sBn2ZQFB",
        owner: "7hQ2stLKFpfr2XQx5bS7vFJZyNnjYTb8i2eTLxssUf9U",
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
      4064054280, 0, 0, 157000000, 0, 3695760, 2853600, 0, 1113600, 37218721108,
      1405920, 4099440, 7988738720, 0, 1, 1461600, 2039280, 731913600, 1,
      1141440, 5616720, 396899144920, 1141440, 734769924282, 1169280, 1009200,
      934087680,
    ],
    preTokenBalances: [
      {
        accountIndex: 16,
        mint: "5RetyqdSPbRMpdNdyQ7ajmdrfXCt3V19uFh8sBn2ZQFB",
        owner: "7hQ2stLKFpfr2XQx5bS7vFJZyNnjYTb8i2eTLxssUf9U",
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
  slot: 156846591,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
          signer: true,
          writable: true,
        },
        {
          pubkey: "4G9iVEeVSwF87hzqwfrKwg7shtiwdWEoYFtZYuuJuhve",
          signer: true,
          writable: true,
        },
        {
          pubkey: "antiDV8bRvF4XTeRqmyHV1jpHD4Lvz7gKBKBBRQb8ir",
          signer: true,
          writable: false,
        },
        {
          pubkey: "5iae1HV9bctTXxnXEUPkoPoy4LYzAp1bL3gPr98tyAc7",
          signer: false,
          writable: true,
        },
        {
          pubkey: "7bdf6TUuUmDnpLkMkDpfQNYDbx7zfmrX6JKnxM8aAoEg",
          signer: false,
          writable: true,
        },
        {
          pubkey: "7hQ2stLKFpfr2XQx5bS7vFJZyNnjYTb8i2eTLxssUf9U",
          signer: false,
          writable: true,
        },
        {
          pubkey: "7iJ8b6FgsW7PTW95MUdiYZbDMw931jPm9DNwHfi8Y4BB",
          signer: false,
          writable: true,
        },
        {
          pubkey: "AHGhQ4XeTRtCNSztKCG2ie4YRsdazeTECTRhkMXRE5pY",
          signer: false,
          writable: true,
        },
        {
          pubkey: "AyQMcAutTgqcHtKjmQ8rDAmvjaNGZczugHgMoVTMkjRB",
          signer: false,
          writable: true,
        },
        {
          pubkey: "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
          signer: false,
          writable: true,
        },
        {
          pubkey: "D4bN2bL8Q5sUG6eKM3Bwmtiyu9uiXsQ8y3ZKMXDEyhV6",
          signer: false,
          writable: true,
        },
        {
          pubkey: "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
          signer: false,
          writable: true,
        },
        {
          pubkey: "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
          signer: false,
          writable: true,
        },
        {
          pubkey: "J3SPPMtgrLDpEu7mtJsi8YdHmVHw1tS6AFhzeFjWnuie",
          signer: false,
          writable: true,
        },
        {
          pubkey: "11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "5RetyqdSPbRMpdNdyQ7ajmdrfXCt3V19uFh8sBn2ZQFB",
          signer: false,
          writable: false,
        },
        {
          pubkey: "6n34rki9dF6mgedBQ1QrY13Wes3vsXBCFqXwwF1nAwBF",
          signer: false,
          writable: false,
        },
        {
          pubkey: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          signer: false,
          writable: false,
        },
        {
          pubkey: "ComputeBudget111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
          signer: false,
          writable: false,
        },
        {
          pubkey: "DuSc3mdZYHfFDSH2V7GQbjVRSw3KpjgzDeY2Xcu82VQh",
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
          accounts: [],
          data: "HMypLP",
          programId: "ComputeBudget111111111111111111111111111111",
        },
        {
          accounts: [
            "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
            "7hQ2stLKFpfr2XQx5bS7vFJZyNnjYTb8i2eTLxssUf9U",
            "5RetyqdSPbRMpdNdyQ7ajmdrfXCt3V19uFh8sBn2ZQFB",
            "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
            "So11111111111111111111111111111111111111112",
            "5iae1HV9bctTXxnXEUPkoPoy4LYzAp1bL3gPr98tyAc7",
            "DJ117NHZaXzpKQ5VwHzQBGzJYKwRT6vaxWd2q39gkXxN",
            "DuSc3mdZYHfFDSH2V7GQbjVRSw3KpjgzDeY2Xcu82VQh",
            "7iJ8b6FgsW7PTW95MUdiYZbDMw931jPm9DNwHfi8Y4BB",
            "4G9iVEeVSwF87hzqwfrKwg7shtiwdWEoYFtZYuuJuhve",
            "7bdf6TUuUmDnpLkMkDpfQNYDbx7zfmrX6JKnxM8aAoEg",
            "AHGhQ4XeTRtCNSztKCG2ie4YRsdazeTECTRhkMXRE5pY",
            "AyQMcAutTgqcHtKjmQ8rDAmvjaNGZczugHgMoVTMkjRB",
            "6n34rki9dF6mgedBQ1QrY13Wes3vsXBCFqXwwF1nAwBF",
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
            "SysvarC1ock11111111111111111111111111111111",
            "antiDV8bRvF4XTeRqmyHV1jpHD4Lvz7gKBKBBRQb8ir",
            "HSF7CpC5JwthGi6rDymX6hXUvVKDKDthKSb5gME15EWx",
            "DXiafDatzdsnWGURB5Lia4TrZe9uenqk3vkcmW4FZZNV",
            "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            "J3SPPMtgrLDpEu7mtJsi8YdHmVHw1tS6AFhzeFjWnuie",
            "5ciZskbqstAtmD8PhZkrTcdru4ZGWJCr3sgRSwvCy24y",
            "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
            "D4bN2bL8Q5sUG6eKM3Bwmtiyu9uiXsQ8y3ZKMXDEyhV6",
            "C7XtWMtkZWeBeQMgisTdwyxAxfYkyMopaDWi8TWB6w2E",
          ],
          data: "7Xj1TjwydUJBDW9kPywPryRUVJS3nhxztX2d",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
      ],
      recentBlockhash: "3GJbqJExw8znnvaegAF9srGKHEeBwZeLVqUGj8pDRA4g",
    },
    signatures: [
      "4NEiJi1tDDH3KNNcLc6EJbJz9QxTCzhpxXP1tEc8jASFBDKJQYH24XwGWfDEvjhNGWCT1tWn3yez7Ymo2eachobE",
      "3nE8ceyorRFXKR5DQX4FjPR33XV3dHFxAemyvuHc5KZHiv7Jyp9rU9933NpirbWFjhSrb3M3SkJZgHdReTvUyB1C",
      "4Stc84M6cKXz7dRsa7aCH9DcZWTz9w8U248hGRqkUpkL64Wjy3wD3eqXCoPzNo7koWAyawuoa584yt7qs4bNnPCK",
    ],
  },
};

export default BUY_EDITION_V2_TX_SOL;