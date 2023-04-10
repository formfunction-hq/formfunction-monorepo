// https://explorer.solana.com/tx/GLX4rjVax72YXNmQ2R3ZbWygQkcWEKz6yPkbbMn9ZAVNdG33V5coqGxSnd5ZM9YiuAqZQYXBE22TGGePRNjutE6
//
// For https://monsterfriends.holaplex.com/listings/D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ
const HOLAPLEX_BID_TX2 = {
  blockTime: 1640178468,
  meta: {
    err: null,
    fee: 20000,
    innerInstructions: [
      {
        index: 5,
        instructions: [
          {
            parsed: {
              info: {
                destination: "D8446bChFKXuB8SeNAbCqqYLwuahGMwneyomTQyPwsad",
                lamports: 1454640,
                source: "8FzdJvJk997SXuyZMejVmwfTbMgzCpDs1KxDSeNzUHHj",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "D8446bChFKXuB8SeNAbCqqYLwuahGMwneyomTQyPwsad",
                space: 81,
              },
              type: "allocate",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "D8446bChFKXuB8SeNAbCqqYLwuahGMwneyomTQyPwsad",
                owner: "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8",
              },
              type: "assign",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                destination: "iZWHCdrLpn6b1Axwf6DNQ6bNZZa8TiUhzxgsx5Qo8Fe",
                lamports: 1566000,
                source: "8FzdJvJk997SXuyZMejVmwfTbMgzCpDs1KxDSeNzUHHj",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "iZWHCdrLpn6b1Axwf6DNQ6bNZZa8TiUhzxgsx5Qo8Fe",
                space: 97,
              },
              type: "allocate",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "iZWHCdrLpn6b1Axwf6DNQ6bNZZa8TiUhzxgsx5Qo8Fe",
                owner: "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8",
              },
              type: "assign",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                amount: "2500000000",
                authority: "CsXtUjg2ueeNjFpz29AVGqiM6ionch8TPQPz3ZL4vK57",
                destination: "8zhNSo1NfTJYENhXnyMpWtDVH2VtgCm5bJK8zePy4QR5",
                source: "32zzWSrjTJUTp3yToy4mmQxXZXTungmDUjG2QtC2N6ox",
              },
              type: "transfer",
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
      "Program log: Instruction: InitializeAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3680 of 200000 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program 11111111111111111111111111111111 invoke [1]",
      "Program 11111111111111111111111111111111 success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: InitializeAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3679 of 200000 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: Approve",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2298 of 200000 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8 invoke [1]",
      "Program log: + Processing PlaceBid",
      "Program log: Transfer 1454640 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Completed assignation!",
      "Program log: Transfer 1566000 lamports to the new account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Allocate space for the account",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Assign the account to the owning program",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Completed assignation!",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: Transfer",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3356 of 155249 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      'Program log: Placing bid "2500000000"',
      "Program log: Looking to go over the loop, but check tick size first",
      "Program log: Comparison of 2000000000 and 2500000000 for 1",
      "Program log: Ok we can do an insert",
      "Program log: Doing an on the end insert",
      "Program auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8 consumed 57154 of 200000 compute units",
      "Program auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8 success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: CloseAccount",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2160 of 200000 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: Revoke",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1874 of 200000 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
    ],
    postBalances: [
      3569691280, 2502039280, 0, 0, 1566000, 1454640, 4217760, 2415120,
      151330216991, 1009200, 1169280, 1, 1089991680, 1141440,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
        mint: "So11111111111111111111111111111111111111112",
        owner: "D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ",
        uiTokenAmount: {
          amount: "2500000000",
          decimals: 9,
          uiAmount: 2.5,
          uiAmountString: "2.5",
        },
      },
    ],
    preBalances: [
      6074771200, 0, 0, 0, 0, 0, 4217760, 2415120, 151330216991, 1009200,
      1169280, 1, 1089991680, 1141440,
    ],
    preTokenBalances: [],
    rewards: [],
    status: {
      Ok: null,
    },
  },
  slot: 112747776,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "8FzdJvJk997SXuyZMejVmwfTbMgzCpDs1KxDSeNzUHHj",
          signer: true,
          writable: true,
        },
        {
          pubkey: "8zhNSo1NfTJYENhXnyMpWtDVH2VtgCm5bJK8zePy4QR5",
          signer: true,
          writable: true,
        },
        {
          pubkey: "32zzWSrjTJUTp3yToy4mmQxXZXTungmDUjG2QtC2N6ox",
          signer: true,
          writable: true,
        },
        {
          pubkey: "CsXtUjg2ueeNjFpz29AVGqiM6ionch8TPQPz3ZL4vK57",
          signer: true,
          writable: false,
        },
        {
          pubkey: "iZWHCdrLpn6b1Axwf6DNQ6bNZZa8TiUhzxgsx5Qo8Fe",
          signer: false,
          writable: true,
        },
        {
          pubkey: "D8446bChFKXuB8SeNAbCqqYLwuahGMwneyomTQyPwsad",
          signer: false,
          writable: true,
        },
        {
          pubkey: "D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ",
          signer: false,
          writable: true,
        },
        {
          pubkey: "6VfwemZ3QUjY3LFutkLSTspRxVQJrXRXqiBnENhkYHxo",
          signer: false,
          writable: true,
        },
        {
          pubkey: "So11111111111111111111111111111111111111112",
          signer: false,
          writable: true,
        },
        {
          pubkey: "SysvarRent111111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "SysvarC1ock11111111111111111111111111111111",
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
          pubkey: "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8",
          signer: false,
          writable: false,
        },
      ],
      instructions: [
        {
          parsed: {
            info: {
              lamports: 2039280,
              newAccount: "8zhNSo1NfTJYENhXnyMpWtDVH2VtgCm5bJK8zePy4QR5",
              owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              source: "8FzdJvJk997SXuyZMejVmwfTbMgzCpDs1KxDSeNzUHHj",
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
              account: "8zhNSo1NfTJYENhXnyMpWtDVH2VtgCm5bJK8zePy4QR5",
              mint: "So11111111111111111111111111111111111111112",
              owner: "D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ",
              rentSysvar: "SysvarRent111111111111111111111111111111111",
            },
            type: "initializeAccount",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          parsed: {
            info: {
              lamports: 2506117840,
              newAccount: "32zzWSrjTJUTp3yToy4mmQxXZXTungmDUjG2QtC2N6ox",
              owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              source: "8FzdJvJk997SXuyZMejVmwfTbMgzCpDs1KxDSeNzUHHj",
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
              account: "32zzWSrjTJUTp3yToy4mmQxXZXTungmDUjG2QtC2N6ox",
              mint: "So11111111111111111111111111111111111111112",
              owner: "8FzdJvJk997SXuyZMejVmwfTbMgzCpDs1KxDSeNzUHHj",
              rentSysvar: "SysvarRent111111111111111111111111111111111",
            },
            type: "initializeAccount",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          parsed: {
            info: {
              amount: "2500000000",
              delegate: "CsXtUjg2ueeNjFpz29AVGqiM6ionch8TPQPz3ZL4vK57",
              owner: "8FzdJvJk997SXuyZMejVmwfTbMgzCpDs1KxDSeNzUHHj",
              source: "32zzWSrjTJUTp3yToy4mmQxXZXTungmDUjG2QtC2N6ox",
            },
            type: "approve",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          accounts: [
            "8FzdJvJk997SXuyZMejVmwfTbMgzCpDs1KxDSeNzUHHj",
            "32zzWSrjTJUTp3yToy4mmQxXZXTungmDUjG2QtC2N6ox",
            "iZWHCdrLpn6b1Axwf6DNQ6bNZZa8TiUhzxgsx5Qo8Fe",
            "8zhNSo1NfTJYENhXnyMpWtDVH2VtgCm5bJK8zePy4QR5",
            "D8446bChFKXuB8SeNAbCqqYLwuahGMwneyomTQyPwsad",
            "D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ",
            "6VfwemZ3QUjY3LFutkLSTspRxVQJrXRXqiBnENhkYHxo",
            "So11111111111111111111111111111111111111112",
            "CsXtUjg2ueeNjFpz29AVGqiM6ionch8TPQPz3ZL4vK57",
            "8FzdJvJk997SXuyZMejVmwfTbMgzCpDs1KxDSeNzUHHj",
            "SysvarC1ock11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
            "11111111111111111111111111111111",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          ],
          data: "2KNMyaF2gqVSp8t5THGgNVaigguaKAz6hFsJTvYfzmNutyeC4U3VDKs2",
          programId: "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8",
        },
        {
          parsed: {
            info: {
              account: "32zzWSrjTJUTp3yToy4mmQxXZXTungmDUjG2QtC2N6ox",
              destination: "8FzdJvJk997SXuyZMejVmwfTbMgzCpDs1KxDSeNzUHHj",
              owner: "8FzdJvJk997SXuyZMejVmwfTbMgzCpDs1KxDSeNzUHHj",
            },
            type: "closeAccount",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          parsed: {
            info: {
              owner: "8FzdJvJk997SXuyZMejVmwfTbMgzCpDs1KxDSeNzUHHj",
              source: "32zzWSrjTJUTp3yToy4mmQxXZXTungmDUjG2QtC2N6ox",
            },
            type: "revoke",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
      ],
      recentBlockhash: "UqhtT3zMAXesKkd9uSD2NL7dA5ub2EqMRWDQ9UUEvb6",
    },
    signatures: [
      "GLX4rjVax72YXNmQ2R3ZbWygQkcWEKz6yPkbbMn9ZAVNdG33V5coqGxSnd5ZM9YiuAqZQYXBE22TGGePRNjutE6",
      "Zgq1wCPVXpqd1H2h3iRUXQTuZzaE9oSJHUF4oDLzbepcDk6EaRsaeVgg1s8cNqKpPXHiEp31zVrgj3xQ7wUjcvN",
      "3aW5Lh2Ydaqx7XSi6QFmdPtorLgPnonKvpszcmFN9J9cs7vt5MJJ38rbH7pJErJEy42ipHpPF5Qjv2LBfTypBymn",
      "g1GDotPaBNoFtDjx9gGiaR6xJhoHBzyB2oNXH2Fu73zhFeMWNLKxziMzZGtmMHWTS5tujZTDoG2MecvMXQuXZWi",
    ],
  },
};

export default HOLAPLEX_BID_TX2;
