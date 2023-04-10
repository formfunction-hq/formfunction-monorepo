// https://explorer.solana.com/tx/BpqFoo3rNFQiv1TamNzJRHUW24wYZdo7jqruhTWeJKqxRLAke4R19Fc8PRerBdSHamiaHfA5T3LTXocRQyjnzoi?cluster=devnet
// https://dev.formfunction.xyz/@soursop/AB4Ez6SKNy6n8uPAjGFtLhRvsaidwbPiCsr2kFAkC5kC?width=100&height=101
const CREATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_USDC = {
  blockTime: 1662576603,
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
                newAccount: "2AMWuF9y2m6vbAwZ2BFo5fk1Sx458vPraoYWnqdWW8W4",
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
                mint: "AB4Ez6SKNy6n8uPAjGFtLhRvsaidwbPiCsr2kFAkC5kC",
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
                newAccount: "BbZtqiLgEg7jSUefxE83ZXVMvXndLy5VMxe5ASkVcuXX",
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
              info: { account: "BbZtqiLgEg7jSUefxE83ZXVMvXndLy5VMxe5ASkVcuXX" },
              type: "initializeImmutableOwner",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                account: "BbZtqiLgEg7jSUefxE83ZXVMvXndLy5VMxe5ASkVcuXX",
                mint: "AB4Ez6SKNy6n8uPAjGFtLhRvsaidwbPiCsr2kFAkC5kC",
                owner: "2AMWuF9y2m6vbAwZ2BFo5fk1Sx458vPraoYWnqdWW8W4",
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
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX consumed 19020 of 600000 compute units",
      "Program devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]",
      "Program log: Create",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: GetAccountDataSize",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1622 of 575389 compute units",
      "Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Initialize the associated token account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeImmutableOwner",
      "Program log: Please upgrade to SPL Token 2022 for immutable owner support",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 568899 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeAccount3",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4241 of 565016 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 20543 of 580980 compute units",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: Transfer",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4644 of 560437 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
    ],
    postBalances: [
      27156729960, 3695760, 2039280, 2039280, 1, 1461600, 731913600, 1141440,
      2853600, 27003456600, 1169280, 1009200, 934087680,
    ],
    postTokenBalances: [
      {
        accountIndex: 2,
        mint: "AB4Ez6SKNy6n8uPAjGFtLhRvsaidwbPiCsr2kFAkC5kC",
        owner: "2AMWuF9y2m6vbAwZ2BFo5fk1Sx458vPraoYWnqdWW8W4",
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
        mint: "AB4Ez6SKNy6n8uPAjGFtLhRvsaidwbPiCsr2kFAkC5kC",
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
      27162470000, 0, 0, 2039280, 1, 1461600, 731913600, 1141440, 2853600,
      27003456600, 1169280, 1009200, 934087680,
    ],
    preTokenBalances: [
      {
        accountIndex: 3,
        mint: "AB4Ez6SKNy6n8uPAjGFtLhRvsaidwbPiCsr2kFAkC5kC",
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
  slot: 160498474,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
          signer: true,
          writable: true,
        },
        {
          pubkey: "2AMWuF9y2m6vbAwZ2BFo5fk1Sx458vPraoYWnqdWW8W4",
          signer: false,
          writable: true,
        },
        {
          pubkey: "BbZtqiLgEg7jSUefxE83ZXVMvXndLy5VMxe5ASkVcuXX",
          signer: false,
          writable: true,
        },
        {
          pubkey: "GaP5x7d87Lys77zcJszZcWcCVdmc7UuavAnx9AGEgCps",
          signer: false,
          writable: true,
        },
        {
          pubkey: "11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "AB4Ez6SKNy6n8uPAjGFtLhRvsaidwbPiCsr2kFAkC5kC",
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
          pubkey: "EgAoRVN7rW6PigSPrxGDzmhbENQ9aC3GVdYh1gSwmwRL",
          signer: false,
          writable: false,
        },
        {
          pubkey: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
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
            "AB4Ez6SKNy6n8uPAjGFtLhRvsaidwbPiCsr2kFAkC5kC",
            "GaP5x7d87Lys77zcJszZcWcCVdmc7UuavAnx9AGEgCps",
            "EgAoRVN7rW6PigSPrxGDzmhbENQ9aC3GVdYh1gSwmwRL",
            "2AMWuF9y2m6vbAwZ2BFo5fk1Sx458vPraoYWnqdWW8W4",
            "11111111111111111111111111111111",
            "SysvarC1ock11111111111111111111111111111111",
            "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
          ],
          data: "PB5JNmid7KBMtaJR96o1KTv7MtWAdw3ao",
          programId: "devmBQyHHBPiLcuCqbWWRYxCG33ntAfPD5nXZeLd4eX",
        },
        {
          parsed: {
            info: {
              account: "BbZtqiLgEg7jSUefxE83ZXVMvXndLy5VMxe5ASkVcuXX",
              mint: "AB4Ez6SKNy6n8uPAjGFtLhRvsaidwbPiCsr2kFAkC5kC",
              rentSysvar: "SysvarRent111111111111111111111111111111111",
              source: "H2Kj8NvbNiEi7ccSXGJ85PRCbyNLp3gcNrxZe7EtkacN",
              systemProgram: "11111111111111111111111111111111",
              tokenProgram: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              wallet: "2AMWuF9y2m6vbAwZ2BFo5fk1Sx458vPraoYWnqdWW8W4",
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
              destination: "BbZtqiLgEg7jSUefxE83ZXVMvXndLy5VMxe5ASkVcuXX",
              source: "GaP5x7d87Lys77zcJszZcWcCVdmc7UuavAnx9AGEgCps",
            },
            type: "transfer",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
      ],
      recentBlockhash: "CXJZMBWCWDmQ9haEKJcT5Tk83yi2qDczyje6AjBvVwM3",
    },
    signatures: [
      "BpqFoo3rNFQiv1TamNzJRHUW24wYZdo7jqruhTWeJKqxRLAke4R19Fc8PRerBdSHamiaHfA5T3LTXocRQyjnzoi",
    ],
  },
};

export default CREATE_EDITION_DISTRIBUTOR_WITH_TREASURY_MINT_TX_USDC;
