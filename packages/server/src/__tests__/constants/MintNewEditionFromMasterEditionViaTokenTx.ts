const MINT_NEW_EDITION_FROM_MASTER_EDITION_VIA_TOKEN_TX = {
  blockTime: 1635556610,
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
                destination: "6sjdgcCd4AUzaDhGrm4A8BCrYbXGbYP5owrzPeX3Syzj",
                lamports: 2039280,
                source: "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "6sjdgcCd4AUzaDhGrm4A8BCrYbXGbYP5owrzPeX3Syzj",
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
                account: "6sjdgcCd4AUzaDhGrm4A8BCrYbXGbYP5owrzPeX3Syzj",
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
                account: "6sjdgcCd4AUzaDhGrm4A8BCrYbXGbYP5owrzPeX3Syzj",
                mint: "CrdzMXhR2zZEiEC4W8LvYdkwCWSShz1SRhr1GabzpQvs",
                owner: "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
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
                destination: "BS8GT4ZK8wYAUNDJRjH9vJDyNJPNUSHNh9FcXJxpLkZe",
                lamports: 1113600,
                source: "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "BS8GT4ZK8wYAUNDJRjH9vJDyNJPNUSHNh9FcXJxpLkZe",
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
                account: "BS8GT4ZK8wYAUNDJRjH9vJDyNJPNUSHNh9FcXJxpLkZe",
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
                destination: "7hQKZeBG5M4fVGQRo1C7NvR3BJ1v8Gk6LKicipVQGnzH",
                lamports: 5616720,
                source: "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "7hQKZeBG5M4fVGQRo1C7NvR3BJ1v8Gk6LKicipVQGnzH",
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
                account: "7hQKZeBG5M4fVGQRo1C7NvR3BJ1v8Gk6LKicipVQGnzH",
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
                destination: "4wjvWzvCZqzqnhFtTHBPnkBcddef7quvg2yyBi8aYnR4",
                lamports: 2568240,
                source: "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "4wjvWzvCZqzqnhFtTHBPnkBcddef7quvg2yyBi8aYnR4",
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
                account: "4wjvWzvCZqzqnhFtTHBPnkBcddef7quvg2yyBi8aYnR4",
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
                mint: "CrdzMXhR2zZEiEC4W8LvYdkwCWSShz1SRhr1GabzpQvs",
                multisigAuthority:
                  "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
                newAuthority: "4wjvWzvCZqzqnhFtTHBPnkBcddef7quvg2yyBi8aYnR4",
                signers: ["9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi"],
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
                mint: "CrdzMXhR2zZEiEC4W8LvYdkwCWSShz1SRhr1GabzpQvs",
                multisigAuthority:
                  "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
                newAuthority: "4wjvWzvCZqzqnhFtTHBPnkBcddef7quvg2yyBi8aYnR4",
                signers: ["9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi"],
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
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3449 of 174518 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 29580 of 200000 compute units",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: MintTo",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2879 of 200000 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [1]",
      "Program log: Instruction: Mint New Edition from Master Edition Via Token",
      "Program log: Transfer 1113600 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Transfer 5616720 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Transfer 2568240 lamports to the new account",
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
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2019 of 140338 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program log: Setting freeze authority",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: SetAuthority",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2021 of 135732 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program log: Finished setting freeze authority",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 67399 of 200000 compute units",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success",
    ],
    postBalances: [
      4678158086, 1461600, 2039280, 5616720, 2568240, 2853600, 1113600, 1, 1,
      1089991680, 2039280, 5616720, 898174080, 1141440,
    ],
    postTokenBalances: [
      {
        accountIndex: 2,
        mint: "CrdzMXhR2zZEiEC4W8LvYdkwCWSShz1SRhr1GabzpQvs",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
      {
        accountIndex: 10,
        mint: "9dCMtb7hL8vRvKp74FV4svEvCXNMhpVzqn31aG2a4zRP",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
    ],
    preBalances: [
      4690967526, 0, 0, 0, 0, 2853600, 0, 1, 1, 1089991680, 2039280, 5616720,
      898174080, 1141440,
    ],
    preTokenBalances: [
      {
        accountIndex: 10,
        mint: "9dCMtb7hL8vRvKp74FV4svEvCXNMhpVzqn31aG2a4zRP",
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
  slot: 104219689,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
          signer: true,
          writable: true,
        },
        {
          pubkey: "CrdzMXhR2zZEiEC4W8LvYdkwCWSShz1SRhr1GabzpQvs",
          signer: true,
          writable: true,
        },
        {
          pubkey: "6sjdgcCd4AUzaDhGrm4A8BCrYbXGbYP5owrzPeX3Syzj",
          signer: false,
          writable: true,
        },
        {
          pubkey: "7hQKZeBG5M4fVGQRo1C7NvR3BJ1v8Gk6LKicipVQGnzH",
          signer: false,
          writable: true,
        },
        {
          pubkey: "4wjvWzvCZqzqnhFtTHBPnkBcddef7quvg2yyBi8aYnR4",
          signer: false,
          writable: true,
        },
        {
          pubkey: "wsweFzi3JKTN14jk7HYM4QfXRDsvhWnGYhm1UKKgB9e",
          signer: false,
          writable: true,
        },
        {
          pubkey: "BS8GT4ZK8wYAUNDJRjH9vJDyNJPNUSHNh9FcXJxpLkZe",
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
          pubkey: "FC6KEkWFnPHSYXjqQJ8rmf5e2gDhANotcepVgkgLZW3w",
          signer: false,
          writable: false,
        },
        {
          pubkey: "FuwN7gt971a4RwYiS8XQ77ASwzLZnKmaWbx4tPEGgVvT",
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
              newAccount: "CrdzMXhR2zZEiEC4W8LvYdkwCWSShz1SRhr1GabzpQvs",
              owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              source: "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
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
              freezeAuthority: "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
              mint: "CrdzMXhR2zZEiEC4W8LvYdkwCWSShz1SRhr1GabzpQvs",
              mintAuthority: "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
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
              account: "6sjdgcCd4AUzaDhGrm4A8BCrYbXGbYP5owrzPeX3Syzj",
              mint: "CrdzMXhR2zZEiEC4W8LvYdkwCWSShz1SRhr1GabzpQvs",
              rentSysvar: "SysvarRent111111111111111111111111111111111",
              source: "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
              systemProgram: "11111111111111111111111111111111",
              tokenProgram: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              wallet: "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
            },
            type: "create",
          },
          program: "spl-associated-token-account",
          programId: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
        },
        {
          parsed: {
            info: {
              account: "6sjdgcCd4AUzaDhGrm4A8BCrYbXGbYP5owrzPeX3Syzj",
              amount: "1",
              mint: "CrdzMXhR2zZEiEC4W8LvYdkwCWSShz1SRhr1GabzpQvs",
              mintAuthority: "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
            },
            type: "mintTo",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          accounts: [
            "7hQKZeBG5M4fVGQRo1C7NvR3BJ1v8Gk6LKicipVQGnzH",
            "4wjvWzvCZqzqnhFtTHBPnkBcddef7quvg2yyBi8aYnR4",
            "wsweFzi3JKTN14jk7HYM4QfXRDsvhWnGYhm1UKKgB9e",
            "CrdzMXhR2zZEiEC4W8LvYdkwCWSShz1SRhr1GabzpQvs",
            "BS8GT4ZK8wYAUNDJRjH9vJDyNJPNUSHNh9FcXJxpLkZe",
            "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
            "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
            "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
            "FC6KEkWFnPHSYXjqQJ8rmf5e2gDhANotcepVgkgLZW3w",
            "9K4XUuN1rm5ErTzCH5kUg6L3KjC6SvMKMmtspar5HQGi",
            "FuwN7gt971a4RwYiS8XQ77ASwzLZnKmaWbx4tPEGgVvT",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
          ],
          data: "98BRsCwhTuf5",
          programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
        },
      ],
      recentBlockhash: "BmCEq8wpK7mnnqPafJdDpdXyqzRfNL83iZzeadzp2J6j",
    },
    signatures: [
      "4QwehJ85PAdWLSMbrQBesKjnR5XYNcQegACGQU4otJQMpDNCoCFJSP9C34sASoDUTempM4F34zbqodywVJUkP7uh",
      "3eZTw6K8fpsMf3Y7UiuGf52mdenyfk6WAHfk9yMnPw1JuCtDBBFbcVF75gs2QpDccrxyfkMky9iyGt63Afn8sfZL",
    ],
  },
};

export default MINT_NEW_EDITION_FROM_MASTER_EDITION_VIA_TOKEN_TX;
