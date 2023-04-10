// Example: https://explorer.solana.com/tx/4iBhu2KfrF6ubxUdbbwHcPih6BsaZTXWSiMavJ4crqv359pRKx7jGs1VDMJPF9zxyKSG9LPHtyQV1pJ9m9eW83tr?cluster=mainnet
// for https://zen0m.holaplex.com/listings/9ozJiMMDo8s5ugdUoCGtsHAJdLuAPMPjhqjWEnJYoKzA
const MINT_NEW_EDITION_FROM_MASTER_EDITION_VIA_VAULT_PROXY_TX = {
  blockTime: 1634595443,
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
                destination: "Hqi8GVyi6ecvQfEshMjKr5XYnsSHL6kBLVJYqGZFuuyf",
                lamports: 2039280,
                source: "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "Hqi8GVyi6ecvQfEshMjKr5XYnsSHL6kBLVJYqGZFuuyf",
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
                account: "Hqi8GVyi6ecvQfEshMjKr5XYnsSHL6kBLVJYqGZFuuyf",
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
                account: "Hqi8GVyi6ecvQfEshMjKr5XYnsSHL6kBLVJYqGZFuuyf",
                mint: "4LNuV9u6PEcfJhXZVNcNtyccMdrgQ2CqHGMFFMSm5ZjF",
                owner: "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
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
        index: 4,
        instructions: [
          {
            parsed: {
              info: {
                destination: "9qLd31TbSaFKxMAyvYgp5q3mDrMZhRAZVMRGyMr5PDJ6",
                lamports: 1635600,
                source: "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "9qLd31TbSaFKxMAyvYgp5q3mDrMZhRAZVMRGyMr5PDJ6",
                space: 107,
              },
              type: "allocate",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "9qLd31TbSaFKxMAyvYgp5q3mDrMZhRAZVMRGyMr5PDJ6",
                owner: "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98",
              },
              type: "assign",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: [
              "GfDvNRS125MmD5PSZpP9San1b5dsMzAubqb5jaufce8p",
              "AXoYcK8vZmdedY74Gbw5oj7orartY66jKoTHWxRZqw75",
              "Dcdaqr3QbyNHyEasUPv11u64gCAzEsvYs3rJEDx94mXz",
              "4LNuV9u6PEcfJhXZVNcNtyccMdrgQ2CqHGMFFMSm5ZjF",
              "A64hVRDB2dHxZbstzhsVqkX5etiB5m9cZFEm7KPvh6rD",
              "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
              "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
              "EDbTbqRGohaNrTgwrFoUdQMmrANgK2bXfZ4GGUz6nhqX",
              "6eHBhM8iev3tqkovm7YdW5M131HUE4V5NEpeEcWNvdBG",
              "Hua25qoG1w3EFMTHvuJGbMNiQzfpChv33WLjriMYoJ31",
              "FobH1tMHgbPY1ju8yMt7zrMhk8dZR88FNAyuakT3zKsf",
              "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
              "73vV1AKQUnZrzyvthRrECET4cRnNsufo7dsYbmmvxe9H",
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              "vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn",
              "11111111111111111111111111111111",
              "SysvarRent111111111111111111111111111111111",
            ],
            data: "AbpUGLEx1Edu",
            programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          },
          {
            parsed: {
              info: {
                destination: "A64hVRDB2dHxZbstzhsVqkX5etiB5m9cZFEm7KPvh6rD",
                lamports: 1113600,
                source: "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "A64hVRDB2dHxZbstzhsVqkX5etiB5m9cZFEm7KPvh6rD",
                space: 32,
              },
              type: "allocate",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "A64hVRDB2dHxZbstzhsVqkX5etiB5m9cZFEm7KPvh6rD",
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
                destination: "GfDvNRS125MmD5PSZpP9San1b5dsMzAubqb5jaufce8p",
                lamports: 5616720,
                source: "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "GfDvNRS125MmD5PSZpP9San1b5dsMzAubqb5jaufce8p",
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
                account: "GfDvNRS125MmD5PSZpP9San1b5dsMzAubqb5jaufce8p",
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
                destination: "AXoYcK8vZmdedY74Gbw5oj7orartY66jKoTHWxRZqw75",
                lamports: 2568240,
                source: "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "AXoYcK8vZmdedY74Gbw5oj7orartY66jKoTHWxRZqw75",
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
                account: "AXoYcK8vZmdedY74Gbw5oj7orartY66jKoTHWxRZqw75",
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
                mint: "4LNuV9u6PEcfJhXZVNcNtyccMdrgQ2CqHGMFFMSm5ZjF",
                multisigAuthority:
                  "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
                newAuthority: "AXoYcK8vZmdedY74Gbw5oj7orartY66jKoTHWxRZqw75",
                signers: ["BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW"],
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
                mint: "4LNuV9u6PEcfJhXZVNcNtyccMdrgQ2CqHGMFFMSm5ZjF",
                multisigAuthority:
                  "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
                newAuthority: "AXoYcK8vZmdedY74Gbw5oj7orartY66jKoTHWxRZqw75",
                signers: ["BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW"],
              },
              type: "setAuthority",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                destination: "CK1Eyp2vjPskcpvJW3TG7x9NU8NQCjGiXv8XV77xK3Ry",
                lamports: 1190160,
                source: "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "CK1Eyp2vjPskcpvJW3TG7x9NU8NQCjGiXv8XV77xK3Ry",
                space: 43,
              },
              type: "allocate",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "CK1Eyp2vjPskcpvJW3TG7x9NU8NQCjGiXv8XV77xK3Ry",
                owner: "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98",
              },
              type: "assign",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
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
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3449 of 174518 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 29580 of 200000 compute units",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: MintTo",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2879 of 200000 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98 invoke [1]",
      "Program log: Instruction: Redeem Printing V2 Bid",
      "Program log: Transfer 1635600 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Completed assignation!",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [2]",
      "Program log: Instruction: Mint New Edition from Master Edition Via Vault Proxy",
      "Program log: Transfer 1113600 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [3]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account",
      "Program 11111111111111111111111111111111 invoke [3]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [3]",
      "Program 11111111111111111111111111111111 success",
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
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2019 of 67710 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program log: Setting freeze authority",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: SetAuthority",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2021 of 63107 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program log: Finished setting freeze authority",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 81459 of 141196 compute units",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success",
      "Program log: Transfer 1190160 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Completed assignation!",
      "Program log: About to pass through the eye of the needle",
      "Program consumption: 48682 units remaining",
      "Program p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98 consumed 152897 of 200000 compute units",
      "Program p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98 success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [1]",
      "Program log: Instruction: Update primary sale via token",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 6910 of 200000 compute units",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success",
    ],
    postBalances: [
      12608409726, 1461600, 2039280, 3473040, 2039280, 1190160, 1572960,
      2317680, 1635600, 5616720, 2568240, 2853600, 1113600, 1, 1, 1089991680,
      1524240, 4217760, 1454640, 1141440, 1141440, 2491680, 5616720, 2415120,
      898174080, 1141440,
    ],
    postTokenBalances: [
      {
        accountIndex: 2,
        mint: "4LNuV9u6PEcfJhXZVNcNtyccMdrgQ2CqHGMFFMSm5ZjF",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
      {
        accountIndex: 4,
        mint: "HFmUTSKhsmbuwU2dRn68KVf5tRygNYyAHHVJCaqEsXpv",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
    ],
    preBalances: [
      12624044926, 0, 0, 3473040, 2039280, 0, 1572960, 2317680, 0, 0, 0,
      2853600, 0, 1, 1, 1089991680, 1524240, 4217760, 1454640, 1141440, 1141440,
      2491680, 5616720, 2415120, 898174080, 1141440,
    ],
    preTokenBalances: [
      {
        accountIndex: 4,
        mint: "HFmUTSKhsmbuwU2dRn68KVf5tRygNYyAHHVJCaqEsXpv",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
    ],
    rewards: [],
    status: {
      Ok: null,
    },
  },
  slot: 102257504,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
          signer: true,
          writable: true,
        },
        {
          pubkey: "4LNuV9u6PEcfJhXZVNcNtyccMdrgQ2CqHGMFFMSm5ZjF",
          signer: true,
          writable: true,
        },
        {
          pubkey: "Hqi8GVyi6ecvQfEshMjKr5XYnsSHL6kBLVJYqGZFuuyf",
          signer: false,
          writable: true,
        },
        {
          pubkey: "EDbTbqRGohaNrTgwrFoUdQMmrANgK2bXfZ4GGUz6nhqX",
          signer: false,
          writable: true,
        },
        {
          pubkey: "6eHBhM8iev3tqkovm7YdW5M131HUE4V5NEpeEcWNvdBG",
          signer: false,
          writable: true,
        },
        {
          pubkey: "CK1Eyp2vjPskcpvJW3TG7x9NU8NQCjGiXv8XV77xK3Ry",
          signer: false,
          writable: true,
        },
        {
          pubkey: "Hua25qoG1w3EFMTHvuJGbMNiQzfpChv33WLjriMYoJ31",
          signer: false,
          writable: true,
        },
        {
          pubkey: "FobH1tMHgbPY1ju8yMt7zrMhk8dZR88FNAyuakT3zKsf",
          signer: false,
          writable: true,
        },
        {
          pubkey: "9qLd31TbSaFKxMAyvYgp5q3mDrMZhRAZVMRGyMr5PDJ6",
          signer: false,
          writable: true,
        },
        {
          pubkey: "GfDvNRS125MmD5PSZpP9San1b5dsMzAubqb5jaufce8p",
          signer: false,
          writable: true,
        },
        {
          pubkey: "AXoYcK8vZmdedY74Gbw5oj7orartY66jKoTHWxRZqw75",
          signer: false,
          writable: true,
        },
        {
          pubkey: "Dcdaqr3QbyNHyEasUPv11u64gCAzEsvYs3rJEDx94mXz",
          signer: false,
          writable: true,
        },
        {
          pubkey: "A64hVRDB2dHxZbstzhsVqkX5etiB5m9cZFEm7KPvh6rD",
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
          pubkey: "BNxcCT9EzwXJr8BDUJ5aKqqsdK3d4rGin59MS1e2GcyJ",
          signer: false,
          writable: false,
        },
        {
          pubkey: "9ozJiMMDo8s5ugdUoCGtsHAJdLuAPMPjhqjWEnJYoKzA",
          signer: false,
          writable: false,
        },
        {
          pubkey: "4hZH8THNrM1EdeT1pGUodGbwjahGGpnSf8a6GDKrzyiA",
          signer: false,
          writable: false,
        },
        {
          pubkey: "vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn",
          signer: false,
          writable: false,
        },
        {
          pubkey: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          signer: false,
          writable: false,
        },
        {
          pubkey: "6q4YQj74JdgxtxcBuPxaQgNFAVoZzR75xx9h1REUFkgu",
          signer: false,
          writable: false,
        },
        {
          pubkey: "73vV1AKQUnZrzyvthRrECET4cRnNsufo7dsYbmmvxe9H",
          signer: false,
          writable: false,
        },
        {
          pubkey: "Dcp6iy1Ns8saTkZeteAURsy1XsRMvpZP9EUQuvPQSuu2",
          signer: false,
          writable: false,
        },
        {
          pubkey: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          signer: false,
          writable: false,
        },
        {
          pubkey: "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98",
          signer: false,
          writable: false,
        },
      ],
      instructions: [
        {
          parsed: {
            info: {
              lamports: 1461600,
              newAccount: "4LNuV9u6PEcfJhXZVNcNtyccMdrgQ2CqHGMFFMSm5ZjF",
              owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              source: "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
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
              freezeAuthority: "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
              mint: "4LNuV9u6PEcfJhXZVNcNtyccMdrgQ2CqHGMFFMSm5ZjF",
              mintAuthority: "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
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
              account: "Hqi8GVyi6ecvQfEshMjKr5XYnsSHL6kBLVJYqGZFuuyf",
              mint: "4LNuV9u6PEcfJhXZVNcNtyccMdrgQ2CqHGMFFMSm5ZjF",
              rentSysvar: "SysvarRent111111111111111111111111111111111",
              source: "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
              systemProgram: "11111111111111111111111111111111",
              tokenProgram: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              wallet: "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
            },
            type: "create",
          },
          program: "spl-associated-token-account",
          programId: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
        },
        {
          parsed: {
            info: {
              account: "Hqi8GVyi6ecvQfEshMjKr5XYnsSHL6kBLVJYqGZFuuyf",
              amount: "1",
              mint: "4LNuV9u6PEcfJhXZVNcNtyccMdrgQ2CqHGMFFMSm5ZjF",
              mintAuthority: "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
            },
            type: "mintTo",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          accounts: [
            "EDbTbqRGohaNrTgwrFoUdQMmrANgK2bXfZ4GGUz6nhqX",
            "6eHBhM8iev3tqkovm7YdW5M131HUE4V5NEpeEcWNvdBG",
            "Hqi8GVyi6ecvQfEshMjKr5XYnsSHL6kBLVJYqGZFuuyf",
            "CK1Eyp2vjPskcpvJW3TG7x9NU8NQCjGiXv8XV77xK3Ry",
            "Hua25qoG1w3EFMTHvuJGbMNiQzfpChv33WLjriMYoJ31",
            "FobH1tMHgbPY1ju8yMt7zrMhk8dZR88FNAyuakT3zKsf",
            "BNxcCT9EzwXJr8BDUJ5aKqqsdK3d4rGin59MS1e2GcyJ",
            "9ozJiMMDo8s5ugdUoCGtsHAJdLuAPMPjhqjWEnJYoKzA",
            "4hZH8THNrM1EdeT1pGUodGbwjahGGpnSf8a6GDKrzyiA",
            "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
            "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn",
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
            "6q4YQj74JdgxtxcBuPxaQgNFAVoZzR75xx9h1REUFkgu",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
            "9qLd31TbSaFKxMAyvYgp5q3mDrMZhRAZVMRGyMr5PDJ6",
            "GfDvNRS125MmD5PSZpP9San1b5dsMzAubqb5jaufce8p",
            "AXoYcK8vZmdedY74Gbw5oj7orartY66jKoTHWxRZqw75",
            "Dcdaqr3QbyNHyEasUPv11u64gCAzEsvYs3rJEDx94mXz",
            "4LNuV9u6PEcfJhXZVNcNtyccMdrgQ2CqHGMFFMSm5ZjF",
            "A64hVRDB2dHxZbstzhsVqkX5etiB5m9cZFEm7KPvh6rD",
            "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
            "73vV1AKQUnZrzyvthRrECET4cRnNsufo7dsYbmmvxe9H",
            "Dcp6iy1Ns8saTkZeteAURsy1XsRMvpZP9EUQuvPQSuu2",
          ],
          data: "8dh5oiec7PaAzMM9EKfBtiT",
          programId: "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98",
        },
        {
          accounts: [
            "GfDvNRS125MmD5PSZpP9San1b5dsMzAubqb5jaufce8p",
            "BUT9zHC8NUvx88W6QHhJ5TYLa1L7VwXQ1JtNXCheizHW",
            "Hqi8GVyi6ecvQfEshMjKr5XYnsSHL6kBLVJYqGZFuuyf",
          ],
          data: "5",
          programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
        },
      ],
      recentBlockhash: "CrLmbz65XZVAVTjiAdxDmo36RaW5JmYuPCAGiLVYCCpR",
    },
    signatures: [
      "4iBhu2KfrF6ubxUdbbwHcPih6BsaZTXWSiMavJ4crqv359pRKx7jGs1VDMJPF9zxyKSG9LPHtyQV1pJ9m9eW83tr",
      "3e5wsZDzanEdbwPpj7UxfuapRApuGTKV4hFopaFkt93jUWQxBaZkhUxH2pchh3NnHs49oD5hjVRGYkfsSt6JZvKE",
    ],
  },
};

export default MINT_NEW_EDITION_FROM_MASTER_EDITION_VIA_VAULT_PROXY_TX;
