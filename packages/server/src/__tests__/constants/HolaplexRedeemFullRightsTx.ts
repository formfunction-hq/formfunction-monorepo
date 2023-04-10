const HOLAPLEX_REDEEM_FULL_RIGHTS_TX = {
  blockTime: 1644167516,
  meta: {
    err: null,
    fee: 10000,
    innerInstructions: [
      {
        index: 2,
        instructions: [
          {
            accounts: [
              "5cdG3Pa4sD5RYnN5ehpPUQ2c3hSQJXcpwf4LFqPfQ6DL",
              "HRJqJ1UfPh3qBDqrUjFsCBUxv3wzL6B168cyEqT1tPfq",
            ],
            data: "SYaKS3Z19U2hGiDABshDduN2Ngqb7NLBNdAR25vCc6vApcKy",
            programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          },
          {
            accounts: [
              "E4r1XJkqekHaRqpADpS6Kyt2tuZmHj5URnr2YLkad4z",
              "DKHPYcvwvXeX3N7XKD7bfQ6S9fEQgLDkpfjNdrqVAozv",
              "CRUqNRFNqZTiUvX6i8SHdwkZE4GKTPgsMh3emathVa25",
              "H6KdyXHKxe27w7XbPgFeMQnFVKTZrekVXP4ugUdj7jka",
              "6VZME7WA8d3zFjYJyPB85mVDvwxPHYrch8kGT8FY9Lbr",
              "HRJqJ1UfPh3qBDqrUjFsCBUxv3wzL6B168cyEqT1tPfq",
              "EUGJ5k3uviHTj1SCEXAhB8WqQmYHjfr1bBi2e5v6VKKz",
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              "SysvarRent111111111111111111111111111111111",
            ],
            data: "4hGJfq3wqvib",
            programId: "vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn",
          },
          {
            parsed: {
              info: {
                amount: "1",
                authority: "EUGJ5k3uviHTj1SCEXAhB8WqQmYHjfr1bBi2e5v6VKKz",
                destination: "E4r1XJkqekHaRqpADpS6Kyt2tuZmHj5URnr2YLkad4z",
                source: "CRUqNRFNqZTiUvX6i8SHdwkZE4GKTPgsMh3emathVa25",
              },
              type: "transfer",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                destination: "31Fn2kcCJGox7ccokHZ64CrmkPrUhgpbqcpJwpFtFKti",
                lamports: 1190160,
                source: "G14pZL3RUstQGFNyuyUq7S98f5mGgHDJ8Qoh5F8njVnY",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "31Fn2kcCJGox7ccokHZ64CrmkPrUhgpbqcpJwpFtFKti",
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
                account: "31Fn2kcCJGox7ccokHZ64CrmkPrUhgpbqcpJwpFtFKti",
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
      "Program log: Instruction: InitializeAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3294 of 200000 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98 invoke [1]",
      "Program log: Instruction: Redeem Full Rights Transfer Bid",
      "Program log: Transferring metadata authority!",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [2]",
      "Program log: (Deprecated as of 1.1.0) Instruction: Update Metadata Accounts",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 6641 of 166443 compute units",
      "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success",
      "Program vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn invoke [2]",
      "Program log: Instruction: Withdraw Token from Safety Deposit Box",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: Transfer",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2643 of 142062 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn consumed 16393 of 154049 compute units",
      "Program vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn success",
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
      "Program consumption: 126775 units remaining",
      "Program p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98 consumed 74568 of 200000 compute units",
      "Program p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98 success",
    ],
    postBalances: [
      309203959937, 2039280, 3473040, 2039280, 1190160, 1572960, 2317680,
      1461600, 5616720, 1461600, 1009200, 4217760, 1454640, 953185920, 1141440,
      1141440, 2491680, 1, 0, 1524240, 2415120, 1141440,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
        mint: "2igx2ajor8YL24u5GUPcs6tryDVuajcug4bhZMW8fhhA",
        owner: "G14pZL3RUstQGFNyuyUq7S98f5mGgHDJ8Qoh5F8njVnY",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
      {
        accountIndex: 3,
        mint: "2igx2ajor8YL24u5GUPcs6tryDVuajcug4bhZMW8fhhA",
        owner: "EUGJ5k3uviHTj1SCEXAhB8WqQmYHjfr1bBi2e5v6VKKz",
        uiTokenAmount: {
          amount: "0",
          decimals: 0,
          uiAmount: null,
          uiAmountString: "0",
        },
      },
    ],
    preBalances: [
      309207199377, 0, 3473040, 2039280, 0, 1572960, 2317680, 1461600, 5616720,
      1461600, 1009200, 4217760, 1454640, 953185920, 1141440, 1141440, 2491680,
      1, 0, 1524240, 2415120, 1141440,
    ],
    preTokenBalances: [
      {
        accountIndex: 3,
        mint: "2igx2ajor8YL24u5GUPcs6tryDVuajcug4bhZMW8fhhA",
        owner: "EUGJ5k3uviHTj1SCEXAhB8WqQmYHjfr1bBi2e5v6VKKz",
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
  slot: 119635381,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "G14pZL3RUstQGFNyuyUq7S98f5mGgHDJ8Qoh5F8njVnY",
          signer: true,
          writable: true,
        },
        {
          pubkey: "E4r1XJkqekHaRqpADpS6Kyt2tuZmHj5URnr2YLkad4z",
          signer: true,
          writable: true,
        },
        {
          pubkey: "HRJqJ1UfPh3qBDqrUjFsCBUxv3wzL6B168cyEqT1tPfq",
          signer: false,
          writable: true,
        },
        {
          pubkey: "CRUqNRFNqZTiUvX6i8SHdwkZE4GKTPgsMh3emathVa25",
          signer: false,
          writable: true,
        },
        {
          pubkey: "31Fn2kcCJGox7ccokHZ64CrmkPrUhgpbqcpJwpFtFKti",
          signer: false,
          writable: true,
        },
        {
          pubkey: "DKHPYcvwvXeX3N7XKD7bfQ6S9fEQgLDkpfjNdrqVAozv",
          signer: false,
          writable: true,
        },
        {
          pubkey: "H6KdyXHKxe27w7XbPgFeMQnFVKTZrekVXP4ugUdj7jka",
          signer: false,
          writable: true,
        },
        {
          pubkey: "6VZME7WA8d3zFjYJyPB85mVDvwxPHYrch8kGT8FY9Lbr",
          signer: false,
          writable: true,
        },
        {
          pubkey: "5cdG3Pa4sD5RYnN5ehpPUQ2c3hSQJXcpwf4LFqPfQ6DL",
          signer: false,
          writable: true,
        },
        {
          pubkey: "2igx2ajor8YL24u5GUPcs6tryDVuajcug4bhZMW8fhhA",
          signer: false,
          writable: false,
        },
        {
          pubkey: "SysvarRent111111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "DjmGk72JRBJMFx6c6yyp4VR1oYKppQqa5rZRkdSRiwpB",
          signer: false,
          writable: false,
        },
        {
          pubkey: "8Vwu3dHjxa1jiUfi6ST1MEEgLSx3g7LVwq4jqV1ipHVt",
          signer: false,
          writable: false,
        },
        {
          pubkey: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
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
          pubkey: "DNVenKdYC7uR1viRc2LbvcxXmXbtNwyW2TmrMpVbtHD3",
          signer: false,
          writable: false,
        },
        {
          pubkey: "11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "EUGJ5k3uviHTj1SCEXAhB8WqQmYHjfr1bBi2e5v6VKKz",
          signer: false,
          writable: false,
        },
        {
          pubkey: "95FZheeizzu5A5CBLpKNE4AE35fsTdzpJoJ8YhDBs5CY",
          signer: false,
          writable: false,
        },
        {
          pubkey: "E4Mv1S8rUDLuDNP77ojUiiMC7juiFmCKdsxBGLEYffqk",
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
              lamports: 2039280,
              newAccount: "E4r1XJkqekHaRqpADpS6Kyt2tuZmHj5URnr2YLkad4z",
              owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              source: "G14pZL3RUstQGFNyuyUq7S98f5mGgHDJ8Qoh5F8njVnY",
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
              account: "E4r1XJkqekHaRqpADpS6Kyt2tuZmHj5URnr2YLkad4z",
              mint: "2igx2ajor8YL24u5GUPcs6tryDVuajcug4bhZMW8fhhA",
              owner: "G14pZL3RUstQGFNyuyUq7S98f5mGgHDJ8Qoh5F8njVnY",
              rentSysvar: "SysvarRent111111111111111111111111111111111",
            },
            type: "initializeAccount",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          accounts: [
            "HRJqJ1UfPh3qBDqrUjFsCBUxv3wzL6B168cyEqT1tPfq",
            "CRUqNRFNqZTiUvX6i8SHdwkZE4GKTPgsMh3emathVa25",
            "E4r1XJkqekHaRqpADpS6Kyt2tuZmHj5URnr2YLkad4z",
            "31Fn2kcCJGox7ccokHZ64CrmkPrUhgpbqcpJwpFtFKti",
            "DKHPYcvwvXeX3N7XKD7bfQ6S9fEQgLDkpfjNdrqVAozv",
            "H6KdyXHKxe27w7XbPgFeMQnFVKTZrekVXP4ugUdj7jka",
            "6VZME7WA8d3zFjYJyPB85mVDvwxPHYrch8kGT8FY9Lbr",
            "DjmGk72JRBJMFx6c6yyp4VR1oYKppQqa5rZRkdSRiwpB",
            "8Vwu3dHjxa1jiUfi6ST1MEEgLSx3g7LVwq4jqV1ipHVt",
            "G14pZL3RUstQGFNyuyUq7S98f5mGgHDJ8Qoh5F8njVnY",
            "G14pZL3RUstQGFNyuyUq7S98f5mGgHDJ8Qoh5F8njVnY",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn",
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
            "DNVenKdYC7uR1viRc2LbvcxXmXbtNwyW2TmrMpVbtHD3",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
            "5cdG3Pa4sD5RYnN5ehpPUQ2c3hSQJXcpwf4LFqPfQ6DL",
            "G14pZL3RUstQGFNyuyUq7S98f5mGgHDJ8Qoh5F8njVnY",
            "EUGJ5k3uviHTj1SCEXAhB8WqQmYHjfr1bBi2e5v6VKKz",
            "95FZheeizzu5A5CBLpKNE4AE35fsTdzpJoJ8YhDBs5CY",
            "E4Mv1S8rUDLuDNP77ojUiiMC7juiFmCKdsxBGLEYffqk",
          ],
          data: "4",
          programId: "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98",
        },
      ],
      recentBlockhash: "GdJwveWKmeJSeuDEXCqspV8tiDgZNoZ5yN7n3kn7TN1i",
    },
    signatures: [
      "61uNweAcrQKwm5Jm2GC2cdkR87pCavEQvNaVQXmJ4woH9nuE3EELbA9MpAdwt3ciuWmUrhM5DRLxNurQ8JCMaJxn",
      "2WGN9my2wzE4xSj8wwDcYBnj6bQfTkqGNT3Bx33fx11jatrj9h3pARNPBMpP5cwNU7Cf69FD44EfJ3YmHQmi15ou",
    ],
  },
};

export default HOLAPLEX_REDEEM_FULL_RIGHTS_TX;
