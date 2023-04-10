// https://explorer.solana.com/tx/o1qP6cTghjEH88sqm1VEsknkyYVBgDZcHJJ3ZHNCZMQ6wvXMJbAKD4vUQ3mfVvHdZiSh4Zwh5JAz8dNbJzzTMWk
//
// For https://monsterfriends.holaplex.com/listings/D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ
const HOLAPLEX_BID_TX = {
  blockTime: 1640112558,
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
                destination: "8csXXLDafofP8GgcjCKzYAqaTCxdzuiQnig5vS5kzpHp",
                lamports: 1454640,
                source: "Bq34mzpPuWLDvScjKB8HYuqWJoX8PfPKbmjSqFBBwFb6",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "8csXXLDafofP8GgcjCKzYAqaTCxdzuiQnig5vS5kzpHp",
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
                account: "8csXXLDafofP8GgcjCKzYAqaTCxdzuiQnig5vS5kzpHp",
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
                destination: "8jj2u2YMbyVpCVr9dSav1BfQ9HoSvMZoG68K64GRG2mU",
                lamports: 1566000,
                source: "Bq34mzpPuWLDvScjKB8HYuqWJoX8PfPKbmjSqFBBwFb6",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "8jj2u2YMbyVpCVr9dSav1BfQ9HoSvMZoG68K64GRG2mU",
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
                account: "8jj2u2YMbyVpCVr9dSav1BfQ9HoSvMZoG68K64GRG2mU",
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
                amount: "1000000000",
                authority: "6H6uoAhi2GPqyhWPZLu47Y6kWKDFbwjJisgMTK9sxBHT",
                destination: "4pDeq83YLbdFrrkradZug2CjiBnMeUbySybvCh5e6R9R",
                source: "F2j3vsqqzJXQZ8V4uPAfqdJvLb8SKjq5NR8d6wbKXHoS",
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
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3356 of 158924 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      'Program log: Placing bid "1000000000"',
      "Program log: Pushing bid onto stack",
      "Program auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8 consumed 51715 of 200000 compute units",
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
      25498827102, 1002039280, 0, 0, 1566000, 1454640, 4217760, 2415120,
      151330216991, 1009200, 1169280, 1, 1089991680, 1141440,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
        mint: "So11111111111111111111111111111111111111112",
        owner: "D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ",
        uiTokenAmount: {
          amount: "1000000000",
          decimals: 9,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
    ],
    preBalances: [
      26503907022, 0, 0, 0, 0, 0, 4217760, 2415120, 151330216991, 1009200,
      1169280, 1, 1089991680, 1141440,
    ],
    preTokenBalances: [],
    rewards: [],
    status: {
      Ok: null,
    },
  },
  slot: 112627687,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "Bq34mzpPuWLDvScjKB8HYuqWJoX8PfPKbmjSqFBBwFb6",
          signer: true,
          writable: true,
        },
        {
          pubkey: "4pDeq83YLbdFrrkradZug2CjiBnMeUbySybvCh5e6R9R",
          signer: true,
          writable: true,
        },
        {
          pubkey: "F2j3vsqqzJXQZ8V4uPAfqdJvLb8SKjq5NR8d6wbKXHoS",
          signer: true,
          writable: true,
        },
        {
          pubkey: "6H6uoAhi2GPqyhWPZLu47Y6kWKDFbwjJisgMTK9sxBHT",
          signer: true,
          writable: false,
        },
        {
          pubkey: "8jj2u2YMbyVpCVr9dSav1BfQ9HoSvMZoG68K64GRG2mU",
          signer: false,
          writable: true,
        },
        {
          pubkey: "8csXXLDafofP8GgcjCKzYAqaTCxdzuiQnig5vS5kzpHp",
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
              newAccount: "4pDeq83YLbdFrrkradZug2CjiBnMeUbySybvCh5e6R9R",
              owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              source: "Bq34mzpPuWLDvScjKB8HYuqWJoX8PfPKbmjSqFBBwFb6",
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
              account: "4pDeq83YLbdFrrkradZug2CjiBnMeUbySybvCh5e6R9R",
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
              lamports: 1006117840,
              newAccount: "F2j3vsqqzJXQZ8V4uPAfqdJvLb8SKjq5NR8d6wbKXHoS",
              owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              source: "Bq34mzpPuWLDvScjKB8HYuqWJoX8PfPKbmjSqFBBwFb6",
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
              account: "F2j3vsqqzJXQZ8V4uPAfqdJvLb8SKjq5NR8d6wbKXHoS",
              mint: "So11111111111111111111111111111111111111112",
              owner: "Bq34mzpPuWLDvScjKB8HYuqWJoX8PfPKbmjSqFBBwFb6",
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
              amount: "1000000000",
              delegate: "6H6uoAhi2GPqyhWPZLu47Y6kWKDFbwjJisgMTK9sxBHT",
              owner: "Bq34mzpPuWLDvScjKB8HYuqWJoX8PfPKbmjSqFBBwFb6",
              source: "F2j3vsqqzJXQZ8V4uPAfqdJvLb8SKjq5NR8d6wbKXHoS",
            },
            type: "approve",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          accounts: [
            "Bq34mzpPuWLDvScjKB8HYuqWJoX8PfPKbmjSqFBBwFb6",
            "F2j3vsqqzJXQZ8V4uPAfqdJvLb8SKjq5NR8d6wbKXHoS",
            "8jj2u2YMbyVpCVr9dSav1BfQ9HoSvMZoG68K64GRG2mU",
            "4pDeq83YLbdFrrkradZug2CjiBnMeUbySybvCh5e6R9R",
            "8csXXLDafofP8GgcjCKzYAqaTCxdzuiQnig5vS5kzpHp",
            "D7Hsn9otd1gDLKxG1A7BNTc7FYdRCEBm8gTaWHFxmeAJ",
            "6VfwemZ3QUjY3LFutkLSTspRxVQJrXRXqiBnENhkYHxo",
            "So11111111111111111111111111111111111111112",
            "6H6uoAhi2GPqyhWPZLu47Y6kWKDFbwjJisgMTK9sxBHT",
            "Bq34mzpPuWLDvScjKB8HYuqWJoX8PfPKbmjSqFBBwFb6",
            "SysvarC1ock11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
            "11111111111111111111111111111111",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          ],
          data: "2KMqg8mBKhpABAZpjc6gtkHb3C9U2v14dMBMipXtnKxJ2oHz7avUTiK6",
          programId: "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8",
        },
        {
          parsed: {
            info: {
              account: "F2j3vsqqzJXQZ8V4uPAfqdJvLb8SKjq5NR8d6wbKXHoS",
              destination: "Bq34mzpPuWLDvScjKB8HYuqWJoX8PfPKbmjSqFBBwFb6",
              owner: "Bq34mzpPuWLDvScjKB8HYuqWJoX8PfPKbmjSqFBBwFb6",
            },
            type: "closeAccount",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          parsed: {
            info: {
              owner: "Bq34mzpPuWLDvScjKB8HYuqWJoX8PfPKbmjSqFBBwFb6",
              source: "F2j3vsqqzJXQZ8V4uPAfqdJvLb8SKjq5NR8d6wbKXHoS",
            },
            type: "revoke",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
      ],
      recentBlockhash: "56PM3aL5c9AZ9HTxc9R7wh2PAoQ2hqAKcMN2HNyXseMq",
    },
    signatures: [
      "o1qP6cTghjEH88sqm1VEsknkyYVBgDZcHJJ3ZHNCZMQ6wvXMJbAKD4vUQ3mfVvHdZiSh4Zwh5JAz8dNbJzzTMWk",
      "VuG1ae47wvMfAZpptKXvAVhnQLSB1ZtFGCfzTnBNi3Adohp3Zj1ui72QtoEtovojHfub7iVvu5KaNrWaRKLQm2R",
      "fkXz5vNVEh1xZJRGAkStZv4zNLJtKTtKy63MjC3MWyENWXoNGsgSs1oyi3fkWC726AKqDzAfHN6kJetL4t9RAwd",
      "4y7JPabzGmD9EZVQJHdLJKLFAnjdgGXhrV8Luu7Z3mvts5H241GTep3sZH7MSZYKzkQxT48uaNcCe3Txp6fv5wqT",
    ],
  },
};

export default HOLAPLEX_BID_TX;
