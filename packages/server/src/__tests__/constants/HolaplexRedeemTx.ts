// https://explorer.solana.com/tx/JW5K1774nLERsqZm2ujZMhJtu27JrYqaz61DMixymjAzx7nUykMmSTx9P6QLBBZiSKLBTVhJqXM86RpkHnTyeHy
//
// For https://monsterfriends.holaplex.com/listings/HFSy1KBxgQF2b9MfbTcVB6zJqRfmSBXTbqLuTEzSb9tB
const HOLAPLEX_REDEEM_TX = {
  blockTime: 1646509436,
  meta: {
    err: null,
    fee: 10000,
    innerInstructions: [
      {
        index: 2,
        instructions: [
          {
            accounts: [
              "J2kEJo5U8tqn8rkvkH4hJAk2xZpDuTbtYfAnd8mEiQmt",
              "HDsEWm2gFHHzXqRXs29uVsCCcHF1o6ckW3DHqEBM8zs1",
              "4ouAvd6HEZrJU5KXwUEKoiZCPfJzChXLTzWDsBPn9eZV",
              "8cfuF1dTEH8pAWP8WphYRwwRqk35B3zG6RVeduqJUj6e",
              "AzGcjfFMcmKvi7chwzsZrWUKFrVXSAkD6TRPqon8UbYJ",
              "3J5gvXx9C91126KJaKChBdXjBYAbE5Z5NVtVzPJuYyoa",
              "64H8hHAZdC482F9vo39RzDZuEu3mcuphsyMvyvQ3gQuz",
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
                authority: "64H8hHAZdC482F9vo39RzDZuEu3mcuphsyMvyvQ3gQuz",
                destination: "J2kEJo5U8tqn8rkvkH4hJAk2xZpDuTbtYfAnd8mEiQmt",
                source: "4ouAvd6HEZrJU5KXwUEKoiZCPfJzChXLTzWDsBPn9eZV",
              },
              type: "transfer",
            },
            program: "spl-token",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            parsed: {
              info: {
                destination: "FSgwxwwWvbcYSdf4RDaQzfkcywSnFC1cnSpebC8FeUPc",
                lamports: 1190160,
                source: "stat1kFydLtXjmpPfJhRkenmXYGa1bNwzNAJ9qyiyht",
              },
              type: "transfer",
            },
            program: "system",
            programId: "11111111111111111111111111111111",
          },
          {
            parsed: {
              info: {
                account: "FSgwxwwWvbcYSdf4RDaQzfkcywSnFC1cnSpebC8FeUPc",
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
                account: "FSgwxwwWvbcYSdf4RDaQzfkcywSnFC1cnSpebC8FeUPc",
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
      "Program log: Instruction: Redeem Normal Token Bid",
      "Program vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn invoke [2]",
      "Program log: Instruction: Withdraw Token from Safety Deposit Box",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]",
      "Program log: Instruction: Transfer",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2643 of 145180 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn consumed 29893 of 170667 compute units",
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
      "Program consumption: 130018 units remaining",
      "Program p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98 consumed 71368 of 200000 compute units",
      "Program p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98 success",
    ],
    postBalances: [
      8875035517, 2039280, 3473040, 2039280, 2317680, 1461600, 1190160, 1572960,
      1, 2415120, 1524240, 0, 2491680, 1461600, 1454640, 4217760, 1141440,
      1141440, 1009200, 953185920, 1141440,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
        mint: "EeA3AThxrYFcdTBKchUF1hftgaYF3TRQR5ASoifVt6iY",
        owner: "stat1kFydLtXjmpPfJhRkenmXYGa1bNwzNAJ9qyiyht",
        uiTokenAmount: {
          amount: "1",
          decimals: 0,
          uiAmount: 1,
          uiAmountString: "1",
        },
      },
      {
        accountIndex: 3,
        mint: "EeA3AThxrYFcdTBKchUF1hftgaYF3TRQR5ASoifVt6iY",
        owner: "64H8hHAZdC482F9vo39RzDZuEu3mcuphsyMvyvQ3gQuz",
        uiTokenAmount: {
          amount: "0",
          decimals: 0,
          uiAmount: null,
          uiAmountString: "0",
        },
      },
    ],
    preBalances: [
      8878274957, 0, 3473040, 2039280, 2317680, 1461600, 0, 1572960, 1, 2415120,
      1524240, 0, 2491680, 1461600, 1454640, 4217760, 1141440, 1141440, 1009200,
      953185920, 1141440,
    ],
    preTokenBalances: [
      {
        accountIndex: 3,
        mint: "EeA3AThxrYFcdTBKchUF1hftgaYF3TRQR5ASoifVt6iY",
        owner: "64H8hHAZdC482F9vo39RzDZuEu3mcuphsyMvyvQ3gQuz",
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
  slot: 123629125,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: "stat1kFydLtXjmpPfJhRkenmXYGa1bNwzNAJ9qyiyht",
          signer: true,
          writable: true,
        },
        {
          pubkey: "J2kEJo5U8tqn8rkvkH4hJAk2xZpDuTbtYfAnd8mEiQmt",
          signer: true,
          writable: true,
        },
        {
          pubkey: "3J5gvXx9C91126KJaKChBdXjBYAbE5Z5NVtVzPJuYyoa",
          signer: false,
          writable: true,
        },
        {
          pubkey: "4ouAvd6HEZrJU5KXwUEKoiZCPfJzChXLTzWDsBPn9eZV",
          signer: false,
          writable: true,
        },
        {
          pubkey: "8cfuF1dTEH8pAWP8WphYRwwRqk35B3zG6RVeduqJUj6e",
          signer: false,
          writable: true,
        },
        {
          pubkey: "AzGcjfFMcmKvi7chwzsZrWUKFrVXSAkD6TRPqon8UbYJ",
          signer: false,
          writable: true,
        },
        {
          pubkey: "FSgwxwwWvbcYSdf4RDaQzfkcywSnFC1cnSpebC8FeUPc",
          signer: false,
          writable: true,
        },
        {
          pubkey: "HDsEWm2gFHHzXqRXs29uVsCCcHF1o6ckW3DHqEBM8zs1",
          signer: false,
          writable: true,
        },
        {
          pubkey: "11111111111111111111111111111111",
          signer: false,
          writable: false,
        },
        {
          pubkey: "28qCQsRw4fMvXGuqy5ZJ4SphtfHSLDmsKEcLgsDMYqKU",
          signer: false,
          writable: false,
        },
        {
          pubkey: "4abZBzsGm9icyJA9Pcqmzn1MLK3GPerapgATLFqd9z23",
          signer: false,
          writable: false,
        },
        {
          pubkey: "64H8hHAZdC482F9vo39RzDZuEu3mcuphsyMvyvQ3gQuz",
          signer: false,
          writable: false,
        },
        {
          pubkey: "9MDuruXfZYLC2gdwAw5twbHDieFirsesgZ479kGXH5ct",
          signer: false,
          writable: false,
        },
        {
          pubkey: "EeA3AThxrYFcdTBKchUF1hftgaYF3TRQR5ASoifVt6iY",
          signer: false,
          writable: false,
        },
        {
          pubkey: "EQoCP8tWfNRpoF2QuMJv5snfcHKGJ2iNqAPLWXcBwz6",
          signer: false,
          writable: false,
        },
        {
          pubkey: "HFSy1KBxgQF2b9MfbTcVB6zJqRfmSBXTbqLuTEzSb9tB",
          signer: false,
          writable: false,
        },
        {
          pubkey: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          signer: false,
          writable: false,
        },
        {
          pubkey: "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98",
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
        {
          pubkey: "vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn",
          signer: false,
          writable: false,
        },
      ],
      instructions: [
        {
          parsed: {
            info: {
              lamports: 2039280,
              newAccount: "J2kEJo5U8tqn8rkvkH4hJAk2xZpDuTbtYfAnd8mEiQmt",
              owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              source: "stat1kFydLtXjmpPfJhRkenmXYGa1bNwzNAJ9qyiyht",
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
              account: "J2kEJo5U8tqn8rkvkH4hJAk2xZpDuTbtYfAnd8mEiQmt",
              mint: "EeA3AThxrYFcdTBKchUF1hftgaYF3TRQR5ASoifVt6iY",
              owner: "stat1kFydLtXjmpPfJhRkenmXYGa1bNwzNAJ9qyiyht",
              rentSysvar: "SysvarRent111111111111111111111111111111111",
            },
            type: "initializeAccount",
          },
          program: "spl-token",
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          accounts: [
            "3J5gvXx9C91126KJaKChBdXjBYAbE5Z5NVtVzPJuYyoa",
            "4ouAvd6HEZrJU5KXwUEKoiZCPfJzChXLTzWDsBPn9eZV",
            "J2kEJo5U8tqn8rkvkH4hJAk2xZpDuTbtYfAnd8mEiQmt",
            "FSgwxwwWvbcYSdf4RDaQzfkcywSnFC1cnSpebC8FeUPc",
            "HDsEWm2gFHHzXqRXs29uVsCCcHF1o6ckW3DHqEBM8zs1",
            "8cfuF1dTEH8pAWP8WphYRwwRqk35B3zG6RVeduqJUj6e",
            "AzGcjfFMcmKvi7chwzsZrWUKFrVXSAkD6TRPqon8UbYJ",
            "HFSy1KBxgQF2b9MfbTcVB6zJqRfmSBXTbqLuTEzSb9tB",
            "EQoCP8tWfNRpoF2QuMJv5snfcHKGJ2iNqAPLWXcBwz6",
            "stat1kFydLtXjmpPfJhRkenmXYGa1bNwzNAJ9qyiyht",
            "stat1kFydLtXjmpPfJhRkenmXYGa1bNwzNAJ9qyiyht",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn",
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
            "9MDuruXfZYLC2gdwAw5twbHDieFirsesgZ479kGXH5ct",
            "11111111111111111111111111111111",
            "SysvarRent111111111111111111111111111111111",
            "64H8hHAZdC482F9vo39RzDZuEu3mcuphsyMvyvQ3gQuz",
            "4abZBzsGm9icyJA9Pcqmzn1MLK3GPerapgATLFqd9z23",
            "28qCQsRw4fMvXGuqy5ZJ4SphtfHSLDmsKEcLgsDMYqKU",
          ],
          data: "3",
          programId: "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98",
        },
      ],
      recentBlockhash: "GFqSs8rRufmuXCojXM46EVXDpiZ6pbmhV65by4HWa6jA",
    },
    signatures: [
      "JW5K1774nLERsqZm2ujZMhJtu27JrYqaz61DMixymjAzx7nUykMmSTx9P6QLBBZiSKLBTVhJqXM86RpkHnTyeHy",
      "72jTV9xpwDhft6VJYvEUURUskeke3wB9DKazsLZeUdekZEuSHYnRwvcV2hRKaP7aJVoPxrc4dQfR9qcbWq4RLYY",
    ],
  },
};

export default HOLAPLEX_REDEEM_TX;
