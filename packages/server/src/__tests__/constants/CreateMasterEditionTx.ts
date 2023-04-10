// https://explorer.solana.com/tx/38J7TG7wWrQ2X2gthRWzbdTAX57CU8jpx1QbefHp3P6JLTQ5HCT2adPRePKvuhMS5eCXyACg1UMwMrz7iDDKtWq3
const CREATE_MASTER_EDITION_TX = {
  blockTime: 1640055771,
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
                destination: "793hcZHnAh4UT2KRNMjyK38z5d9qvHDnzyngNsRKuwhe",
                lamports: 2039280,
                source: "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "793hcZHnAh4UT2KRNMjyK38z5d9qvHDnzyngNsRKuwhe",
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
                account: "793hcZHnAh4UT2KRNMjyK38z5d9qvHDnzyngNsRKuwhe",
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
                account: "793hcZHnAh4UT2KRNMjyK38z5d9qvHDnzyngNsRKuwhe",
                mint: "9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN",
                owner: "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
                rentSysvar: "SysvarRent111111111111111111111111111111111",
              },
              type: "initializeAccount",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
        ],
      },
      {
        index: 3,
        instructions: [
          {
            parsed: {
              info: {
                destination: "GJemTjvAJNqbT54NVzCJc7DNvp1RuLUUqCNmSuaNajzF",
                lamports: 5616720,
                source: "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "GJemTjvAJNqbT54NVzCJc7DNvp1RuLUUqCNmSuaNajzF",
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
                account: "GJemTjvAJNqbT54NVzCJc7DNvp1RuLUUqCNmSuaNajzF",
                owner: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
              },
              type: "assign",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
        ],
      },
      {
        index: 5,
        instructions: [
          {
            parsed: {
              info: {
                destination: "GbaDq48qQTu5bdovintuVPhwrMT3TwjXAg2CpUVDqwYU",
                lamports: 2853600,
                source: "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "GbaDq48qQTu5bdovintuVPhwrMT3TwjXAg2CpUVDqwYU",
                space: 282,
              },
              type: "allocate",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "GbaDq48qQTu5bdovintuVPhwrMT3TwjXAg2CpUVDqwYU",
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
                mint: "9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN",
                multisigAuthority:
                  "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
                newAuthority: "GbaDq48qQTu5bdovintuVPhwrMT3TwjXAg2CpUVDqwYU",
                signers: ["mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ"],
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
                mint: "9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN",
                multisigAuthority:
                  "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
                newAuthority: "GbaDq48qQTu5bdovintuVPhwrMT3TwjXAg2CpUVDqwYU",
                signers: ["mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ"],
              },
              type: "setAuthority",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
        ],
      },
    ],
    logMessages: [
      "Program 11111111111111111111111111111111 invoke [1]",
      "Program 11111111111111111111111111111111 success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: InitializeMint",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2390 of 200000 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]",
      "Program log: Transfer 2039280 lamports to the associated token account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the associated token account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the associated token account to the SPL Token program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Initialize the associated token account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3449 of 177047 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 27051 of 200000 compute units",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [1]",
      "Program log: Instruction: Create Metadata Accounts",
      "Program log: Transfer 5616720 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 28658 of 200000 compute units",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: MintTo",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2879 of 200000 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [1]",
      "Program log: Instruction: Create Master Edition",
      "Program log: Transfer 2853600 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Setting mint authority",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: SetAuthority",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2019 of 177352 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program log: Setting freeze authority",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: SetAuthority",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2021 of 172746 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program log: Finished setting freeze authority",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 30139 of 200000 compute units",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success",
    ],
    postBalances: [
      486235720, 1461600, 2039280, 5616720, 2853600, 1009200, 1, 1089991680,
      898174080, 1141440,
    ],
    postTokenBalances: [
      {
        accountIndex: 2,
        mint: "9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN",
        owner: "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
    ],
    preBalances: [
      498216920, 0, 0, 0, 0, 1009200, 1, 1089991680, 898174080, 1141440,
    ],
    preTokenBalances: [],
    rewards: [],
    status: {
      Ok: null,
    },
  },
  slot: 112527664,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
          signer: true,
          writable: true,
        },
        {
          pubkey: "9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN",
          signer: true,
          writable: true,
        },
        {
          pubkey: "793hcZHnAh4UT2KRNMjyK38z5d9qvHDnzyngNsRKuwhe",
          signer: false,
          writable: true,
        },
        {
          pubkey: "GJemTjvAJNqbT54NVzCJc7DNvp1RuLUUqCNmSuaNajzF",
          signer: false,
          writable: true,
        },
        {
          pubkey: "GbaDq48qQTu5bdovintuVPhwrMT3TwjXAg2CpUVDqwYU",
          signer: false,
          writable: true,
        },
        {
          pubkey: "SysvarRent111111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          signer: false,
          writable: false,
        },
        {
          pubkey: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          signer: false,
          writable: false,
        },
        {
          pubkey: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          signer: false,
          writable: false,
        },
      ],
      instructions: [
        {
          parsed: {
            info: {
              lamports: 1461600,
              newAccount: "9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN",
              owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              source: "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
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
              freezeAuthority: "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
              mint: "9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN",
              mintAuthority: "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
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
              account: "793hcZHnAh4UT2KRNMjyK38z5d9qvHDnzyngNsRKuwhe",
              mint: "9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN",
              rentSysvar: "SysvarRent111111111111111111111111111111111",
              source: "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
              systemProgram: "11111111111111111111111111111111",
              tokenProgram: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              wallet: "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
            },
            type: "create",
          },
          program: "spl-associated-token-account",
          programId: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
        },
        {
          accounts: [
            "GJemTjvAJNqbT54NVzCJc7DNvp1RuLUUqCNmSuaNajzF",
            "9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN",
            "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
            "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
            "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
          ],
          data: "1FGiWfK17DtKgaoePQxGz8a5kkDDeDLxxtnfMun81yW63XJVVvYuYddpjviBd85Qj3EnBNoxKbjDujkv3tZaA5LJ2LoHSkuWdnLmdosoD2W2ePcpNaG321zuw6q4meuf1NjFNEmXg41x4ULhWFaV49zKyGpYKg3GhV95hp4zWRKAzUr4kQYjpxdG7t3TW8o6Kqcwpbiw5Wn83nPiEYvDAic",
          programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
        },
        {
          parsed: {
            info: {
              account: "793hcZHnAh4UT2KRNMjyK38z5d9qvHDnzyngNsRKuwhe",
              amount: "1",
              mint: "9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN",
              mintAuthority: "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
            },
            type: "mintTo",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          accounts: [
            "GbaDq48qQTu5bdovintuVPhwrMT3TwjXAg2CpUVDqwYU",
            "9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN",
            "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
            "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
            "mnstNCFpJGaFbLaLSVLNfiJxfL9nW8m1Rgt42uCpRrQ",
            "GJemTjvAJNqbT54NVzCJc7DNvp1RuLUUqCNmSuaNajzF",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
          ],
          data: "ZbhTAEdAL88tF",
          programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
        },
      ],
      recentBlockhash: "4XVn2Y8zhAkvxTsXEE1PieeprC5LMzZ85Zo9yct19bt3",
    },
    signatures: [
      "38J7TG7wWrQ2X2gthRWzbdTAX57CU8jpx1QbefHp3P6JLTQ5HCT2adPRePKvuhMS5eCXyACg1UMwMrz7iDDKtWq3",
      "3hzpHNUWRuiXvjdFqHeiUHBX6gdiWbi2n5Su824x8z1tk1phgLtKtRgbErfuHGsbdPkNqUe6k6m29QpttE4uCfPR",
    ],
  },
};

export default CREATE_MASTER_EDITION_TX;
